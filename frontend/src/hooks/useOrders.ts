import orderService from "../services/orderService";

export default function useOrders() {
  const getTradeHistory = async () => {
    try {
      // const { data } = await orderService.getOrderHistory();
      // return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getOpenOrders = async (page: number, limit: number, payload: any) => {
    try {
      const { data } = await orderService.getOpenOrders(page, limit, payload);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // getTradeHistory,
    getOpenOrders,
  };
}
