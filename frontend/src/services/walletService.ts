import axios from "axios";
import http from "./httpService";
import ConstantProvider from "../utils/constantProvider";

const apiEndPoint = process.env.REACT_APP_API_URL;

const headers = {
  Authorization: `Bearer ${localStorage.getItem("MAROON_TOKEN")}`,
};

export async function getWalletBalance() {
  const data = {
    currency: "ALL",
  };
  return http.post(`${apiEndPoint}/api/GetBalance`, data, { headers });
}

export async function generateDepositAddress(userAddress: string) {
  return http.get(
    `${ConstantProvider.BACKEND_URL}/user/find-safe-detail/${userAddress}`
  );
}

export default {
  getWalletBalance,
  generateDepositAddress,
};
