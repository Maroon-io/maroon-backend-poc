export const shortenAddress = (hexString, offset) => {
  if (!hexString) return "";
  const prefix = hexString.slice(0, offset);
  const suffix = hexString.slice(-offset);
  return `${prefix}...${suffix}`;
};

export const generateRandomTransaction = () => {
  const statuses = ["Received", "Sent"];
  const dates = ["Oct 9", "Oct 10", "Oct 11", "Oct 12", "Oct 13"];
  const symbols = ["USDT", "USDC", "ETH", "BTC", "XRP"];

  const amount = `${(Math.random() * 10).toFixed(2)}`;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const date = dates[Math.floor(Math.random() * dates.length)];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];

  return { amount, status, date, symbol };
};

export const generateChartData = (numEntries) => {
  const data = [];
  for (let i = 0; i < numEntries; i++) {
    data.push({
      name: `Page ${String.fromCharCode(65 + i)}`,
      uv: Math.floor(Math.random() * 1000),
      pv: Math.floor(Math.random() * 5000),
      amt: Math.floor(Math.random() * 5000),
    });
  }
  return data;
};

export const generateRandomWatchlist = () => {
  const symbols = [
    "USDT",
    "USDC",
    "ETH",
    "BTC",
    "XRP",
    "MONI",
    "NHCT",
    "AAVE",
    "LINK",
    "MATIC",
    "DOT",
    "SOL",
    "ADA",
    "AVAX",
    "XTZ",
  ];

  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const value = Math.random().toFixed(4);
  const change = (Math.random() * 2 - 1).toFixed(1);
  const chartData = generateChartData(30);

  return { value, change, symbol, chartData };
};

export const generateDepositData = (numEntries) => {
  const data = [];
  const assets = [
    "USDT",
    "USDC",
    "ETH",
    "BTC",
    "XRP",
    "MONI",
    "NHCT",
    "AAVE",
    "LINK",
    "MATIC",
    "DOT",
    "SOL",
    "ADA",
    "AVAX",
    "XTZ",
  ];
  for (let i = 0; i < numEntries; i++) {
    const asset = assets[Math.floor(Math.random() * assets.length)];
    const balance = Math.floor(Math.random() * 100);
    const usdBalance = balance * (Math.random() * 100);
    data.push({ asset, balance, usdBalance });
  }
  return data;
};

export const getChange = (openPrice, closePrice) => {
  const change = closePrice - openPrice;
  return change.toFixed(4);
};

export const getPercentageChange = (openPrice, closePrice) => {
  const change = closePrice - openPrice;
  const percentageChange = (change / openPrice) * 100;
  return percentageChange.toFixed(2);
};

const addSeperator = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const addCommasToNumber = (x) => {
  const num = x.toString();
  const numIndex = num.indexOf(".");

  if (numIndex !== -1) {
    const numBeforeDecimals = addSeperator(num.substring(0, numIndex));
    const numAfterDecimals = num.substring(numIndex);

    return numBeforeDecimals + numAfterDecimals;
  }

  return addSeperator(x);
};

export const getTotalBalance = (balances) => {
  let total = 0;
  for (let item of balances) {
    total += item.value;
  }
  return addCommasToNumber(total.toFixed(2));
};

export const generateTableData = (numRows) => {
  const data = [];
  const types = ["Test Input", "Test Type", "Another Type"];
  const sides = ["Buy", "Sell"];
  const actions = ["Open", "Closed"];

  for (let i = 0; i < numRows; i++) {
    const date = `18-06-2017`;
    const pair = `ETH/USDT`;
    const type = types[Math.floor(Math.random() * types.length)];
    const side = sides[Math.floor(Math.random() * sides.length)];
    const price = (Math.random() * 5000 + 2000).toFixed(2);
    const stopPrice = `Test Input`;
    const pending = `Test Input`;
    const total = `Test Input`;
    const action = actions[Math.floor(Math.random() * actions.length)];
    const time = `${Math.floor(Math.random() * 24)}:${Math.floor(
      Math.random() * 60
    )}:${Math.floor(Math.random() * 60)}`;

    data.push({
      date,
      pair,
      type,
      side,
      price,
      stopPrice,
      pending,
      total,
      action,
      time,
    });
  }

  return data;
};
export const generateOrderData = (numEntries) => {
  const data = [];
  const assets = ["USDT", "USDC", "BNB", "BTC"];

  for (let i = 0; i < numEntries; i++) {
    const price = (Math.random() * 100000).toFixed(2); // Generating random price
    const size = (Math.random() * 0.1).toFixed(5); // Generating random size
    const total = (price * size).toFixed(3); // Calculating total based on generated price and size
    const randomIndex = Math.floor(Math.random() * assets.length);
    const currentAsset = assets[randomIndex];
    data.push({ asset: currentAsset, price, size, total });
  }

  return data;
};

export const formatNumber = (num) => {
  if (Math.abs(num) < 999) return num;
  if (Math.abs(num) < 999999) return (num / 1000).toFixed(1) + "K";
  if (Math.abs(num) < 999999999) return (num / 1000000).toFixed(1) + "M";
  return (num / 1000000000).toFixed(1) + "B";
};

export const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

export const convertDateFormat = (inputDate) => {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${hours}-${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

export const shortenWalletAddress = (walletAddress, length = 4) => {
  const start = walletAddress.slice(0, length + 2);
  const end = walletAddress.slice(-length);
  return `${start}...${end}`;
};
