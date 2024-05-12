import http from "./httpService";

const apiEndPoint = process.env.REACT_APP_API_URL;

const headers = {
  Authorization: `Bearer ${localStorage.getItem("MAROON_TOKEN")}`,
};

export async function getOrderHistory(userId: string) {
  // return http.get(`${apiEndPoint}/api/OrderHistoryExtended?side=ALL&pair=ALL`, {
  //   headers,
  // });

  return http.get(
    `${process.env.REACT_APP_BACKEND_URL}/orders/user-order-history/${userId}`
  );
}

export async function getOpenOrders(page: number, limit: number, data: any) {
  return http.post(
    `${apiEndPoint}/order/v2/my-order-history?page=${page}&limit=${limit}`,
    data,
    { headers }
  );
}

export default {
  getOrderHistory,
  getOpenOrders,
};
