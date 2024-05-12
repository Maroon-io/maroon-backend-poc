import React, { useState } from "react";
import BtnOutline from "../../components/Wrapped/BtnOutline";
import Table from "../../components/Wrapped/Table";
import ToggleButton from "../../components/Wrapped/ToggleButton";
import colors from "../../constants/colors";
import styled from "styled-components";
import { Deposit } from "../Deposit";

const TransactionsWrapper = styled.div`
  margin: 1rem 0;
  padding: 0.8rem;
  border-radius: 10px;
  background: ${colors.white};
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${colors.dark};
`;

interface WalletAssetsProps {
  chain: any;
  wallet: any;
  columns: any;
  assetData: any;
  loading?: boolean;
}
const WalletAssets: React.FC<WalletAssetsProps> = ({
  chain,
  wallet,
  columns,
  assetData,
  loading,
}) => {
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [activeDeposit, setActiveDeposit] = useState(false);

  const toggleZeroBalances = () => {
    setHideZeroBalances(!hideZeroBalances);
  };

  return (
    <>
      {activeDeposit && <Deposit onClose={() => setActiveDeposit(false)} />}
      <TransactionsWrapper className="dark:bg-darkSecondary">
        <TopWrapper>
          <ToggleContainer className="dark:text-darkText">
            <ToggleButton onClick={toggleZeroBalances} /> Hide zero balances
          </ToggleContainer>

          <div className="flex items-center gap-4">
            <BtnOutline onClick={() => {}} label="Withdraw" />
            <BtnOutline
              onClick={() => setActiveDeposit(true)}
              label="Deposit"
            />
          </div>
        </TopWrapper>

        <Table
          loading={loading}
          chain={chain}
          wallet={wallet}
          columns={columns}
          data={
            hideZeroBalances
              ? assetData.filter((item: any) => parseFloat(item.value) > 0)
              : assetData
          }
        />
      </TransactionsWrapper>
    </>
  );
};

export default WalletAssets;
