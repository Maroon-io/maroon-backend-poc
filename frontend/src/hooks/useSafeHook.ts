import { platformSigner } from "../utils/privateKeyProvider";
import { getGasGoal } from "../utils/getGasGoal";
import ConstantProvider from "../utils/constantProvider";
import { Contract, ethers, Signer } from "ethers";
import { BuildSafeOperation } from "../utils/interfaces";
import entryPointABI from "../utils/entryPointABI";
import { Safe4337 } from "../utils/safe4337/utils/safe";
import { buildSignatureBytes, safeProxyFactoryCreationCode } from "../utils/safe4337/utils/execution";
import { buildSafeUserOpTransaction, buildUserOperationFromSafeUserOperation, signSafeOp } from "../utils/safe4337/utils/userOp";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";


export function useSafeHook() {

  const safeGlobalConfig = {
    safeSingleton: ConstantProvider.SAFE_SINGLETON_ADDRESS,
    entryPoint: ConstantProvider.ENTRY_POINT_ADDRESS,
    erc4337module: ConstantProvider.SAFE_4337_MODULE_ADDRESS,
    proxyFactory: ConstantProvider.SAFE_PROXY_FACTORY_ADDRESS,
    addModulesLib: ConstantProvider.ADD_MODULES_LIB_ADDRESS,
    proxyCreationCode: safeProxyFactoryCreationCode,
    chainId: Number(process.env.REACT_APP_PPROJECT_NETWORK_ID),
  }


  async function callGetSenderAddress(initCode: string) {
    let contract: any;
    try {
      contract = new Contract(ConstantProvider.ENTRY_POINT_ADDRESS, entryPointABI, platformSigner);

      await contract.getSenderAddress(initCode);
      return "";
    } catch (e: any) {
      const decodedError = contract!.interface.parseError(e.data);
      console.log(decodedError)
      return decodedError?.args[0]
    }
  }

  const getSafeAddress = async ({ userAddress }: {
    userAddress: string;
  }) => {
    const safe = await Safe4337.withSigner(userAddress, safeGlobalConfig);

    const initCode = safe.getInitCode()

    let safeAddress = await callGetSenderAddress(initCode);

    const isSafeDeployed = safeAddress === ethers.ZeroAddress;
    // if (isSafeDeployed) {
    //   const safeAccountConfig = {
    //     owners: [
    //       userAddress,
    //       platformSigner.address,
    //     ],
    //     threshold: 2,
    //     nonce: 0,
    //   }

    //   const platformSignerAdapter = new EthersAdapter({
    //     ethers,
    //     signerOrProvider: platformSigner,
    //   });
  
    //   const platformSignerSafeFactory = await SafeFactory.create({ ethAdapter: platformSignerAdapter, safeVersion: "1.4.1" })

    //   safeAddress = await platformSignerSafeFactory.predictSafeAddress(safeAccountConfig);
    // }

    return {
      safeAddress,
      isSafeDeployed,
      initCode
    }
  };


  const getUserOperation = async (config: BuildSafeOperation) => {
    const {initCode} = await getSafeAddress({userAddress: config.userAddress});
    const sender = config.safeAddress;
    let _initCode = initCode;

    if (!config.isInitCode || (config.isInitCode && sender === ethers.ZeroAddress)) {
      _initCode = '0x';
    }

    const safeOp = buildSafeUserOpTransaction(
      sender,
      config.to,
      config.value,
      config.data,
      `${config.nonce}`,
      safeGlobalConfig.entryPoint,
      false,
      false,
      {
        initCode: _initCode,
      },
    );

    const owner1Signature = await signSafeOp(config.userSigner, safeGlobalConfig.erc4337module, safeOp, safeGlobalConfig.chainId);
    const owner2Signature = await signSafeOp(platformSigner, safeGlobalConfig.erc4337module, safeOp, safeGlobalConfig.chainId);
    const signature = buildSignatureBytes([owner1Signature, owner2Signature]);

    const userOps = buildUserOperationFromSafeUserOperation({
      safeOp,
      signature,
    })

    console.log({ userOps })
    return userOps;
  }

  const safeConfiguration = async ({ userAddress, userSigner }: {
    userAddress: string;
    userSigner: Signer;
  }) => {
    const entryPointContract = new Contract(ConstantProvider.ENTRY_POINT_ADDRESS, entryPointABI, platformSigner);

    const safeGlobalConfig = {
      safeSingleton: ConstantProvider.SAFE_SINGLETON_ADDRESS,
      entryPoint: ConstantProvider.ENTRY_POINT_ADDRESS,
      erc4337module: ConstantProvider.SAFE_4337_MODULE_ADDRESS,
      proxyFactory: ConstantProvider.SAFE_PROXY_FACTORY_ADDRESS,
      addModulesLib: ConstantProvider.ADD_MODULES_LIB_ADDRESS,
      proxyCreationCode: safeProxyFactoryCreationCode,
      chainId: Number(process.env.REACT_APP_PPROJECT_NETWORK_ID),
    }
    const user = platformSigner;
    const safe = await Safe4337.withSigner(userAddress, safeGlobalConfig);

    let sender = ethers.ZeroAddress;
    const initCode = safe.getInitCode()

    const { gasPrice } = await getGasGoal();

    if (initCode !== ethers.ZeroHash) {
      sender = await callGetSenderAddress(initCode)
      {
         const executeTxResponse = await entryPointContract
          .depositTo(sender, { gasPrice, signer: platformSigner, value: ethers.parseEther('0.0256') });

        console.log({ executeTxResponse });
        const executeTxReceipt = await executeTxResponse.wait();
        console.log({ executeTxReceipt });
      }

    }

    const userOps = await Promise.all(
      [...Array(2)].map(async (_, nonce) => {
        const safeOp = buildSafeUserOpTransaction(
          sender,
          user.address,
          ethers.parseEther('0.000000000000000001'),
          '0x',
          `${nonce}`,
          safeGlobalConfig.entryPoint,
          false,
          false,
          {
            initCode: nonce === 0 ? safe.getInitCode() : '0x',
          },
        );

        const owner1Signature = await signSafeOp(userSigner, safeGlobalConfig.erc4337module, safeOp, safeGlobalConfig.chainId);
        const owner2Signature = await signSafeOp(platformSigner, safeGlobalConfig.erc4337module, safeOp, safeGlobalConfig.chainId);
        const signature = buildSignatureBytes([owner1Signature, owner2Signature])
        return buildUserOperationFromSafeUserOperation({
          safeOp,
          signature,
        })
      }),
    )

    console.log(userOps);

    console.log("executeSafeOnChainTransaction....")


    const executeTxResponse = await entryPointContract
      .handleOps(userOps, platformSigner.address, { gasPrice, signer: platformSigner });

    console.log({ executeTxResponse });
    const executeTxReceipt = await executeTxResponse.wait();

    console.log({ executeTxReceipt });


    return {safe}
  }

  return {
    getSafeAddress,
    getUserOperation,
    safeConfiguration,
    callGetSenderAddress
  }
}
