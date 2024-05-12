import walletService from "../services/walletService";

export default function useWallet() {
  const getWalletBalance = async () => {
    try {
      const { data } = await walletService.getWalletBalance();

      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const generateDepositAddress = async (userAddress: string) => {
    try {
      const { data } = await walletService.generateDepositAddress(userAddress);
      console.log({data, userAddress })

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getWalletBalance, generateDepositAddress };
}
