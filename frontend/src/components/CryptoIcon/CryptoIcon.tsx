import React from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";
import { Image } from "grommet";

interface CryptoIconProps {
  iconType?: string;
  currency: any;
  className?: any;
  margin?: any;
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ currency }) => {
  return (
    <div className="w-6 h-6">
      <img
        src={`./assets/cryptocurrency-icons/color/${currency}.svg`}
        alt={currency}
      />
    </div>
  );
};

export default CryptoIcon;
