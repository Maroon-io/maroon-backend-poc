import React, { useEffect, useRef, useState } from "react";
import colors from "../../constants/colors";
import ExtraBoldtext from "../../components/Wrapped/ExtraBoldText";
import Badge from "../../components/Wrapped/Badge";
import TimeFrames from "./TimeFrames";
import Skeleton from "react-loading-skeleton";
import {
  BalanceWrapper,
  ChartWrapper,
  HeaderWrapper,
  SkeletonWrapper,
} from "./styles";
import { shallowEqual, useSelector } from "react-redux";
import { ColorType, createChart } from "lightweight-charts";

interface PerformanceChartProps {
  totalBalance: string;
  loading: boolean;
  data: any;
}
const PerformanceChart: React.FC<PerformanceChartProps> = ({
  totalBalance,
  loading,
  data,
}) => {
  const { theme } = useSelector((state: any) => {
    const { theme } = state.webAppReducer;
    return { theme };
  }, shallowEqual);

  const [timeFrame, setTimeFrame] = useState(0);
  const timeFrames = ["1h", "1d", "1m", "3m", "1y"];

  const handleTimeFrameChange = (index: number) => {
    setTimeFrame(index);
  };

  const chartContainerRef = useRef<any>();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: theme === "dark" ? colors.darkSecondary : "white",
        },

        textColor: theme === "dark" ? colors.darkerText : colors.grayLight,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      rightPriceScale: {
        visible: false,
      },
      // xAxisVisible: false,

      grid: {
        vertLines: {
          color: theme === "dark" ? "#4B3A47" : colors.grayWhite,
        },

        horzLines: {
          visible: false,
        },
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: colors.primary,
      topColor: colors.primary,
      bottomColor: colors.secondary,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, loading, theme]);

  console.log({ timeFrame });

  if (loading) {
    return (
      <ChartWrapper className="dark:bg-darkSecondary">
        <div className="hidden" ref={chartContainerRef} />

        <SkeletonWrapper>
          <Skeleton width={"100%"} height={"100%"} />
        </SkeletonWrapper>
      </ChartWrapper>
    );
  }

  return (
    <ChartWrapper className="dark:bg-darkSecondary">
      <HeaderWrapper>
        <div>
          <div className="dark:text-darkText">Performance</div>
          <BalanceWrapper>
            <ExtraBoldtext text={`$${totalBalance}`} />
            <Badge label="+0,7% ($35,335.80)" />
          </BalanceWrapper>
        </div>

        <TimeFrames
          timeFrames={timeFrames}
          active={timeFrame}
          onClick={handleTimeFrameChange}
        />
      </HeaderWrapper>

      <div className="w-full" ref={chartContainerRef} />
    </ChartWrapper>
  );
};

export default PerformanceChart;
