import React, { useRef } from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import { Spinner, TextInput } from "grommet";

const CodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CodeBox = styled(TextInput)`
  width: 4rem;
  height: 4rem;
  margin: 0 5px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid ${colors.gray};
  font-size: 20px;

  &:active,
  &:focus {
    border: 2px solid ${colors.primary};
  }
`;

interface VerificationCodeInputProps {
  loading: boolean;
  onChange: any;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  loading,
  onChange,
}) => {
  const codeBoxes = Array.from({ length: 6 }, () => useRef<any>(null));

  const handleInputChange = (index: number, e: any) => {
    const input = e.target;
    const value = input.value;
    if (
      value &&
      index < codeBoxes.length - 1 &&
      codeBoxes[index + 1] !== null
    ) {
      codeBoxes[index + 1].current.focus();
    }
    collectCode();
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      codeBoxes[index - 1].current.focus();
    }
    collectCode();
  };

  const handlePaste = (index: number, e: any) => {
    const pastedData = e.clipboardData.getData("text");
    const codeArray = pastedData.replace(/[^\d]/g, "").slice(0, 6);

    codeArray.forEach((character: any, i: number) => {
      if (index + i < codeBoxes.length) {
        codeBoxes[index + i].current.value = character;
        if (index + i < codeBoxes.length - 1) {
          codeBoxes[index + i + 1].current.focus();
        }
      }
    });

    collectCode();
    e.preventDefault();
  };

  const handleKeyPress = (e: any) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);

    if (!/^\d+$/.test(keyValue)) {
      e.preventDefault();
    }
  };

  const collectCode = () => {
    const code = codeBoxes.map((ref) => ref.current.value).join("");
    onChange(code);
  };

  //   useEffect(() => {}, []);

  return (
    <CodeContainer>
      {loading ? (
        <Spinner size="small" />
      ) : (
        codeBoxes.map((ref, index) => (
          <CodeBox
            className="dark:text-darkerText"
            plain
            focusIndicator={false}
            key={index}
            ref={ref}
            maxLength={1}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            onKeyPress={handleKeyPress}
          />
        ))
      )}
    </CodeContainer>
  );
};

export default VerificationCodeInput;
