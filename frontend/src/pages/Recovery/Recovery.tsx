import React, { useState } from "react";

import { ProcessComplete, SelectableCard } from "../../components/Wrapped";
import { Preferences } from "../../components/Recovery";
import styled from "styled-components";
import colors from "../../constants/colors";
import { Layout } from "../../layouts";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.secondary};
  height: calc(100vh - 60px);
`;

const OPTIONS = [
  {
    title: "Social Recovery",
    description: "Choose guardians from your social circle to backup your key",
  },
  {
    title: "Dead man switch (time lock)",
    description:
      "Automatically withdraw your funds after a period of inactivity",
  },
  {
    title: "Third party",
    description: "Back up your key with a trusted institution",
  },
];

const Recovery = () => {
  const [step, setStep] = useState(1);
  const [selectedRecoveryOption, setSelectedRecoveryOption] = useState(null);
  const [walletId, setWalletId] = useState(null);
  const [selectedPreferenceOption, setSelectedPreferenceOption] =
    useState(null);

  const handleRecoveryOptionSelect = (option: any) => {
    setSelectedRecoveryOption(option);
    setStep(2);
  };

  const handlePreferenceOptionSelect = (option: any, id: any) => {
    setSelectedPreferenceOption(option);
    setWalletId(id);
    setStep(3);
  };

  return (
    <Layout>
      <Container className="dark:bg-dark">
        {step === 1 && (
          <SelectableCard
            title={"Select your recovery option"}
            options={OPTIONS}
            onSelect={handleRecoveryOptionSelect}
          />
        )}

        {step === 2 && <Preferences onSelect={handlePreferenceOptionSelect} />}

        {step === 3 && (
          <ProcessComplete
            title="Your recovery option is set up"
            info="Your digital assets are now protected. If you become inactive, we've
            got your back."
          />
        )}
      </Container>
    </Layout>
  );
};

export default Recovery;
