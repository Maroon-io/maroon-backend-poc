import colors from "../../constants/colors";
import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface SmallChartProps {
  data: any;
}

const SmallChart: React.FC<SmallChartProps> = ({ data }) => {
  const firstUV = data[0][1];
  const lastUV = data[data.length - 1][1];
  const change = lastUV - firstUV;

  return (
    <ResponsiveContainer>
      <LineChart width={128} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="1"
          stroke={change > 0 ? colors.success : colors.danger}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SmallChart;
