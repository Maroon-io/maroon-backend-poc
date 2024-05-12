import React from "react";
import styled from "styled-components";
import VerificationCodeInput from "./VerificationCodeInput";
import colors from "../../constants/colors";
import { IoCloseSharp } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.dark};
  width: 32rem;
  background: ${colors.white};
  border-radius: 10px;
  padding: 2rem;
  gap: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const OTPContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const InfoWrapper = styled.div`
  font-size: 14px;
  color: ${colors.gray};
`;

const ResendText = styled.div`
  color: ${colors.primary};
  align-self: center;
  cursor: pointer;
`;

interface CodeVerificationProps {
  userData: any;
  onSubmit: any;
  loading: boolean;
  onClose: any;
}

const CodeVerification: React.FC<CodeVerificationProps> = ({
  userData,
  onSubmit,
  loading,
  onClose,
}) => {
  const handleOTPChange = (otp: string) => {
    onSubmit(otp);
  };

  return (
    <Container className="dark:bg-darkSecondary">
      <div className="flex justify-between">
        {" "}
        <Title className="dark:text-darkText">
          Enter your verification code
        </Title>
        <div
          onClick={onClose}
          className="cursor-pointer dark:text-darkText text-sm"
        >
          <IoCloseSharp />
        </div>
      </div>
      <InfoWrapper className="dark:text-darkerText">
        We sent it to {userData}
      </InfoWrapper>

      <OTPContainer>
        <VerificationCodeInput loading={loading} onChange={handleOTPChange} />
      </OTPContainer>

      {!loading && <ResendText onClick={() => {}}>Resend code</ResendText>}
    </Container>
  );
};

export default CodeVerification;
