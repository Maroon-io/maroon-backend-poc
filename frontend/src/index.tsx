import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "animate.css";
// import "@rainbow-me/rainbowkit/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { WagmiProvider } from "wagmi";

// import {
//   arbitrum,
//   base,
//   mainnet,
//   optimism,
//   polygon,
//   sepolia,
// } from "wagmi/chains";

import { Dashboard } from "./pages/Dashboard";
import { Wallet } from "./pages/Wallet";
import { Trade } from "./pages/Trade";
import { Markets } from "./pages/Markets";
import { Recovery } from "./pages/Recovery";
import { Notifications } from "./pages/Notifications";
import { Settings } from "./pages/Settings";
import { config } from "./connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },

  {
    path: "/wallet",
    element: <Wallet />,
  },

  {
    path: "/trade",
    element: <Trade />,
  },

  {
    path: "/markets",
    element: <Markets />,
  },

  {
    path: "/recovery",
    element: <Recovery />,
  },

  {
    path: "/settings",
    element: <Settings />,
  },

  {
    path: "/notifications",
    element: <Notifications />,
  },
]);

// const queryClient = new QueryClient();

// const config = getDefaultConfig({
//   appName: "RainbowKit demo",
//   projectId: "YOUR_PROJECT_ID",
//   chains: [
//     mainnet,
//     polygon,
//     optimism,
//     arbitrum,
//     base,
//     ...(process.env.REACT_APP_ENABLE_TESTNETS === "true" ? [sepolia] : []),
//   ],
// });

const rootElement = document.getElementById("root")!;

const queryClient = new QueryClient() 


createRoot(rootElement).render(
  <WagmiProvider config={config}> 
    <QueryClientProvider client={queryClient}> 
      <Provider store={store}>
        <Toaster
          containerStyle={{
            top: 0,
            left: 20,
            bottom: 20,
            right: 20,
            marginTop: "1rem",
          }}
          position="top-right"
          reverseOrder={false}
        />
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </WagmiProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
