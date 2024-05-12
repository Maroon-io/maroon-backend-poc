import colors from "../../constants/colors";
import styled from "styled-components";

export const TabWrapper = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 14px;
`;

export const StyledTabs = styled.div<any>`
  background: #dfdfdf;
  display: flex;
  border-radius: 0.5rem;
  width: min-content;
  padding: 0 1px;
`;

export const StyledTab = styled.div<any>`
  margin: 4px 2px;
  padding: 3px 10px;
  border-radius: 5px;
  color: ${(props) => (props.active ? "black" : "gray")};
  cursor: pointer;
  text-decoration: none; /* Remove text decoration */
  background: ${(props) => (props.active ? "white" : "transparent")};
  white-space: nowrap;

  &:focus {
    color: black;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  transition: 0.2s ease-in-out;
`;

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TableCell = styled.td`
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  color: ${colors.dark};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
`;

export const TableHeaderCell = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: ${colors.grayLight};
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 0.6rem;
`;

export const CustomListWrapper = styled.div<any>`
  display: flex;
  overflow-x: auto;

  justify-content: space-between;
  padding: ${({ value }) => (value === "deposit" ? "0.8rem 1rem" : "0.8rem 0")};
  align-items: center;
  cursor: pointer;
  border-bottom: ${({ value }) =>
    value === "deposit" ? "" : "1px solid #dfdfdf"};

  &:hover {
    background: ${({ value }) => (value === "deposit" ? "#AEAEB2" : "")};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

export const StatusText = styled.div`
  font-size: 14px;
  color: #1e0c1b;
`;

export const PriceText = styled.div`
  font-size: 14px;
  color: ${colors.gray};
`;

export const ChangeText = styled.div<any>`
  font-size: 14px;
  color: ${({ value }) =>
    value > 0 ? colors.success : value < 0 ? colors.danger : colors.gray};
`;

export const AmountText = styled.div`
  font-size: 14px;
  color: #1e0c1b;
`;

export const ChangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ChangeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const ChartWrapper = styled.div`
  width: 128px;
  height: 50px;
`;

export const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-end;
`;

export const BalanceText = styled.div`
  color: ${colors.dark};
  font-size: 16px;
  font-weight: bold;
`;

export const TotalText = styled.div`
  color: ${colors.gray};
  font-size: 14px;
`;

export const CryptoImg = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

export const TableBodyCell = styled.td`
  padding: 8px;
  text-align: left;
  font-weight: bold;
`;

export const SideCell = styled.td<any>`
  padding: 8px;
  text-align: left;
  font-weight: bold;
  color: ${({ value }) =>
    value.toLowerCase() === "buy" ? colors.success : colors.danger};
`;

export const SideCellItem = styled.div<any>`
  padding: 0px 8px;
  text-align: center;
  color: ${colors.white};
  border-radius: 10px;
  font-weight: bold;
  background: ${({ value }) =>
    value.toLowerCase() === "open" ? colors.success : colors.danger};
`;

export const TDate = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 6rem;
`;

export const TableBody = styled.tbody``;
