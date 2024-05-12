import { BtnOutline, Button } from "../../../components/Wrapped";
import React, { useEffect, useRef, useState } from "react";
import { PiCaretDownFill, PiCaretUpDown, PiCaretUpFill } from "react-icons/pi";

import {
  LabelWrapper,
  LinkItem,
  LinkWrapper,
  MenuWrapper,
  TEActionWrapper,
  TEAmountInput,
  TEAmountInputWrapper,
  TEDropdown,
  TEInput,
  TELotSizeText,
  TEPriceText,
  TEPriceTextWrapper,
  TETokenText,
} from "../style";
import { useSelector } from "react-redux";
import { addCommasToNumber } from "../../../utils";
import { ethers } from "ethers";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { BigNumber } from "@0x/utils";
import { BuyPostDataI, CreateOrderI, OrderPostDataI, ReturnOrderI, SideType } from "../../../utils/interfaces";
import { UserOperation } from "../../../utils/safe4337/utils/userOp";
import ConstantProvider from "../../../utils/constantProvider";
import { use0xHook } from "../../../hooks/use0xHook";
import { SignatureType } from "@0x/protocol-utils";
import { platformSigner } from "../../../utils/privateKeyProvider";
import assert from "assert";
import axios from "axios";
import { useEthersSigner } from "../../../contract/ethers";
import { useAccount } from "wagmi";
import { ContractWrappers } from "@0x/contract-wrappers";

const DROPDOWN_LINKS = [{ label: "Limit" }, { label: "Market" }];
const BUTTON_LINKS = ["0%", "25%", "50%", "75%", "100%"];

interface TradeActionProps {
  type: string;
  onClick: any;
  activeTab: any;
}

interface FormDataI {
  orderType: string;
  taker: string;
  makerToken: string;
  makerTokenDecimal: string;
  takerToken: string;
  takerTokenDecimal: string;
  makerAmount: string;
  takerAmount: string;
  expiry: string;
  price: string;
}

