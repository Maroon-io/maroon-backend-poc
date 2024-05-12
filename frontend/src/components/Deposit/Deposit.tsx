import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CreateWallet, DepositAssets } from "../Wallet";
import { CodeVerification, EmailAuth } from "../Auth";
import { ProcessComplete } from "../Wrapped";
import colors from "../../constants/colors";
import NetworkModal from "./NetworkModal";
import useWallet from "../../hooks/useWallet";
import { useDispatch, useSelector } from "react-redux";
import { setWalletTokens } from "../../redux/reducers";

interface DepositProps {
  onClose: any;
}

const Deposit: React.FC<DepositProps> = ({ onClose }) => {
  const { loggedIn, walletTokens } = useSelector((state: any) => {
    const { loggedIn, walletTokens } = state.webAppReducer;
    return { loggedIn, walletTokens };
  });

  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [verifyingData, setVerifyingData] = useState(false);
  const { getWalletBalance } = useWallet();
  const [code, setCode] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState(null);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const handleSelectAsset = (asset: string) => {
    setSelectedAsset(asset);
    setStep(2);
  };

  const handleSelectWallet = (wallet: string) => {
    setSelectedWallet(wallet);
    setStep(2);
  };

  const handleSubmitEmail = (data: any) => {
    setPhoneOrEmail(data);
    setStep(3);
  };

  const handleCodeVerification = (data: any) => {
    setCode(data);
    setStep(4);
  };

  const fetchWalletBalance = async () => {
    const result = await getWalletBalance();
    console.log({ result });
    dispatch(setWalletTokens(result));
  };

  useEffect(() => {
    if (code.length === 6) {
      setVerifyingData(true);

      const sim = setTimeout(() => {
        setVerifyingData(false);
        setStep(5);
      }, 3000);

      () => clearTimeout(sim);
    }
  }, [code]);

  useEffect(() => {
    if (loggedIn && !walletTokens) {
      fetchWalletBalance();
    }
  }, [loggedIn]);

  console.log({ selectedAsset });

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      {/* {step === 1 && (
        <CreateWallet onClose={onClose} onSelect={handleSelectWallet} />
      )}
      {step === 2 && (
        <EmailAuth onClose={onClose} onSubmit={handleSubmitEmail} />
      )}
      {step === 3 && (
        <CodeVerification
          onClose={onClose}
          loading={verifyingData}
          userData={phoneOrEmail}
          onSubmit={handleCodeVerification}
        />
      )}
      {step === 4 && (
        <ProcessComplete
          onClose={onClose}
          title="Wallet created!"
          info="Your deposit address is:"
          wallet="g7itvcfghyvgkkui8itvkbykluo7vlikhmuvlgiukj"
        />
      )} */}

      {step === 1 && (
        <DepositAssets
          tokens={walletTokens}
          onClose={onClose}
          onClick={handleSelectAsset}
        />
      )}

      {step === 2 && (
        <NetworkModal selectedToken={selectedAsset} onClose={onClose} />
      )}
    </div>
  );
};

export default Deposit;
