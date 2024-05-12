import React, { useState, useEffect, useRef } from "react";
import colors from "../../constants/colors";
import styled from "styled-components";
import Icon from "./Icon";
import { RxCaretDown } from "react-icons/rx";
import Badge from "./Badge";
import { BiLogOut } from "react-icons/bi";
import { useDisconnect } from "wagmi";
import { setLoggedIn } from "../../redux/reducers";
import { useDispatch } from "react-redux";
import CustomToast from "./CustomToast";

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  border: 1px solid ${colors.tertiary};
  color: ${colors.dark};
  padding: 0.8rem;
  cursor: pointer;
  height: 1.75rem;

  &:focus {
    border: 2px solid ${colors.primary};
  }
  transition: 0.2s ease-in-out;
`;

const MenuLargeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  border: 1px solid ${colors.tertiary};
  color: ${colors.dark};
  padding: 1rem;
  cursor: pointer;
  height: 4.1rem;
  &:hover,
  &:focus {
    border: 2px solid ${colors.primary};
  }
  transition: 0.2s ease-in-out;
`;

const MenuBorderlessWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  position: relative;
  border-radius: 10px;
  color: ${colors.gray};
  padding: 0.5rem;
  cursor: pointer;
  height: 1.75rem;
  transition: 0.2s ease-in-out;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  z-index: 1;
  position: absolute;
  top: 30px;
  left: 10px;
  z-index: 5;
  background: ${colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const LinkLargeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  z-index: 1;
  position: absolute;
  top: 50px;
  left: 0px;
  overflow: hidden;
  width: 100%;
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
  white-space: nowrap;
`;

const LabelWrapper = styled.div<{ value: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ value }) => (value ? "1px" : "5px")};
`;

const LabelWrapperMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaddf8;
  gap: 5px;
  padding: 4px 1rem;
  border-radius: 10px;
`;

const LabelLargeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
`;

const Circle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: linear-gradient(to left, #1e0c1b, #9457dc);
`;

interface DropdownProps {
  label: string;
  children: any;
  onSelect: (label: string) => void;
  large?: boolean;
  borderless?: boolean;
  menu?: boolean;
  darker?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  children,
  onSelect,
  large,
  borderless,
  menu,
  darker,
}) => {
  const [toggle, setToggle] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { disconnect } = useDisconnect()

  const dispatch = useDispatch();

  const handleLogout = async () => {
    disconnect();
    dispatch(setLoggedIn(false));
    CustomToast("Account Disconnected", "success");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node | null)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (menu) {
    return (
      <MenuBorderlessWrapper
        ref={wrapperRef}
        onClick={() => setToggle(!toggle)}
      >
        <LabelWrapperMenu className="dark:bg-gradient-to-tr dark:from-dark dark:to-[#4e3b60] dark:text-darkText">
          <Circle />
          {label} <RxCaretDown />
        </LabelWrapperMenu>
        {toggle && (
          <LinkWrapper className="dark:bg-gradient-to-bl dark:from-dark dark:to-[#72568D] rounded-[10px] overflow-hidden">
            {children.map((item: any, index: number) => (
              <LinkItem
                className="dark:text-[#BDBDBD] dark:hover:text-white dark:hover:bg-[#72568D]"
                key={index}
                onClick={() => onSelect(item.label)}
              >
                {item.icon && <Icon name={item.icon} />}
                {item.label}
              </LinkItem>
            ))}
            <LinkItem
              onClick={handleLogout}
              className="dark:text-[#BDBDBD] dark:hover:text-white dark:hover:bg-[#72568D]"
            >
              <BiLogOut className="w-4 h-4 dark:text-white" />
              Logout
            </LinkItem>
          </LinkWrapper>
        )}
      </MenuBorderlessWrapper>
    );
  }

  if (borderless) {
    return (
      <MenuBorderlessWrapper
        ref={wrapperRef}
        onClick={() => setToggle(!toggle)}
      >
        <LabelWrapper
          className="dark:text-[#BDBDBD] dark:hover:text-white hover:text-dark"
          value={borderless}
        >
          {label}{" "}
          <RxCaretDown className="dark:text-[#BDBDBD] dark:hover:text-white hover:text-dark" />
        </LabelWrapper>
        {toggle && (
          <LinkWrapper className="dark:bg-gradient-to-bl dark:from-dark dark:to-[#72568D] rounded-[10px] overflow-hidden">
            {children.map((item: any, index: number) => (
              <LinkItem
                className="dark:text-[#BDBDBD] dark:hover:text-white dark:hover:bg-[#72568D]"
                key={index}
                onClick={() => onSelect(item.label)}
              >
                {item.icon && <Icon name={item.icon} />}
                {item.label}
                {item.badge && <Badge version={2} label={item.badge} />}
              </LinkItem>
            ))}
          </LinkWrapper>
        )}
      </MenuBorderlessWrapper>
    );
  }

  if (large) {
    return (
      <MenuLargeWrapper ref={wrapperRef} onClick={() => setToggle(!toggle)}>
        <LabelLargeWrapper className="dark:text-darkerText dark:hover:text-white">
          {label} <Icon name={"down"} />
        </LabelLargeWrapper>
        {toggle && (
          <LinkLargeWrapper className="dark:bg-gradient-to-bl dark:from-dark dark:to-[#72568D] rounded-[10px] overflow-hidden">
            {children.map((item: any, index: number) => (
              <LinkItem
                className="dark:text-[#BDBDBD] dark:hover:text-white dark:hover:bg-[#72568D]"
                key={index}
                onClick={() => onSelect(item.label)}
              >
                {item.icon && <Icon name={item.icon} />}
                {item.label}
              </LinkItem>
            ))}
          </LinkLargeWrapper>
        )}
      </MenuLargeWrapper>
    );
  }

  return (
    <MenuWrapper
      className={` ${
        darker
          ? "dark:border-darkSecondary dark:bg-darkSecondary"
          : "dark:border-darkBg dark:bg-darkBg"
      } `}
      ref={wrapperRef}
      onClick={() => setToggle(!toggle)}
    >
      <LabelWrapper
        value={false}
        className="dark:text-[#BDBDBD] dark:hover:text-white text-dark"
      >
        {label} <RxCaretDown />
      </LabelWrapper>

      {toggle && (
        <LinkWrapper className="dark:bg-gradient-to-bl dark:from-dark dark:to-[#72568D] rounded-[10px] overflow-hidden">
          {children.map((item: any, index: number) => (
            <LinkItem
              className="dark:text-[#BDBDBD] dark:hover:text-white dark:hover:bg-[#72568D]"
              key={index}
              onClick={() => onSelect(item.label)}
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

export default Dropdown;
