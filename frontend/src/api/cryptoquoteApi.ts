import axios from "axios";
const moralisApiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjU1Y2Q5YTA3LWFiZjMtNDg4Yy1hOTcwLTMwNmQzMjY1ZTFkMyIsIm9yZ0lkIjoiMzc4MDU3IiwidXNlcklkIjoiMzg4NTA0IiwidHlwZUlkIjoiM2VkMGM1OGUtMmVjOS00NjVhLTkxODItZDgwZWU3YjBhZjRiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDg0MjAxNTYsImV4cCI6NDg2NDE4MDE1Nn0.OSS5H78Oz8j7X4jyXal1i0hjqschWxhLIGeZHiI_5Zc";

const coingeckoApiKey = "CG-UjN5nVZK3nsNxG4sfvnC8fh7";
const coingeckoApiKey2 = "CG-trk1zueY9Ub17CQAV9BXFaiV";
const coingeckoApiKey3 = "CG-opeCkVVJeUeVMnDCdPgHWto3	";

export const getTopGainers = async () => {
  try {
    const response = await axios.get(
      "https://www.cryptoquote.io/analytics/v1/?api=movers&exchange=crypto&base_symbol=USD&view=gainers&key=0b5081ca-a92f-4770-bf33-a7645b5e5ba2"
    );
    if (response.data) {
      console.log({ response });
      return response.data.results;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMarkets = async (limit: number) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h&locale=en&precision=4x_cg_demo_api_key=${coingeckoApiKey}`
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrending = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending"
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getWalletTransactionData = async () => {
  const options = {
    headers: {
      "X-API-KEY": moralisApiKey,
    },
  };

  const result = await axios.get(
    "https://deep-index.moralis.io/api/v2.2/wallets/0x3C0fbf3832AA9297B299F2a1F0456674EdCD745b/chains",
    options
  );

  return result.data;
};

export const getMarketData = async (tokenName: string) => {
  const result = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${tokenName}/market_chart?vs_currency=usd&days=60&x_cg_demo_api_key=${coingeckoApiKey2}`
  );

  return result.data;
};

export const getOHLC = async (tokenName: string) => {
  const result = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${tokenName}/ohlc?vs_currency=usd&days=1&x_cg_demo_api_key=${coingeckoApiKey2}`
  );

  return result.data;
};

export const getCurrentTokenData = async (token: string) => {
  const result = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${token}?4x_cg_demo_api_key=${coingeckoApiKey2}`
  );
  return result.data;
};

export const getMultipleMarketData = async (params: any) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      x_cg_demo_api_key: coingeckoApiKey3,
    },
  };

  const result = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets`,
    {
      params: params,
      ...options,
    }
  );

  return result.data;
};

export const getTokenPriceChange = async (token: string) => {
  // can add more tokens separated by comma. see coingecko api doc
  const result = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd&include_24hr_change=true&x_cg_demo_api_key=${coingeckoApiKey3}`
  );
  return result.data;
};
