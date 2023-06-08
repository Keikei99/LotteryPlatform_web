import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { configureChains, mainnet, WagmiConfig, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
//改了这里
import { goerli } from '@wagmi/chains';

const { provider, webSocketProvider } = configureChains(
  //改了这里
  [mainnet, goerli],
  [publicProvider()],
);
 
const client = createClient({
   autoConnect: true,
   provider,
   webSocketProvider,
});

// root page
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig client={client}>
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
  </WagmiConfig>
);
