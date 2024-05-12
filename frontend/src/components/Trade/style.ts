import colors from "../../constants/colors";
import styled from "styled-components";

export const TEContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
`;

export const TEActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const OrderTableWrapper = styled.div`
  overflow-x: auto;
  background: ${colors.white};
  border-radius: 10px;
  width: 50%;
`;
export const TableContainer = styled.div`
  width: 100%;
  padding: 5px 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  font-weight: 500;
`;

export const TableHeader = styled.th`
  border-bottom: 1px solid #ddd;
  padding: 4px 8px;
  text-align: left;
  font-weight: 500;

  color: ${colors.dark};
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
  }
`;

export const TablePriceCell = styled.td<any>`
  border: none;
  padding: 8px;
  color: ${({ side }) => (side === 'buy' ? "green" : "red")};
`;

export const TableCell = styled.td`
  padding: 8px;
`;

export const TableTitle = styled.div`
  padding: 1rem 0 0 1.2rem;
  font-weight: 800;
`;

export const TEActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 48%;
`;

export const TEDropdown = styled.div`
  width: 100%;
`;

export const LabelWrapper = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ value }) => (value ? "1px" : "5px")};
  width: 100%;
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  border: 1px solid ${colors.tertiary};
  color: ${colors.dark};
  background: ${colors.grayWhite};
  padding: 1.1rem;
  cursor: pointer;
  height: 1.75rem;
  &:hover,
  &:focus {
    border: 2px solid ${colors.primary};
  }
  transition: 0.2s ease-in-out;
`;

export const TEInput = styled.input`
  border-radius: 10px;
  border: 1px solid ${colors.tertiary};
  color: ${colors.dark};
  background: ${colors.grayWhite};
  padding: 1.1rem;
  cursor: pointer;
  height: 1.75rem;
  &:hover,
  &:focus {
    border: 2px solid ${colors.primary};
  }
  transition: 0.2s ease-in-out;
`;

export const TEAmountInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid ${colors.tertiary};
  color: ${colors.dark};
  background: ${colors.grayWhite};
  padding: 1.1rem 0;
  cursor: pointer;
  height: 1.75rem;
  &:hover,
  &:focus {
    border: 2px solid ${colors.primary};
  }
  transition: 0.2s ease-in-out;
`;

export const TEAmountInput = styled.input<any>`
  border: none;
  width: 80%;
  color: ${colors.dark};
  background: none;
  cursor: pointer;
  height: 1.75rem;
  border-radius: 10px 0 0 10px;
  padding-left: 1rem;
  margin: 0;
  &:hover,
  &:focus {
    border: none;
    outline: none;
  }
  transition: 0.2s ease-in-out;
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  z-index: 1;
  width: 96%;
  position: absolute;
  top: 30px;
  left: 10px;
  z-index: 5;
  background: ${colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const LinkItem = styled.div`
  padding: 0.8rem;
  display: flex;
  gap: 5px;
  align-items: center;
  &:hover {
    background: ${colors.grayWhite};
  }
  white-space: nowrap;
`;

export const TEPriceTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
`;

export const TEPriceText = styled.div<any>`
  display: flex;
  align-items: center;
`;

export const TETokenText = styled.div`
  padding-right: 1rem;
  color: ${colors.grayLight};
`;

export const TELotSizeText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`;
