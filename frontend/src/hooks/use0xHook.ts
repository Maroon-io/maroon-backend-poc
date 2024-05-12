import { Contract, ethers } from "ethers";
import { platformSigner } from "../utils/privateKeyProvider";
import { getGasGoal } from "../utils/getGasGoal";
import assert from "assert";
import { useEthersSigner } from "../contract/ethers";
import { ContractWrappers } from "@0x/contract-wrappers";
import ConstantProvider from "../utils/constantProvider";
import { BigNumber, NULL_ADDRESS, hexUtils } from "@0x/utils";
import { LimitOrder, OrderStatus, OtcOrder, RfqOrder, Signature, ZERO } from "@0x/protocol-utils";
import { getRandomInteger } from "../utils/0xHelper";
import { useSafeHook } from "./useSafeHook";
import entryPointABI from "../utils/entryPointABI";
import { UserOperation } from "../utils/safe4337/utils/userOp";
import HelperProvider from "../utils/helperProvider";

export enum OrderType {
  LIMIT = "LIMIT",
  OTC = "OTC",
  RFQ = "RFQ"
}

export interface CreateOrderProps {
  maker: string;
  taker: string;
  exchangeProxyAddress: string;
  makerToken: string;
  takerToken: string;
  orderType: OrderType;
  makerAssetAmount: BigNumber;
  takerAssetAmount: BigNumber;
  expiryUnixTimestamp: BigNumber;
}

export interface CreateLimitOrderProps {
  maker: string;
  taker: string;
  makerToken: string;
  takerToken: string;
  makerAmount: BigNumber;
  takerAmount: BigNumber;
  expiry: BigNumber;
  chainId: number;
  verifyingContract: string;
  pool: string;
  salt: BigNumber;
  takerTokenFeeAmount: BigNumber;
  feeRecipient: string;
  sender: string;
}

interface ExecuteTxParamI {
  params: UserOperation;
  stringifyParams: string
}


