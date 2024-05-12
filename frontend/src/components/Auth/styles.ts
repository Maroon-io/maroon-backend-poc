import { TextInput } from "grommet";
import { styled } from "styled-components";
import colors from "../../constants/colors";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledInput = styled(TextInput)`
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid ${colors.grayLight};
  &:focus {
    border: 2px solid ${colors.primary};
  }
`;
