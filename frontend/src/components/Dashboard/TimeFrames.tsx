import { BtnOutline } from "../../components/Wrapped";
import React from "react";
import styled from "styled-components";

const TimeWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

interface TimeFramesProps {
  timeFrames: any;
  onClick: any;
  active: any;
}

const TimeFrames: React.FC<TimeFramesProps> = ({
  timeFrames,
  onClick,
  active,
}) => {
  const handleClick = (item: any) => {
    onClick(item);
  };

  return (
    <TimeWrapper>
      {timeFrames.map((item: any, index: number) => (
        <BtnOutline
          active={active === item}
          onClick={() => handleClick(item)}
          key={index}
          light
          borderless
          label={item}
        />
      ))}
    </TimeWrapper>
  );
};

export default TimeFrames;