export function use0xHook() {
  const { getUserOperation, getSafeAddress } = useSafeHook();
  const signer = useEthersSigner();


  const deploySafeContractParam = async ({
    userAddress,
  }: {
    userAddress: string;
  }): Promise<ExecuteTxParamI | undefined> => {
    const _signer = await signer;
    assert(_signer, "signer == undefined");

    const { safeAddress } = await getSafeAddress({ userAddress });

    if (safeAddress === ethers.ZeroAddress) return undefined;

    const randomInt = Math.floor(new Date().getTime() / 1000).toString();
    const entryPointContract = new Contract(ConstantProvider.ENTRY_POINT_ADDRESS, entryPointABI, platformSigner);
    const getNonce = await entryPointContract.getNonce(platformSigner.address, randomInt);
    const nonce = getNonce.toString();

    const userOp = await getUserOperation({
      to: ethers.ZeroAddress,
      value: "0",
      data: "0x",
      nonce,
      userAddress,
      userSigner: _signer,
      isInitCode: true,
      safeAddress
    });

    return {
      params: userOp,
      stringifyParams: JSON.stringify(userOp, undefined, 2)
    }
  };

  const getApproveExchangeProxyParams = async ({
    tokenAddress,
    userAddress,
    safeAddress,
  }: {
    tokenAddress: string;
    userAddress: string;
    safeAddress: string;
  }): Promise<ExecuteTxParamI | undefined> => {
    const _signer = await signer;
    assert(_signer, "signer == undefined");

    const ERC20_ABI = [
      // The `approve` function ABI
      "function approve(address _spender, uint256 _value) public returns (bool success)",
      // The `allowance` function ABI
      "function allowance(address _owner, address _spender) public view returns (uint256 remaining)",
    ];

    // @ts-ignore
    const contractWrappers = new ContractWrappers(window.ethereum, {
      chainId: ConstantProvider.NETWORK_CHAIN_ID,
    });
    const exchangeProxyAddress = contractWrappers.contractAddresses.exchangeProxy;
    
    const tokenContract = new Contract(tokenAddress, ERC20_ABI, _signer);

    const allowance = await tokenContract.allowance(safeAddress, exchangeProxyAddress);


    if (allowance >= ethers.MaxUint256) return undefined;


    // Encode the `approve` function call
    const approveToken = tokenContract.interface.encodeFunctionData("approve", [
      exchangeProxyAddress,
      ethers.MaxUint256,
    ]);

    const randomInt = Math.floor(new Date().getTime() / 1000).toString();

    const entryPointContract = new Contract(ConstantProvider.ENTRY_POINT_ADDRESS, entryPointABI, platformSigner);

    const getNonce = await entryPointContract.getNonce(platformSigner.address, randomInt);

    const nonce = getNonce.toString();

    const userOp = await getUserOperation({
      to: ethers.getAddress(tokenAddress),
      value: "0",
      data: approveToken,
      nonce,
      userAddress,
      userSigner: _signer,
      isInitCode: false,
      safeAddress
    });

    return {
      params: userOp,
      stringifyParams: JSON.stringify(userOp, undefined, 2)
    }
  };

  const getRegisterAllowedOrderSignerParams = async ({
    userAddress,
    signerAddress,
    safeAddress
  }: {
    signerAddress: string;
    userAddress: string;
    safeAddress: string;
  }): Promise<ExecuteTxParamI | undefined> => {
    const _signer = await signer;

    assert(_signer, "signer == undefined");

    // @ts-ignore
    const contractWrappers = new ContractWrappers(window.ethereum, {
      chainId: ConstantProvider.NETWORK_CHAIN_ID,
    });

    const isValidOrderSigner = await contractWrappers.exchangeProxy.isValidOrderSigner(safeAddress, signerAddress).callAsync();
    console.log({ isValidOrderSigner });

    if (isValidOrderSigner) return undefined;

    const exchangeProxyAddress = contractWrappers.contractAddresses.exchangeProxy;

    // Get encoded function call data for registerAllowedOrderSigner
    const registerAllowedOrderSignerData = contractWrappers.exchangeProxy
      .registerAllowedOrderSigner(signerAddress, true)
      .getABIEncodedTransactionData();
    
    const randomInt = Math.floor(new Date().getTime() / 1000).toString();
    const entryPointContract = new Contract(ConstantProvider.ENTRY_POINT_ADDRESS, entryPointABI, platformSigner);
    const getNonce = await entryPointContract.getNonce(platformSigner.address, randomInt);
    const nonce = getNonce.toString();

    const userOp = await getUserOperation({
      to: ethers.getAddress(exchangeProxyAddress),
      value: "0",
      data: registerAllowedOrderSignerData,
      nonce,
      userAddress,
      userSigner: _signer,
      isInitCode: false,
      safeAddress
    });

    return {
      params: userOp,
      stringifyParams: JSON.stringify(userOp, undefined, 2)
    }

  };

  const fillOrder = async ({
    orderEncodedTxData,
    userAddress,
    safeAddress
  }: {
    orderEncodedTxData: string;
    userAddress: string;
    safeAddress: string;
  }): Promise<ExecuteTxParamI> => {

    const _signer = await signer;

    assert(_signer, "signer == undefined");

    // @ts-ignore
    const contractWrappers = new ContractWrappers(window.ethereum, {
      chainId: ConstantProvider.NETWORK_CHAIN_ID,
    });

    const randomInt = Math.floor(new Date().getTime() / 1000).toString();
    const entryPointContract = new Contract(ConstantProvider.ENTRY_POINT_ADDRESS, entryPointABI, platformSigner);
    const getNonce = await entryPointContract.getNonce(platformSigner.address, randomInt);
    const nonce = getNonce.toString();

    const userOp = await getUserOperation({
      to: ethers.getAddress(contractWrappers.contractAddresses.exchangeProxy),
      value: "0",
      data: orderEncodedTxData,
      nonce,
      userAddress,
      userSigner: _signer,
      isInitCode: false,
      safeAddress
    });

    return {
      params: userOp,
      stringifyParams: JSON.stringify(userOp, undefined, 2)
    }
  };

  const createOrder = ({
    maker,
    taker,
    exchangeProxyAddress,
    orderType,
    makerToken,
    takerToken,
    makerAssetAmount,
    takerAssetAmount,
    expiryUnixTimestamp
  }: CreateOrderProps) => {

    const NETWORK_CHAIN_ID = ConstantProvider.NETWORK_CHAIN_ID;
    const pool = hexUtils.leftPad(1);
    const salt = new BigNumber(Date.now());

    let order: LimitOrder | OtcOrder | RfqOrder;


    if (orderType === OrderType.LIMIT) {
      order = new LimitOrder({
        chainId: NETWORK_CHAIN_ID,
        verifyingContract: exchangeProxyAddress,
        maker,
        taker,
        makerToken,
        takerToken,
        makerAmount: makerAssetAmount,
        takerAmount: takerAssetAmount,
        takerTokenFeeAmount: ZERO,
        sender: taker,
        feeRecipient: NULL_ADDRESS,
        expiry: expiryUnixTimestamp,
        pool,
        salt,
      });
    } else if (orderType === OrderType.OTC) {
      order = new OtcOrder({
        chainId: NETWORK_CHAIN_ID,
        verifyingContract: exchangeProxyAddress,
        maker,
        taker,
        txOrigin: platformSigner.address,
        makerToken,
        takerToken,
        makerAmount: makerAssetAmount,
        takerAmount: takerAssetAmount,
        expiryAndNonce: OtcOrder.encodeExpiryAndNonce(
          expiryUnixTimestamp, // expiry
          getRandomInteger(0, OtcOrder.MAX_NONCE_BUCKET), // nonceBucket
          getRandomInteger(0, OtcOrder.MAX_NONCE_VALUE) // nonce
        ) 
      });
    } else {
      order = new RfqOrder({
        chainId: NETWORK_CHAIN_ID,
        verifyingContract: exchangeProxyAddress,
        maker,
        taker,
        makerToken,
        takerToken,
        makerAmount: makerAssetAmount,
        takerAmount: takerAssetAmount,
        txOrigin: platformSigner.address,
        expiry: expiryUnixTimestamp,
        pool,
        salt,
      });
    }

    return {
      makerAssetAmount,
      takerAssetAmount,
      order,
      pool,
      salt: salt.toString()
    };
  };

  const createLimitOrder = ({
    maker,
    taker,
    makerToken,
    takerToken,
    makerAmount,
    takerAmount,
    expiry,
    chainId,
    verifyingContract,
    pool,
    salt,
    takerTokenFeeAmount,
    feeRecipient,
    sender
  }: CreateLimitOrderProps) => {

    const order = new LimitOrder({
        chainId,
        verifyingContract,
        maker,
        taker,
        makerToken,
        takerToken,
        makerAmount,
        takerAmount,
        takerTokenFeeAmount,
        sender,
        feeRecipient,
        expiry,
        pool,
        salt,
      });

    return {
      order,
    };
  };

  const executeSafeOnChainTransaction = async (userOps: UserOperation[]) => {

    const entryPointContract = new Contract(ConstantProvider.ENTRY_POINT_ADDRESS, entryPointABI, platformSigner);

    console.log({userOps})

    console.log("executeSafeOnChainTransaction....")

    const { gasPrice } = await getGasGoal();

    for (const userOp of userOps) {
      if (userOp.initCode !== "0x" && userOp.sender.toLowerCase()) {
        console.log({userOp})

        const balanceOf = await entryPointContract.balanceOf(userOp.sender);

        console.log({balanceOf})
        
        const minAmount = ethers.parseEther('0.2');
        
        console.log({minAmount})
        // if (BigInt(balanceOf) < minAmount) {
          const executeTxResponse = await entryPointContract
            .depositTo(userOp.sender, { signer: platformSigner, value: minAmount });
  
          console.log({ executeTxResponse });
          const executeTxReceipt = await executeTxResponse.wait();
          console.log({ executeTxReceipt });
          await HelperProvider.sleep(5000)
          
        // }
      }
    }

    const executeTxResponse = await entryPointContract
      .handleOps(userOps, platformSigner.address, { gasPrice });

    console.log({ executeTxResponse });
    const executeTxReceipt = await executeTxResponse.wait();

    console.log({ executeTxReceipt });

    return executeTxReceipt;
  };

  const checkOrderStatusOrThrow = async ({
    contractWrappers,
    order,
  }: {
    contractWrappers: ContractWrappers;
    order: OtcOrder | LimitOrder | RfqOrder;
  }) => {
    let status = 0;
    if (order instanceof LimitOrder) {
      const orderInfo = await contractWrappers.exchangeProxy
        .getLimitOrderInfo(order)
        .callAsync();
      status = orderInfo.status;    
    } else if (order instanceof OtcOrder) {
      const orderInfo = await contractWrappers.exchangeProxy
        .getOtcOrderInfo(order)
        .callAsync();
      status = orderInfo.status;    
    } else {
      const orderInfo = await contractWrappers.exchangeProxy
        .getRfqOrderInfo(order)
        .callAsync();
      status = orderInfo.status;   
    }
    
    console.log({ status });
    if (status !== OrderStatus.Fillable) throw new Error("Order is not fillable");
  };

  const fillOrderEncodedTransactionData = async ({
    order,
    orderSignature,
    takerAssetAmount,
  }: {
    order: OtcOrder | LimitOrder | RfqOrder;
    orderSignature: Signature;
    takerAssetAmount: BigNumber;
  }) => {
    let orderData: string;
    
    // @ts-ignore
    const contractWrappers = new ContractWrappers(window.ethereum, {
      chainId: ConstantProvider.NETWORK_CHAIN_ID,
    });

    // Check if the order is fillable or throws an error
    await checkOrderStatusOrThrow({
      contractWrappers,
      order,
    });

    if (order instanceof LimitOrder) {
      // Get encoded function call data for fillLimitOrder
      orderData = contractWrappers.exchangeProxy
        .fillLimitOrder(order, orderSignature, takerAssetAmount)
        .getABIEncodedTransactionData();
    } else if (order instanceof OtcOrder) {
      // Get encoded function call data for fillLimitOrder
      orderData = contractWrappers.exchangeProxy
        .fillOtcOrder(order, orderSignature, takerAssetAmount)
        .getABIEncodedTransactionData();
    } else {
      // Get encoded function call data for fillLimitOrder
      orderData = contractWrappers.exchangeProxy
        .fillRfqOrder(order, orderSignature, takerAssetAmount)
        .getABIEncodedTransactionData();
    }

    return orderData;
  }

  return {
    getRegisterAllowedOrderSignerParams,
    fillOrder,
    getApproveExchangeProxyParams,
    fillOrderEncodedTransactionData,
    createLimitOrder,
    createOrder,
    executeSafeOnChainTransaction,
    deploySafeContractParam
  }
}
