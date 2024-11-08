import React from 'react'
import './style/global.css'
import LoginPage from './component_page/page/login.jsx'
import HomePage from './component_page/page/homepage.jsx'
import ContactPage from './component_page/page/contact.jsx'
import Formjsonschema from './component_page/page/formjsonschema.jsx'
import WalletPage from './component_page/page/wallet.jsx';
import ConnectWallet from './component_page/page/connect.jsx';
import MarketPage from './component_page/page/market.jsx';
import BinancePage from './component_page/page/binance.jsx';
import MainPlayout from './component_page/layout/mainlayout.jsx';
import ExchangePage from './component_page/page/exchange.jsx';

const router = [
  {
    layout: MainPlayout,
    data:[
      {
        path:'/',
        element: <HomePage />
      },
      {
        path: "/login",
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
    ] 
  }
];

export default router;