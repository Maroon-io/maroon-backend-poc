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
import { SignatureType, ZERO } from "@0x/protocol-utils";
import { platformSigner } from "../../../utils/privateKeyProvider";
import assert from "assert";
import axios from "axios";
import { useEthersSigner } from "../../../contract/ethers";
import { useAccount } from "wagmi";
import { ContractWrappers } from "@0x/contract-wrappers";
import useWallet from "../../../hooks/useWallet";

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

const Buy: React.FC<TradeActionProps> = ({
  type,
  onClick,
  activeTab,
}) => {

  const signer = useEthersSigner();
  const { address } = useAccount();
  const { generateDepositAddress } = useWallet();

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

  const getFillOrderTask = async (id: string, size: number, address: string) => {
    const order = JSON.parse(id) as OrderPostDataI;

    const makerRegisterSignerParams = order.makerRegisterSignerParams;
    const makerDeploySafeParams = order.makerDeploySafeParams;

    const tasks: UserOperation[] = [];
    if (makerDeploySafeParams) {
      console.log("Running Maker Safe Deploy...")
      const data = JSON.parse(makerDeploySafeParams);
      tasks.push({ ...data })
    }

    if (makerRegisterSignerParams) {
      console.log("Running Maker Register Signer...")
      const data = JSON.parse(makerRegisterSignerParams);
      tasks.push({ ...data })
    }


    const orderData = {
      maker: order.maker,
      taker: order.taker,
      makerToken: order.makerToken,
      takerToken: order.takerToken,
      makerAmount: new BigNumber(order.makerAssetAmountString),
      takerAmount: new BigNumber(order.takerAssetAmountString),
      expiry: new BigNumber(order.expiry),
      chainId: ConstantProvider.NETWORK_CHAIN_ID,
      verifyingContract: order.exchangeProxyAddress,
      pool: order.pool,
      salt: new BigNumber(order.salt),
      takerTokenFeeAmount: ZERO,
      feeRecipient: ethers.ZeroAddress,
      sender: order.taker
    };

    const pseudoSignature = JSON.parse(order.pseudoSignature)

    const { order: _order } = createLimitOrder(orderData);

    const takerAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(size), Number(order.takerTokenDecimal));


    const orderEncodedTxData = await fillOrderEncodedTransactionData({
      order: _order,
      orderSignature: pseudoSignature,
      takerAssetAmount: takerAmount
    })
    const response = await generateDepositAddress(address);
    if (response && response.safeAddress) {
      
      const fillOrderParams = await fillOrder({
        orderEncodedTxData,
        userAddress: address,
        safeAddress: response.safeAddress
      })
  
      tasks.push({ ...fillOrderParams.params })
  
      console.log({ tasks });
    }

    return tasks;
  }


  const handlePlaceOrder = async (type: string) => {
    try {
      const _signer = await signer;

      assert(_signer, "signer === undefined");
      assert(address, "address === undefined");

      setIsLoading(true);
      const formData: FormDataI = {
        orderType: orderType,
        taker: ethers.ZeroAddress,
        makerToken: baseToken.contract_address,
        makerTokenDecimal: baseToken.token_decimal,
        takerToken: quoteToken.contract_address,
        takerTokenDecimal: quoteToken.token_decimal,
        makerAmount: amount,
        takerAmount: "1",
        expiry: "1836473051",
        price: price,
      }

      const takerSafeAddress = safeAddress;


      console.log("Calling Taker deploySafeContractParam")
      const takerSafeDeploy = await deploySafeContractParam({
        userAddress: address
      })

      const takerApproval = await getApproveExchangeProxyParams({
        tokenAddress: formData.takerToken,
        userAddress: address,
        safeAddress: takerSafeAddress
      })

      console.log("Calling getRegisterAllowedOrderSignerParams")
      const takerRegisterSigner = await getRegisterAllowedOrderSignerParams({
        signerAddress: platformSigner.address,
        userAddress: address,
        safeAddress: takerSafeAddress
      });

      const buyData: BuyPostDataI = {
        safeAddress: takerSafeAddress,
        token: formData.takerToken,
        tokenDecimal: formData.takerTokenDecimal,
        expiry: "1836473051",
        safeDeploy: takerSafeDeploy?.stringifyParams,
        approval: takerApproval?.stringifyParams,
        registerSigner: takerRegisterSigner?.stringifyParams
      }

      const [baseCurrency, quoteCurrency] = selectedPair.split("/");

      const postData: CreateOrderI = {
        orderId: JSON.stringify(buyData),
        metadata: JSON.stringify(buyData),
        size: Number(amount),
        price: Number(price),
        orderType: "buy",
        userId: "100"
      }
      console.log({ postData })

      const response = await axios.post(`${ConstantProvider.BACKEND_URL}/orders/create-order`, postData);

      console.log('Response:', response.data);


      const allOrders: ReturnOrderI[] = [];

      for (const doneOrder of response.data.done) {
        const order = JSON.parse(doneOrder)
        if (order.side === "sell") {
          allOrders.push(order)
        }
      }

      if (response.data.partial) {
        const order = JSON.parse(response.data.partial)
        if (order.side === "sell") {
          allOrders.push(order)
        }
      }

      const tasksPromise = allOrders.map(async (order) => {
        return await getFillOrderTask(order.id, order.size, address);
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


      for (const allOrder of allOrders) {
        const order = JSON.parse(allOrder.id) as OrderPostDataI;

        const makerApprovalParams = order.makerApprovalParams;

        if (makerApprovalParams) {
          console.log("Running Maker Token Allowance Signer...")
          const data = JSON.parse(makerApprovalParams);
          tasks.push({ ...data })
          sortedData.splice(1, 0, { ...data });
        }
      }

      console.log({ sortedData })

      if (sortedData.length > 0) {
        if (takerSafeDeploy) {
          sortedData.splice(2, 0, { ...takerSafeDeploy.params });
        }

        if (takerApproval) {
          sortedData.splice(3, 0, { ...takerApproval.params });
        }

        if (takerRegisterSigner) {
          sortedData.splice(4, 0, { ...takerRegisterSigner.params });
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
            className={`cursor-pointer py-1 px-2 rounded-lg text-[12px] dark:text-darkText text-grayLight transition ease-in-out duration-200 delay-100 ${lotSize === button
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

export default Buy;
