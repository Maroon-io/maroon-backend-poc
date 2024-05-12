import BtnOutline from "../../components/Wrapped/BtnOutline";
import DropDown from "../../components/Wrapped/DropDown";
import React, { useEffect, useState } from "react";
import { FaChartLine } from "react-icons/fa6";
import WalletAssets from "./WalletAssets";
import { BalanceWrapper, DropWrapper, LinkWrapper } from "./style";

const CHAINS = [
  { label: "All chains" },
  { label: "Ethereum" },
  { label: "Bitcoin" },
  { label: "Cosmos" },
  { label: "Dogecoin" },
  { label: "Filecoin" },
];

const WALLETS = [{ label: "All wallets" }];

const COLUMNS = ["Name", "Chain", "Wallet", "Balance", "Value", "24h Change"];
const DATA = [
  {
    name: "AAVE",
    chain: "Ethereum",
    wallet: "0x34yuiomnbuvyctromiunbyvt",
    balance: 2.899,
    id: "AAVE",
  },
  {
    name: "LINK",
    chain: "Ethereum",
    wallet: "0xnoibuyvipboihnbsbjs",
    balance: 0.7839,
    id: "Chainlink",
  },
  {
    name: "ETH",
    chain: "Ethereum",
    wallet: "0x1283782819283njb",
    balance: 0.98763,
    id: "Ethereum",
  },

  {
    name: "ATOM",
    chain: "Cosmos",
    wallet: "0x1283782819283njb",
    balance: 1.286,
    id: "Cosmos",
  },

  {
    name: "FIL",
    chain: "Filecoin",
    wallet: "0x1283782819283njb",
    balance: 0,
    id: "Filecoin",
  },

  {
    name: "XRP",
    chain: "XRP",
    wallet: "0x56v675i7iuniouhugyu7788",
    balance: 16.83,
    id: "ripple",
  },

  {
    name: "OPT",
    chain: "Ethereum",
    wallet: "0x56v675i7iuniouhugyu7788",
    balance: 0,
    id: "Optimism",
  },
  {
    name: "BTC",
    chain: "Bitcoin",
    wallet: "0xsju2uy928njdu992jd",
    balance: 3.839,
    id: "Bitcoin",
  },
  {
    name: "DOGE",
    chain: "Dogecoin",
    wallet: "0xin8w9wnwuniomwowlw",
    balance: 0,
    id: "Dogecoin",
  },

  {
    name: "ZIL",
    chain: "ZIL",
    wallet: "0xin8w9wnwuniomwowlw",
    balance: 0,
    id: "Zilliqa",
  },

  {
    name: "ADA",
    chain: "ADA",
    wallet: "0xin8w9wnwuniomwowlw",
    balance: 0,
    id: "Cardano",
  },

  {
    name: "ADX",
    chain: "ADX",
    wallet: "0xin8w9wnwuniomwowlw",
    balance: 0,
    id: "adex",
  },
];

interface BalanceProps {
  children?: any;
  balances?: any;
  loading?: boolean;
}

const Balance: React.FC<BalanceProps> = ({ children, balances, loading }) => {
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [chain, setChain] = useState("All chains");
  const [wallet, setWallet] = useState("All wallets");
  const [walletBalances, setWalletBalances] = useState([]);

  const toggleZeroBalances = () => {
    setHideZeroBalances(!hideZeroBalances);
  };

  const handleChainChange = (selectedChain: string) => {
    setChain(selectedChain);
  };

  const handleWalletChange = (selectedWallet: string) => {
    setWallet(selectedWallet);
  };

  return (
    <BalanceWrapper>
      <LinkWrapper>
        <DropWrapper>
          <DropDown
            darker
            label={chain}
            children={CHAINS}
            onSelect={handleChainChange}
          />
          <DropDown
            darker
            label={wallet}
            children={WALLETS}
            onSelect={handleWalletChange}
          />
        </DropWrapper>

        <BtnOutline
          onClick={() => {}}
          label="Show performance"
          icon={<FaChartLine />}
        />
      </LinkWrapper>

      {children && children}

      <WalletAssets
        loading={loading}
        assetData={balances}
        chain={chain}
        wallet={wallet}
        columns={COLUMNS}
      />
    </BalanceWrapper>
  );
};

export default Balance;
