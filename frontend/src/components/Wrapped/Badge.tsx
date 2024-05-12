import colors from "../../constants/colors";
import React from "react";
import styled from "styled-components";

const BadgeText = styled.div`
  font-size: 14px;
  background: rgba(39, 194, 103, 0.2);
  color: ${colors.success};
  padding: 0 6px;
  border-radius: 5px;
`;

const BadgeTextV2 = styled.div`
  font-size: 8px;
  background: ${colors.primary};
  color: ${colors.white};
  padding: 1px 6px;
  border-radius: 10px;
`;

interface BadgeProps {
  label: string;
  version?: number;
}

const Badge: React.FC<BadgeProps> = ({ label, version }) => {
  if (version !== 2) {
    return <BadgeText>{label}</BadgeText>;
  }
  return <BadgeTextV2>{label}</BadgeTextV2>;
};

export default Badge;
