import http from "./httpService";

const apiEndPoint = process.env.REACT_APP_API_URL;

const headers = {
  Authorization: `Bearer ${localStorage.getItem("MAROON_TOKEN")}`,
};

export async function getChartData(
  baseCurrency: string,
  quoteCurrency: string
) {
  return http.get(
    `${apiEndPoint}/market/get-chart-data?baseCurrency=${baseCurrency}&quoteCurrency=${quoteCurrency}&interval=60&limit=200&timestamp=1698843459000`,
    { headers }
  );
}

export async function getTradeHistory() {
  return http.get(
    `${process.env.REACT_APP_BACKEND_URL}/orders/order-book-history`
  );
}

export async function getUserTradeHistory(userId: string) {
  return http.get(
    `${process.env.REACT_APP_BACKEND_URL}/orders/user-order-history/${userId}`
  );
}

export default {
  getChartData,
  getTradeHistory,
  getUserTradeHistory,
};
