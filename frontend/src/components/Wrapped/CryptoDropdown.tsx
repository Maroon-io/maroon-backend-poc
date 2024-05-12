import React, { useState, useEffect, useRef } from "react";
import colors from "../../constants/colors";
import styled from "styled-components";
import Icon from "./Icon";
import { CryptoIcon } from "../../components/CryptoIcon";

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: bold;
  color: ${colors.dark};
  padding: 1rem;
  cursor: pointer;
  height: 100%;
  &:hover,
  &:focus {
    border: 2px solid ${colors.primary};
  }
  transition: 0.2s ease-in-out;
  border-start-start-radius: 10px;
  border-end-start-radius: 10px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  z-index: 1;
  position: absolute;
  top: 30px;
  left: 10px;
  width: 9.5rem;
  overflow: hidden;
  background: ${colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const LinkItem = styled.div`
  padding: 0.8rem;
  display: flex;
  gap: 5px;
  align-items: center;
  &:hover {
    background: ${colors.grayLight};
    // color: ${colors.gray};
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 6.5rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface CryptoDropdownProps {
  label: string;
  children: any;
  onSelect: any;
  large?: boolean;
}

const CryptoDropdown: React.FC<CryptoDropdownProps> = ({
  label,
  children,
  onSelect,
  large,
}) => {
  const [toggle, setToggle] = useState(false);
  const wrapperRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MenuWrapper ref={wrapperRef} onClick={() => setToggle(!toggle)}>
      <LabelWrapper>
        <IconWrapper>
          <CryptoIcon currency={label.toLowerCase()} /> {label}
        </IconWrapper>
        <Icon name={"down"} />
      </LabelWrapper>
      {toggle && (
        <LinkWrapper>
          {children.map((item: any, index: number) => (
            <LinkItem key={index} onClick={() => onSelect(item)}>
              {item && <CryptoIcon currency={item.toLowerCase()} />}
              {item}
            </LinkItem>
          ))}
        </LinkWrapper>
      )}
    </MenuWrapper>
  );
};

export default CryptoDropdown;
