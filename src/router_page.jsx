import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/global.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './component_page/page/login.jsx'
import HomePage from './component_page/page/homepage.jsx'
import ContactPage from './component_page/page/contact.jsx'
import Formjsonschema from './component_page/page/formjsonschema.jsx'
import WalletPage from './component_page/page/wallet.jsx';
import ConnectWallet from './component_page/page/connect.jsx';
import MarketPage from './component_page/page/market.jsx';
import BinancePage from './component_page/page/binance.jsx';
import ExchangePage from './component_page/page/exchange.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // element: <div>Hello world!</div>,

    children: [
      {
        index: true,
        element: <HomePage />
      },

    ]
  },
  {
    path: "homepage",
    element: <HomePage />
  },
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "contact",
    element: <ContactPage />
  },
  {
    path: "form",
    element: <Formjsonschema />
  },
  {
    path: "wallets",
    element: <WalletPage />
  },
  {
    path: "connect_wallet",
    element: <ConnectWallet />
  },
  {
    path: "market",
    element: <MarketPage />
  },
  {
    path: "exchange",
    element: <ExchangePage />
  },
  {
    path: "binance",
    element: <BinancePage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
