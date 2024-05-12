import colors from "../../constants/colors";
import React from "react";
import { HiOutlineBell } from "react-icons/hi2";
import styled from "styled-components";

const NotifierWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

const NotifyIcon = styled(HiOutlineBell)`
  width: 18px;
  height: 18px;
`;

const NotifyDot = styled.div`
  width: 5px;
  height: 5px;
  background: ${colors.primary};
  border-radius: 50%;
  position: absolute;
  top: 1px;
  right: 3px;
`;

interface NotifierProps {
  onClick: any;
}

const Notifier: React.FC<NotifierProps> = ({ onClick }) => {
  return (
    <NotifierWrapper onClick={onClick}>
      <NotifyIcon className="dark:text-darkText hover:scale-105" />
      <NotifyDot className="hover:scale-105" />
    </NotifierWrapper>
  );
};

export default Notifier;
