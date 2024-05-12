import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  theme: "",
  walletAddress: "",
  openNotifications: false,
  loggedIn: false,
  openOrders: null,
  tradeHistory: null,
  selectedPair: "TEST18/TEST8",
  selectedToken: "",
  baseToken: null,
  quoteToken: null,
  walletTokens: null,
  safeAddress: null,
  userTradeHistory: null,
};

export const webAppReducer = createSlice({
  name: "webAppReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setOpenNotifications: (state, action: PayloadAction<boolean>) => {
      state.openNotifications = action.payload;
    },
    setOpenOrders: (state, action: PayloadAction<any>) => {
      state.openOrders = action.payload;
    },
    setTradeHistory: (state, action: PayloadAction<any>) => {
      state.tradeHistory = action.payload;
    },
    setSelectedPair: (state, action: PayloadAction<string>) => {
      state.selectedPair = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    setSelectedToken: (state, action: PayloadAction<any>) => {
      state.selectedToken = action.payload;
    },

    setWalletTokens: (state, action: PayloadAction<any>) => {
      state.walletTokens = action.payload;
    },
    setSafeAddress: (state, action: PayloadAction<any>) => {
      state.safeAddress = action.payload;
    },
    setTradeToken: (state, action: PayloadAction<any>) => {
      state.baseToken = action.payload.baseToken;
      state.quoteToken = action.payload.quoteToken;
    },
    setUserTradeHistory: (state, action: PayloadAction<any>) => {
      state.userTradeHistory = action.payload;
    },
  },
});

export const {
  setTheme,
  setOpenNotifications,
  setOpenOrders,
  setTradeHistory,
  setSelectedPair,
  setLoggedIn,
  setWalletAddress,
  setSelectedToken,
  setWalletTokens,
  setSafeAddress,
  setTradeToken,
  setUserTradeHistory,
} = webAppReducer.actions;

export default webAppReducer.reducer;