const Sell: React.FC<TradeActionProps> = ({
  type,
  onClick,
  activeTab,
}) => {

  const signer = useEthersSigner();
  const { address } = useAccount();

  const { selectedToken, loggedIn, walletTokens, selectedPair, safeAddress, baseToken, quoteToken } = useSelector(
    (state: any) => {
      const { selectedToken, loggedIn, walletTokens, selectedPair, safeAddress, baseToken, quoteToken } =
        state.webAppReducer;
      return { selectedToken, loggedIn, walletTokens, selectedPair, safeAddress, baseToken, quoteToken };
    }
  );
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderType, setOrderType] = useState("Limit");
  const [toggle, setToggle] = useState(false);
  const wrapperRef = useRef<any>(null);
  const [lotSize, setLotSize] = useState("0%");
  const [amount, setAmount] = useState<any>();
  const [price, setPrice] = useState<any>(selectedToken.current_price);
  const { createOrder, createLimitOrder, fillOrderEncodedTransactionData, fillOrder, getApproveExchangeProxyParams, deploySafeContractParam, executeSafeOnChainTransaction, getRegisterAllowedOrderSignerParams } = use0xHook();

  const formatTotal = (tokenAmt: number, usdAmt: number) => {
    if (type.toLowerCase() === "buy") {
      return addCommasToNumber((tokenAmt * usdAmt).toFixed(2));
    } else {
      return addCommasToNumber((tokenAmt / usdAmt).toFixed(8));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getAvailableBalance = () => {
    if (!selectedToken || !walletTokens) return;
    const exists = walletTokens.find(
      (token: any) =>
        token.currency.toLowerCase() === selectedToken.symbol.toLowerCase()
    );
    if (exists !== undefined) {
      if (type.toLowerCase() === "buy") {
        return addCommasToNumber(
          (exists.balance * selectedToken.current_price).toFixed(2)
        );
      } else {
        return addCommasToNumber(
          (exists.balance / selectedToken.current_price).toFixed(8)
        );
      }
    } else return;
  };

  const handleClick = () => {
    onClick(type);
  };

  const handleSetPrice = (value: string) => {
    if (orderType.toLowerCase() === "market") {
      setPrice(selectedToken.current_price.toString());
      return;
    }

    const numericValue = value.replace(/[^0-9.]/g, "");

    setPrice(numericValue);
  };

  const handleSetAmount = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");

    setAmount(numericValue);
  };

  const getQuoteCurrency = () => {
    if (type.toLowerCase() === "buy") {
      return selectedPair.split("/")[1];
    } else {
      return selectedPair.split("/")[0];
    }
  };

  const getFillOrderTask = async (id: string, size: number, address: string, formData: FormDataI) => {
    const buyPost = JSON.parse(id) as BuyPostDataI;
    console.log({ buyPost })
    const makerAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(size), Number(buyPost.tokenDecimal));
    const takerAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(formData.makerAmount), Number(formData.makerTokenDecimal));

    const registerSigner = buyPost.registerSigner;
    const safeDeploy = buyPost.safeDeploy;

    const tasks: UserOperation[] = [];

    // @ts-ignore
    const contractWrappers = new ContractWrappers(window.ethereum, {
      chainId: ConstantProvider.NETWORK_CHAIN_ID,
    });

    const exchangeProxyAddress = contractWrappers.contractAddresses.exchangeProxy;

    const orderData = {
      maker: buyPost.safeAddress,
      taker: ethers.ZeroAddress,
      exchangeProxyAddress,
      makerToken: buyPost.token,
      takerToken: formData.makerToken,
      orderType: formData.orderType as any,
      makerAssetAmount: makerAmount,
      takerAssetAmount: takerAmount,
      expiryUnixTimestamp: new BigNumber(buyPost.expiry)
    };

    // Create the order
    const { order } = createOrder(orderData);


    const signature = order.getSignatureWithKey(
      `0x${ConstantProvider.PLATFORM_PRIV_KEY}`,
      SignatureType.EIP712,
    );

    const orderEncodedTxData = await fillOrderEncodedTransactionData({
      order,
      orderSignature: signature,
      takerAssetAmount: takerAmount
    })

    const fillOrderParams = await fillOrder({
      orderEncodedTxData,
      userAddress: address,
      safeAddress
    })

    tasks.push({ ...fillOrderParams.params })

    console.log({ tasks, orderData });

    return tasks;
  }


  const handlePlaceOrder = async (type: string) => {
    try {
      console.log({ selectedToken, baseToken, quoteToken, safeAddress });

      const formData: FormDataI = {
        orderType: orderType,
        taker: ethers.ZeroAddress,
        makerToken: quoteToken.contract_address,
        makerTokenDecimal: quoteToken.token_decimal,
        takerToken: baseToken.contract_address,
        takerTokenDecimal: baseToken.token_decimal,
        makerAmount: amount,
        takerAmount: "1",
        expiry: "1836473051",
        price: price,
      }


      const _signer = await signer;

      assert(_signer, "signer === undefined");
      assert(address, "address === undefined");

      setIsLoading(true);

      const makerAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(formData.makerAmount), Number(formData.makerTokenDecimal));
      const takerAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(formData.takerAmount), Number(formData.takerTokenDecimal));

      // const expiryUnixTimestamp = new BigNumber(Math.floor(new Date(formData.expiry).getTime() / 1000));
      const expiryUnixTimestamp = new BigNumber("1836473051");


      // const { safeAddress } = await getSafeAddress({ 
      //   userAddress: address,
      // });


      // @ts-ignore
      const contractWrappers = new ContractWrappers(window.ethereum, {
        chainId: ConstantProvider.NETWORK_CHAIN_ID,
      });

      const exchangeProxyAddress = contractWrappers.contractAddresses.exchangeProxy;

      console.log("Calling deploySafeContractParam")
      const safeDeploy = await deploySafeContractParam({
        userAddress: address
      });

      console.log({ safeDeploy  })

      console.log("Calling getApproveExchangeProxyParams")
      const initiatorApproval = await getApproveExchangeProxyParams({
        tokenAddress: formData.makerToken,
        userAddress: address,
        safeAddress
      })

      const orderData = {
        maker: safeAddress,
        taker: formData.taker,
        exchangeProxyAddress,
        makerToken: formData.makerToken,
        takerToken: formData.takerToken,
        orderType: formData.orderType as any,
        makerAssetAmount: makerAmount,
        takerAssetAmount: takerAmount,
        expiryUnixTimestamp
      };

      // Create the order
      const { order, pool, salt } = createOrder(orderData);

      // const { orderPsudoSigner: pseudoSigner, pseudoSignature } =
      //   getPseudoSign(order);

      const signature = order.getSignatureWithKey(
        `0x${ConstantProvider.PLATFORM_PRIV_KEY}`,
        SignatureType.EIP712,
      );

      console.log("Calling getRegisterAllowedOrderSignerParams")
      const registerSigner = await getRegisterAllowedOrderSignerParams({
        signerAddress: platformSigner.address,
        userAddress: address,
        safeAddress
      });

      const signatureToString = JSON.stringify(signature, undefined, 2);

      const postData: OrderPostDataI = {
        maker: safeAddress,
        taker: formData.taker,
        exchangeProxyAddress,
        makerToken: formData.makerToken,
        takerToken: formData.takerToken,
        orderType: formData.orderType as any,
        makerAssetAmount: formData.makerAmount,
        takerAssetAmount: formData.takerAmount,
        makerAssetAmountString: makerAmount.toString(),
        takerAssetAmountString: takerAmount.toString(),
        expiry: Number(expiryUnixTimestamp.toString()),
        signature: signatureToString,
        makerRegisterSignerParams: registerSigner?.stringifyParams,
        // makerApprovalParams: undefined,
        // makerDeploySafeParams: undefined,
        makerApprovalParams: initiatorApproval?.stringifyParams,
        makerDeploySafeParams: safeDeploy?.stringifyParams,
        pseudoSignature: JSON.stringify(signature),
        pool,
        salt,
        takerTokenDecimal: formData.takerTokenDecimal,
        makerTokenDecimal: formData.makerTokenDecimal,
      }


      const [baseCurrency, quoteCurrency] = selectedPair.split("/");

      const data: CreateOrderI = {
        orderId: JSON.stringify(postData),
        metadata: JSON.stringify(postData),
        size: Number(formData.makerAmount),
        price: Number(formData.price),
        orderType: "sell",
        userId: "100"
      }
      
      console.log({ data, postData })

      const response = await axios.post(`${ConstantProvider.BACKEND_URL}/orders/create-order`, data);

      console.log(response)

      const allOrders: ReturnOrderI[] = [];

      for (const doneOrder of response.data.done) {
        const order = JSON.parse(doneOrder)
        if (order.side === "buy") {
          allOrders.push(order)
        }
      }

      const tasksPromise = allOrders.map(async (order) => {
        return await getFillOrderTask(order.id, order.size, address, formData);
      });

      const tasksArray = await Promise.all(tasksPromise);
      const tasks = tasksArray.flat();

      const makerTasks = [];
      const takerTasks = [];

      for (const task of tasks) {
        if (task.sender.toLowerCase() === address.toLowerCase()) {
          takerTasks.push(task)
        } else {
          makerTasks.push(task)
        }
      }

      makerTasks.sort((a, b) => {
        // Get the lengths of initCode strings
        const lengthA = a.initCode.length;
        const lengthB = b.initCode.length;

        // Compare based on length only
        return lengthB - lengthA; // Reverse order to have longer strings first
      });

      const sortedData = [...makerTasks, ...takerTasks];


      // for (const allOrder of allOrders) {
      //   const order = JSON.parse(allOrder.id) as BuyPostDataI;

      //   const approval = order.approval;

      //   if (approval) {
      //     console.log("Running Maker Token Allowance Signer...")
      //     const data = JSON.parse(approval);
      //     tasks.push({ ...data })
      //     sortedData.splice(1, 0, { ...data });
      //   }
      // }

      console.log({ sortedData })

      if (sortedData.length > 0) {
        if (safeDeploy) {
          console.log("deploy safe...")
          sortedData.splice(1, 0, { ...safeDeploy.params });
        }

        if (initiatorApproval) {
          console.log("initiatorApproval...")
          sortedData.splice(2, 0, { ...initiatorApproval.params });
        }

        if (registerSigner) {
          console.log("registerSigner...")
          sortedData.splice(3, 0, { ...registerSigner.params });
        }

        console.log({ tasks, tasksArray, sortedData });

        const receipt = await executeSafeOnChainTransaction(sortedData);

        console.log({ receipt })

      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setPrice(selectedToken.current_price);
  }, [orderType, selectedToken]);

  return (
    <TEActionWrapper onClick={handleClick}>
      <TEDropdown>
        <MenuWrapper
          ref={wrapperRef}
          onClick={() => setToggle(!toggle)}
          className="dark:bg-transparent dark:text-darkText dark:border-darkerText font-semibold"
        >
          <LabelWrapper>
            {orderType} <PiCaretUpDown />
          </LabelWrapper>
          {toggle && (
            <LinkWrapper className="dark:bg-darkSecondary dark:text-darkText dark:border dark:border-darkerText  overflow-hidden  mt-2">
              {DROPDOWN_LINKS.map((item, index) => (
                <LinkItem
                  className="dark:hover:bg-[#72568D]"
                  key={index}
                  onClick={() => setOrderType(item.label)}
                >
                  {item.label}
                </LinkItem>
              ))}
            </LinkWrapper>
          )}
        </MenuWrapper>
      </TEDropdown>
      <TEInput
        className="dark:bg-transparent dark:text-darkText dark:border-darkerText"
        placeholder="Price"
        value={price}
        onChange={(e: any) => handleSetPrice(e.target.value)}
      />
      <TEPriceTextWrapper>
        <TEPriceText className="text-danger">
          <PiCaretDownFill />
          {addCommasToNumber(selectedToken?.low_24h || 0)}
        </TEPriceText>
        <TEPriceText className="text-success">
          <PiCaretUpFill />
          {addCommasToNumber(selectedToken?.high_24h || 0)}
        </TEPriceText>
      </TEPriceTextWrapper>
      <TEAmountInputWrapper className="dark:bg-transparent dark:text-darkText dark:border-darkerText">
        <TEAmountInput
          type="number"
          value={amount}
          onChange={(e: any) => handleSetAmount(e.target.value)}
          className="dark:bg-transparent dark:text-darkText"
          placeholder="Amount"
        />
        <TETokenText>
          {type.toLowerCase() === "buy"
            ? selectedToken?.name
            : selectedPair.split("/")[1]}
        </TETokenText>
      </TEAmountInputWrapper>
      <TELotSizeText>
        {/* <BtnOutline
            onClick={() => setLotSize(button)}
            key={index}
            light
            borderless
            label={button}
            active={lotSize === button}
          /> */}
        {BUTTON_LINKS.map((button, index) => (
          <div
            key={index}
            onClick={() => setLotSize(button)}
            className={`cursor-pointer py-1 px-2 rounded-lg text-[12px] dark:text-darkText text-grayLight transition ease-in-out duration-200 delay-100 ${
              lotSize === button
                ? "border border-darkText dark:border-darkerText"
                : "dark:bg-transparent "
            }`}
          >
            {button}
          </div>
        ))}
      </TELotSizeText>
      <div className="py-2">
        <div className="flex items-center justify-between text-[14px] dark:text-darkText">
          <div>Total</div>
          <div className="flex items-center gap-2">
            {formatTotal(
              parseFloat(amount) || 0,
              selectedToken?.current_price || 0
            )}{" "}
            <div className="text-grayLight">{getQuoteCurrency()}</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[12px] dark:text-darkText">
          <div>Available</div>
          <div className="flex items-center gap-2">
            {getAvailableBalance() || 0}{" "}
            <div className="text-grayLight">{getQuoteCurrency()}</div>
          </div>
        </div>
      </div>
      <div>
        <Button inactive={activeTab === type} loading={isLoading} onClick={() => handlePlaceOrder(type)} label={type} />
      </div>
    </TEActionWrapper>
  );
};

export default Sell;
