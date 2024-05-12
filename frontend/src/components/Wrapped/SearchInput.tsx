import colors from "../../constants/colors";
import React from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.tertiary};
  border-radius: 10px;
  padding: 0 8px;
`;

const SearchIcon = styled(FiSearch)``;

const MTSearchInput = styled.input`
  border: none;
  background: none;
  height: 100%;
  padding: 8px;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

interface SearchInputProps {
  query?: string;
  onChange?: any;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, onChange }) => {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };
  return (
    <SearchWrapper className="dark:border-1 dark:border-darkerText">
      <SearchIcon className="dark:text-darkerText" />
      <MTSearchInput
        onChange={(e) => handleChange(e)}
        className="dark:text-darkText"
        placeholder="Search"
      />
    </SearchWrapper>
  );
};

export default SearchInput;
