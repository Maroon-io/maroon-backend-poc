import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

import Skeleton from "react-loading-skeleton";
import { ChartWrapper, SkeletonWrapper } from "./styles";

export const ChartComponent: React.FC = (props: any) => {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
    loading,
  } = props;

  const chartContainerRef = useRef<any>();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  if (loading) {
    return (
      <ChartWrapper>
        <SkeletonWrapper>
          <Skeleton width={"100%"} height={"100%"} />
        </SkeletonWrapper>
      </ChartWrapper>
    );
  }

  return <div ref={chartContainerRef} />;
};
