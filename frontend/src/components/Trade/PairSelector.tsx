import React, { useEffect, useState } from "react";
import {
  BtnOutline,
  BtnUnderline,
  DropDown,
  SearchInput,
  Spinner,
} from "../Wrapped";
import { IoCloseSharp } from "react-icons/io5";
import { PiCaretRightBold } from "react-icons/pi";
import { CryptoIcon } from "../CryptoIcon";
import { getMarkets, getMultipleMarketData } from "../../api/cryptoquoteApi";
import { addCommasToNumber, formatNumber } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPair, setSelectedToken, setTradeToken } from "../../redux/reducers";
import { contractAddresses, tokenDecimals } from "../../constants";

const BTN_LINKS = ["Favorites", "All", "Spots", "Futures"];
const BUTTON_LINKS = [
  "DeFi",
  "Web3",
  "Layer 1",
  "Layer 2",
  "Metaverse",
  "Infrastructure",
  "Seed",
  "AI",
  "Gaming",
  "Oracles",
];
const CHAINS = [
  { label: "USDT" },
  { label: "BTC" },
  { label: "ETH" },
  { label: "TEST8" },
];
const TABLE_DATA = [
  {
    name: "BTC",
    fullName: "Bitcoin",
    price: "$48,263.40",
    change24h: "+1.67%",
    volume: "$251.81M",
  },
  {
    name: "ETH",
    fullName: "Ethereum",
    price: "$2,510.96",
    change24h: "+0.74%",
    volume: "$88.96M",
  },
  {
    name: "SOL",
    fullName: "Solana",
    price: "$109.27",
    change24h: "+0.88%",
    volume: "$37.49M",
  },
  {
    name: "LINK",
    fullName: "ChainLink",
    price: "$20.04",
    change24h: "+9.16%",
    volume: "$15.48M",
  },
  {
    name: "XMR",
    fullName: "Monero",
    price: "$121.54",
    change24h: "+3.26%",
    volume: "$11.81M",
  },
  {
    name: "ADA",
    fullName: "Cardano",
    price: "$0.54679298",
    change24h: "+2.36%",
    volume: "$11.32M",
  },
  {
    name: "REQ",
    fullName: "Request",
    price: "$0.12150644",
    change24h: "-14.82%",
    volume: "$4.76M",
  },
  {
    name: "BHC",
    fullName: "Bitcoin Cash",
    price: "$275.79",
    change24h: "+12.37%",
    volume: "$5.14M",
  },
  {
    name: "NEAR",
    fullName: "Near Protocol",
    price: "$3.12",
    change24h: "+2.72%",
    volume: "$4.62M",
  },
  {
    name: "LTC",
    fullName: "Litecoin",
    price: "$71.94",
    change24h: "+2.28%",
    volume: "$4.29M",
  },
  {
    name: "AVAX",
    fullName: "Avalanche",
    price: "$39.98",
    change24h: "+3.35%",
    volume: "$9.46M",
  },
];

interface PairSelectorProps {
  onClose: any;
}

