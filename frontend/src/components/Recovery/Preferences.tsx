import React, { useState } from "react";
import colors from "../../constants/colors";
import { TextInput } from "grommet";
import styled from "styled-components";
import { Button, DropDown } from "../Wrapped";

const CardContainer = styled.div`
  background: ${colors.white};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${colors.dark};
  padding: 2.5rem 2rem;
  gap: 2rem;
  width: 32rem;
`;

const TitleText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const OptionsWrapper = styled.div`
  //   display: flex;
  //   flex-direction: column;
  //   gap: 1rem;
`;

const Option = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const OptionTitle = styled.div`
  font-weight: bold;
`;

const OptionText = styled.div`
  font-size: 14px;
  color: ${colors.gray};
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
`;

const StyledInput = styled(TextInput)<any>`
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid ${colors.grayLight};
  &:focus {
    border: 2px solid ${colors.primary};
  }
`;

interface PreferencesProps {
  onSelect: any;
}

const Preferences: React.FC<PreferencesProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(
    "Select length of Inactivity"
  );

  const [walletId, setWalletId] = useState(null);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const handleOptionSelect = (option: any, walletId: any) => {
    onSelect(option, walletId);
  };

  const OPTIONS = [
    { label: "After 6 months of inactivity" },
    { label: "After 12 months of inactivity" },
    { label: "After 1 year of inactivity" },
  ];

  //   console.log('selectedOption', selectedOption);
  //   console.log('walletId', walletId);

  return (
    <CardContainer className="dark:bg-darkSecondary">
      <TitleText className="dark:text-darkText">
        {"Set your preferences"}
      </TitleText>

      <Option>
        <OptionTitle className="dark:text-darkText">
          When should automatic withdrawal occur?
        </OptionTitle>
        <DropDown
          onSelect={handleOptionClick}
          large
          children={OPTIONS}
          label={selectedOption}
        />
      </Option>

      <Option>
        <OptionTitle className="dark:text-darkText">
          Where should your funds be sent?
        </OptionTitle>

        <StyledInput
          plain
          focusIndicator={false}
          placeholder="Enter wallet ID"
          value={walletId}
          onChange={(e: any) => setWalletId(e.target.value)}
          className="dark:text-darkerText"
        />
      </Option>

      <ButtonWrapper>
        <Button
          onClick={() => handleOptionSelect(selectedOption, walletId)}
          disabled={selectedOption && walletId ? false : true}
          label="Confirm"
        />
      </ButtonWrapper>
    </CardContainer>
  );
};

export default Preferences;
