import React, { useState, useEffect, useRef } from "react";
import colors from "../../constants/colors";
import styled from "styled-components";
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import Icon from "./Icon";

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  color: ${colors.dark};
  cursor: pointer;
  transition: 0.3s ease-in-out;
  height: 20px;
  width: 20px;

  // &:hover,
  // &:focus {
  //   background: ${colors.grayWhite};
  // }
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  z-index: 10;
  position: absolute;
  bottom: 30px;
  right: 10px;
  width: 9.5rem;
  background: ${colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const LinkItem = styled.div`
  padding: 0.8rem;
  display: flex;
  gap: 5px;
  align-items: center;
  &:hover {
    background: ${colors.grayWhite};
  }
`;

const DotWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TableDropdownProps {
  label?: string;
  children?: any;
  vertical?: boolean;
}
const TableDropdown: React.FC<TableDropdownProps> = ({
  label,
  children,
  vertical,
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
      <DotWrapper className="dark:text-darkText dark:hover:text-dark hover:bg-grayWhite  hover:dark:bg-darkerText rounded-[5px] p-1 transition ease-in-out hover:scale-105 delay-100 duration-200">
        {vertical ? (
          <HiOutlineDotsVertical className="cursor-pointer w-4 h-4 active:text-primary hover:text-darkText" />
        ) : (
          <HiOutlineDotsHorizontal />
        )}
      </DotWrapper>
      {toggle && (
        <LinkWrapper className="dark:bg-gradient-to-bl dark:from-darkBg dark:to-darkerBg rounded-[10px] overflow-hidden">
          {children.map((item: any, index: string) => (
            <LinkItem
              className="dark:text-[#BDBDBD] dark:hover:text-white dark:hover:bg-[#72568D]"
              key={index}
            >
              {item.icon && <Icon name={item.icon} />}
              {item.label}
            </LinkItem>
          ))}
        </LinkWrapper>
      )}
    </MenuWrapper>
  );
};

export default TableDropdown;
