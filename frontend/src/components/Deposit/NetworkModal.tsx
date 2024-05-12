import { IoCloseSharp, IoCopyOutline } from "react-icons/io5";
import { Button, CopyToClipboard, Icon } from "../../components/Wrapped";
import ButtonPlain from "../../components/Wrapped/ButtonPlain";
import colors from "../../constants/colors";
import { TextInput } from "grommet";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CryptoIcon } from "../CryptoIcon";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import QRCode from "react-qr-code";
import { HiOutlineDotsVertical, HiPlus } from "react-icons/hi";
import { copyToClipboard } from "../../utils";
import { LinkWrapper } from "../Wallet/style";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useSelector } from "react-redux";
import useWallet from "../../hooks/useWallet";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.dark};
  width: 32rem;
  background: ${colors.white};
  border-radius: 10px;
  padding: 1.5rem;
  gap: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleText = styled.div`
  font-size: 20px;
`;

const NETWORKS = [
  {
    name: "MATIC",
    time: "9 mins",
    gas: "0.000001",
    network: "Polygon",
  },

  {
    name: "TRX",
    time: "2 mins",
    gas: "0.00005",
    network: "Tron (TRC20)",
  },

  {
    name: "ETH",
    time: "2 mins",
    gas: "0.00005",
    network: "Ethereum (ERC20)",
  },

  {
    name: "Arbitrum",
    time: "3 mins",
    gas: "0.001",
    network: "Arbitrum One",
  },

  {
    name: "Optimism",
    time: "9 mins",
    gas: "0.000001",
    network: "Optimism",
  },
];

interface NetworkModalProps {
  onSubmit?: any;
  onClose: any;
  selectedToken: any;
}

const NetworkModal: React.FC<NetworkModalProps> = ({
  onSubmit,
  onClose,
  selectedToken,
}) => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const { openOrders, tradeHistory, loggedIn, walletAddress, safeAddress } =
    useSelector((state: any) => {
      const { openOrders, tradeHistory, loggedIn, walletAddress, safeAddress } =
        state.webAppReducer;
      return { openOrders, tradeHistory, loggedIn, walletAddress, safeAddress };
    });
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [networkToggle, setNetworkToggle] = useState(false);
  const [copied, setCopied] = useState(false);
  const [walletToggle, setWalletToggle] = useState(false);
  const [generatedAddress, setGeneratedAddress] = useState<string | null>();

  const { generateDepositAddress } = useWallet();

  const handleCopyWallet = () => {
    copyToClipboard(walletAddress);
    setCopied(true);
  };

  const handleSelectNetwork = async (network: string) => {
    if (network.toLowerCase() !== "polygon") {
      setNetworkToggle(true);
    } else {
      setSelectedNetwork(network);
      setNetworkToggle(false);
      // const response = await generateDepositAddress(walletAddress);
      // setGeneratedAddress(response?.safeAddress);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Container className="dark:bg-darkSecondary min-h-[35rem]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <TitleText className="dark:text-darkText">Deposit</TitleText>
          <div className="dark:text-darkerText">
            Ether ({selectedToken?.currency})
          </div>
        </div>
        <div
          onClick={onClose}
          className="cursor-pointer dark:text-darkText text-sm"
        >
          <IoCloseSharp />
        </div>
      </div>

      <div className="flex flex-col gap-8 px-2">
        <div className="flex flex-col">
          <div className="text-dark dark:text-darkText pb-1 px-2">Asset</div>
          <div className="flex items-center border border-grayWhite dark:border-darkerText justify-between rounded-[10px] px-4 py-2">
            <div className="flex items-center dark:text-white gap-2">
              <div>
                <CryptoIcon currency={selectedToken?.currency.toLowerCase()} />
              </div>
              <div>{selectedToken?.currency}</div>
            </div>

            <div className="flex flex-col text-dark dark:text-darkText text-right">
              <div>
                {selectedToken?.balance} {selectedToken?.currency}
              </div>
              <div className="dark:text-darkerText">0.00 USD</div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col cursor-pointer"
          onClick={() => setNetworkToggle(!networkToggle)}
        >
          <div className="text-dark dark:text-darkText pb-1 px-2">
            Select Network
          </div>
          <div className="flex min-h-[42px] items-center border border-grayWhite dark:border-darkerText justify-between rounded-[10px] p-4">
            <div
              className={`${
                selectedNetwork ? "dark:text-white" : "dark:text-darkerText"
              } `}
            >
              {selectedNetwork || "Select Network"}
            </div>

            <div className="dark:text-darkerText">
              {networkToggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
          {networkToggle && (
            <div className="mt-2 flex flex-col dark:bg-[#342530] dark:text-darkText gap-2 rounded-[10px] py-2 border border-grayWhite dark:border-darkerBg shadow">
              {NETWORKS.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectNetwork(item.network)}
                  className={`${
                    item.name.toLowerCase() === "matic"
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  } flex justify-between dark:hover:bg-darkBg hover:bg-grayWhite px-4 py-2`}
                >
                  <div className="flex flex-col">
                    <div>{item.name}</div>
                    <div className={` dark:text-darkerText`}>
                      {item.network}
                    </div>
                  </div>
                  <div className="flex flex-col text-right">
                    <div>{item.time}</div>
                    <div className="dark:text-darkerText">
                      {item.gas} ETH minimum
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedNetwork && !networkToggle && (
          <div className="flex flex-col gap-4">
            {" "}
            <div className="flex items-center justify-center">
              <QRCode
                style={{
                  borderRadius: "10px",
                  width: "172px",
                  height: "172px",
                }}
                value="hey"
              />
            </div>
            <div className="flex flex-col gap-2 py-2">
              <div className="flex items-center justify-between dark:text-white px-2">
                <div className="">Wallet Address</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {copied && <div className="text-primary">Copied!</div>}
                    <IoCopyOutline
                      onClick={handleCopyWallet}
                      className={`${
                        copied ? "text-primary" : ""
                      } cursor-pointer w-4 h-4 active:text-primary hover:text-darkerText`}
                    />
                  </div>

                  <div className="relative">
                    {" "}
                    <HiOutlineDotsVertical
                      onClick={() => setWalletToggle(!walletToggle)}
                      className="cursor-pointer w-4 h-4 active:text-primary hover:text-darkText"
                    />
                    {walletToggle && (
                      <div className="absolute top-[1.5rem] right-0 dark:bg-gradient-to-bl dark:from-darkBg dark:to-darkerBg overflow-hidden rounded-[5px] bg-white shadow-md py-2">
                        <div className="cursor-pointer whitespace-nowrap p-2 flex items-center gap-2 dark:text-[#BDBDBD] dark:hover:text-white dark:hover:bg-[#72568D] hover:bg-grayWhite p-3">
                          <MdOutlineRemoveRedEye className="w-4 h-4" />
                          View Full Address
                        </div>

                        <div className="cursor-pointer whitespace-nowrap p-2 flex items-center gap-2 dark:text-[#BDBDBD] dark:hover:text-white dark:hover:bg-[#72568D] hover:bg-grayWhite p-3">
                          <HiPlus className="w-4 h-4" />
                          Create New Wallet
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="min-h-[42px] border border-grayWhite dark:border-darkerText justify-between rounded-[10px] p-4">
                <div className="dark:text-white text-center">
                  {safeAddress || "-"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default NetworkModal;