const PairSelector: React.FC<PairSelectorProps> = ({ onClose }) => {
  const { walletAddress, loggedIn } = useSelector((state: any) => {
    const { walletAddress, loggedIn } = state.webAppReducer;
    return { walletAddress, loggedIn };
  });

  const [currentNav, setCurrentNav] = useState("Favorites");
  const [activeTab, setActiveTab] = useState("DeFi");
  const [chain, setChain] = useState("USDT");
  const [token, seToken] = useState("BTC");

  const [searchQuery, setSearchQuery] = useState("");
  const [markets, setMarkets] = useState<any>([]);
  const [loadingMarkets, setLoadingMarkets] = useState(false);

  const dispatch = useDispatch();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleChainChange = (selectedChain: string) => {
    setChain(selectedChain);
  };

  const fetchMarkets = async () => {
    setLoadingMarkets(true);

    // const params = {
    //   vs_currency: "usd",
    //   ids: "bitcoin,ethereum,tether,usd-coin,binancecoin,tether,avalanche-2,link,matic-network,dai,uniswap",
    //   per_page: 20,
    // };
    const result: any = []
    // const result = await getMultipleMarketData(params);

    // if (!result) return;
    const listArr = [];

    // for (let i = 0; i < result.length; i++) {
    //   let current = result[i];

    //   let listObj = {
    //     value: addCommasToNumber(current.current_price.toFixed(2)),
    //     change: current.price_change_percentage_24h.toFixed(2),
    //     symbol: current.symbol.toUpperCase(),
    //     name: current.name,
    //     volume: formatNumber(current.total_volume),
    //     image: current.image,
    //     total_volume: current.total_volume,
    //     high_24h: current.high_24h,
    //     low_24h: current.low_24h,
    //     current_price: current.current_price,
    //     price_change_24h: current.price_change_24h,
    //     contract_address: contractAddresses[current.id],
    //     token_decimal: tokenDecimals[current.id]
    //   };

    //   listArr.push(listObj);
    // }

    // console.log({ listArr })

    const test18Data = {
      value: 1,
      change: "0",
      symbol: "TEST18",
      name: "Test18",
      volume: 10,
      image:
        "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
      total_volume: 1000,
      high_24h: 1.2,
      low_24h: 0.9,
      current_price: 1,
      price_change_24h: 0,
      contract_address: "0x0B2639cc472F03a7a57CB10b88E1563e4cB1218c",
      token_decimal: "18",
    };

    const test8Data = {
      value: 1,
      change: "0",
      symbol: "TEST8",
      name: "Test8",
      volume: 10,
      image:
        "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
      total_volume: 1000,
      high_24h: 1.2,
      low_24h: 0.9,
      current_price: 1,
      price_change_24h: 0,
      contract_address: "0x0E891b740A47177fFf7F15856fC47972810F54Bf",
      token_decimal: "8",
    };
    listArr.push(test18Data, test8Data);

    setMarkets(listArr);

    setLoadingMarkets(false);
  };

  console.log({ markets });

  const handleTokenSelect = (token: any) => {
    dispatch(setSelectedPair(`${token.symbol}/${chain}`.toUpperCase()));
    dispatch(setSelectedToken(token));

    const quoteToken = markets.find((x: any) => x.symbol.toLowerCase() === chain.toLowerCase());

    dispatch(setTradeToken({ quoteToken, baseToken: token }))

    onClose();
  };

  useEffect(() => {
    if (loggedIn) {
      fetchMarkets();
    }
  }, [loggedIn]);

  return (
    <div className="bg-secondary flex flex-col gap-4 shadow-xl text-dark text-[14px] min-w-[656px] h-[40rem] animate__animated animate__fadeInLeft absolute top-[11rem] rounded-[10px] dark:text-darkText dark:bg-darkSecondary p-4">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          {BTN_LINKS.map((link, index) => (
            <BtnUnderline
              key={index}
              label={link}
              active={currentNav === link}
              onClick={setCurrentNav}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SearchInput onChange={setSearchQuery} />
          <IoCloseSharp
            className="cursor-pointer hover:scale-110 transition ease-in-out"
            onClick={onClose}
          />
        </div>
      </div>
      <div className="w-full flex flex-col bg-white h-[90%] dark:bg-[#342530] min-w-[628px] p-4 rounded-[10px] gap-8">
        <div className="flex items-center justify-between gap-2">
          {" "}
          <div className="w-[6rem]">
            <DropDown
              label={chain}
              children={CHAINS}
              onSelect={handleChainChange}
            />
          </div>
          {BUTTON_LINKS.slice(0, 6).map((button, index) => (
            <BtnOutline
              onClick={handleTabChange}
              key={index}
              light
              borderless
              label={button}
              active={button === activeTab}
            />
          ))}
          <div className="flex items-center cursor-pointer justify-center text-grayLight h-full dark:text-darkerText rounded-lg hover:text-dark dark:hover:text-white ring-1 ring-tertiary dark:ring-1 dark:ring-darkerText px-2 py-1 text-sm hover:scale-x-[1.03] active:translate-y-[0.2rem] transition ease-in-out duration-200">
            <PiCaretRightBold />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b border-grayWhite dark:border-darkBg">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">24h Change</th>
                <th className="px-4 py-2 text-left">Volume</th>
              </tr>
            </thead>

            {loadingMarkets && (
              <tbody>
                <tr>
                  <td colSpan={4} className="py-8">
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              </tbody>
            )}

            {!loadingMarkets && (
              <>
                {!markets || markets.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={4} className="py-8">
                        <div className="flex italic items-center justify-center h-[20rem] text-darkerText">
                          No data available
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {!loadingMarkets &&
                      markets.map((coin: any, index: number) => (
                        <tr
                          onClick={() => handleTokenSelect(coin)}
                          key={index}
                          className={`${index % 2 === 0 ? "bg-gray-100" : ""} ${index === markets.length - 1 ? "" : "border-b"
                            } border-grayWhite dark:border-darkBg cursor-pointer hover:bg-grayWhite dark:hover:bg-darkSecondary`}
                        >
                          <td className="px-4 py-2">
                            {" "}
                            <div className="flex gap-2">
                              <img
                                className="w-6 h-6"
                                src={coin.image}
                                alt={coin.name}
                              />
                              {/* <CryptoIcon
                                currency={coin.symbol.toLowerCase()}
                                margin="none"
                              /> */}
                              {coin.name}
                            </div>
                          </td>
                          <td className="px-4 py-2">${coin.value}</td>
                          <td
                            className={`px-4 py-2 ${coin?.change.startsWith("-")
                              ? "text-danger"
                              : "text-success"
                              }`}
                          >
                            {parseFloat(coin.change) > 0
                              ? `+${coin.change}`
                              : coin.change}
                            %
                          </td>
                          <td className="px-4 py-2">${coin.volume}</td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PairSelector;
