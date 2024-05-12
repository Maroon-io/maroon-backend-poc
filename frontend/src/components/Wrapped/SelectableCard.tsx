import React, { useState } from "react";
import { styled } from "styled-components";
import colors from "../../constants/colors";
import Button from "./Button";
import { shallowEqual, useSelector } from "react-redux";
// import { Text } from "grommet";

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
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled.div<any>`
  border: 1px solid ${colors.grayLight};
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  &:hover {
    background: ${colors.secondary};
  }

  ${({ selected, theme }) =>
    selected &&
    `
    border: 2px solid ${colors.primary};
  `}
`;
const OptionTitle = styled.div`
  font-weight: bold;
`;

const OptionText = styled.div`
  font-size: 14px;
  color: ${colors.gray};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface SelectableCardProps {
  title: string;
  options: any;
  onSelect: any;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  title,
  options,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const { theme } = useSelector((state: any) => {
    const { theme } = state.webAppReducer;
    return { theme };
  }, shallowEqual);

  const handleOptionClick = () => {
    onSelect(selectedOption);
  };

  console.log({ theme });

  return (
    <CardContainer className="dark:bg-darkSecondary ">
      <TitleText className="dark:text-white">{title}</TitleText>
      <OptionsWrapper>
        {options.map((option: any, index: number) => (
          <Option
            className={` ${
              selectedOption === option ? "dark:bg-darkBg bg-secondary" : ""
            } dark:hover:bg-darkBg hover:ring-1 hover:ring-primary transition ease-in-out delay-100 duration-200`}
            selected={selectedOption === option}
            value={selectedOption}
            onClick={() => setSelectedOption(option)}
            key={index}
            theme={theme}
          >
            <OptionTitle className="dark:text-darkText ">
              {option.title}
            </OptionTitle>
            <OptionText className="dark:text-darkerText">
              {option.description}
            </OptionText>
          </Option>
        ))}
      </OptionsWrapper>

      <ButtonWrapper>
        <Button
          onClick={handleOptionClick}
          disabled={selectedOption ? false : true}
          label={"Select"}
        />
        {/* <Text color={colors.primary} size="1rem">
          Choose later
        </Text> */}
      </ButtonWrapper>
    </CardContainer>
  );
};

export default SelectableCard;
