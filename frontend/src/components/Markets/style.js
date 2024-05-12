import colors from "../../constants/colors";
import { TableCell } from "grommet";
import styled from "styled-components";

export const CardContainer = styled.div`
  background: ${colors.white};
  padding: 0.5rem;
  border-radius: 10px;
  font-size: 14px;
  width: 100%;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const HeaderCell = styled.div`
  color: ${colors.gray};
`;

export const ChangeCell = styled(TableCell)`
  color: ${({ value }) =>
    value > 0 ? colors.success : value < 0 ? colors.danger : colors.gray};

  display: flex;
  align-items: center;
  white-space: nowrap;
  justify-content: flex-end;
  padding: 0;
  font-size: 14px;
`;

export const Change = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
`;

export const Cell = styled(TableCell)`
  font-weight: 500;
  font-size: 14px;
`;

export const ValueCell = styled(TableCell)`
  font-weight: 500;
  padding-left: 0;
  padding-right: 0;
`;

export const SymbolCell = styled(TableCell)`
  padding-left: 0;
  padding-right: 0;
`;

export const Value = styled.div`
  width: 100%;
  text-align: end;
  padding-right: 2rem;
  font-size: 14px;
`;

export const IndexCell = styled.tr`
  display: flex;
  gap: 1rem;
`;

export const TitleText = styled.div`
  font-weight: 800;
  font-size: 28px;
  color: ${colors.dark};
`;
