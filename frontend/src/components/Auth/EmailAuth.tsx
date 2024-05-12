import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../../components/Wrapped";
import ButtonPlain from "../../components/Wrapped/ButtonPlain";
import colors from "../../constants/colors";
import { TextInput } from "grommet";
import React, { useState } from "react";
import styled from "styled-components";
import { InputWrapper, StyledInput } from "./styles";

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

const Divider = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.gray};
  margin: 1em 0;
  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${colors.grayLight};
  }
  &:before {
    margin-right: 0.5em;
  }
  &:after {
    margin-left: 0.5em;
  }
`;

const AltWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface EmailAuthProps {
  onSubmit: any;
  onClose: any;
}

const EmailAuth: React.FC<EmailAuthProps> = ({ onSubmit, onClose }) => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");

  const handleSubmit = () => {
    onSubmit(phoneOrEmail);
  };

  return (
    <Container className="dark:bg-darkSecondary">
      <div className="flex justify-between">
        <TitleText className="dark:text-darkText">
          Choose your authentication method
        </TitleText>
        <div
          onClick={onClose}
          className="cursor-pointer dark:text-darkText text-sm"
        >
          <IoCloseSharp />
        </div>
      </div>
      <InputWrapper>
        <StyledInput
          plain
          focusIndicator={false}
          placeholder="Enter your phone number or email"
          value={phoneOrEmail}
          onChange={(e) => setPhoneOrEmail(e.target.value)}
          className="dark:text-darkText"
        />
        <Button
          onClick={handleSubmit}
          disabled={!phoneOrEmail}
          label="Continue"
        />
      </InputWrapper>

      <AltWrapper>
        <Divider className="dark:text-darkerText">or</Divider>

        <ButtonPlain label="Continue with WebAuth" />
        <ButtonPlain label="Continue with Web3 EOA Wallet" />
        <ButtonPlain label="Continue with Google" />
        <ButtonPlain label="Continue with Apple" />
      </AltWrapper>
    </Container>
  );
};

export default EmailAuth;
