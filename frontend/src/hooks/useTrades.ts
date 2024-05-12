import tradeService from "../services/tradeService";

export default function useTrades() {
  const getChartData = async (baseCurrency: string, quoteCurrency: string) => {
    try {
      const { data } = await tradeService.getChartData(
        baseCurrency,
        quoteCurrency
      );

      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getTradeHistory = async () => {
    try {
      const { data } = await tradeService.getTradeHistory();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserTradeHistory = async (userId: string) => {
    try {
      const { data } = await tradeService.getUserTradeHistory(userId);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getChartData, getTradeHistory, getUserTradeHistory };
}
