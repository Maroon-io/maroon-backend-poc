import CustomTab from "../../components/Wrapped/CustomTab";
import React from "react";

interface TradeInfoProps {
  data: any;
  loading: boolean;
}

const TradeInfo: React.FC<TradeInfoProps> = ({ data, loading }) => {
  return (
    <div>
      <CustomTab
        tableLoading={loading}
        trade
        listArr={data}
        labelList={["Open Orders", "Trade History"]}
      />
    </div>
  );
};

export default TradeInfo;
