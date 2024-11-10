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
import RegisterPage from './component_page/page/register.jsx'

const router = [
  {
    layout: MainPlayout,
    data:[
      {
        path:'/',
        element: <HomePage />,
        showHeader: true, showFooter: true
      },
      {
        path: "/login",
        element: <LoginPage />,
        showHeader: false, showFooter: false
      },
      {
        path: "/register",
        element: <RegisterPage />,
        showHeader: false, showFooter: false
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/form",
        element: <Formjsonschema />,
        showHeader: true, showFooter: true
      },
      {
        path: "/wallets",
        element: <WalletPage />,
        showHeader: false, showFooter: true
      },
      {
        path: "/connect_wallet",
        element: <ConnectWallet />,
        showHeader: false, showFooter: false
      },
      {
        path: "/market",
        element: <MarketPage />,
        showHeader: true, showFooter: true
      },
      {
        path: "/exchange",
        element: <ExchangePage />,
        showHeader: true, showFooter: true
      },
      {
        path: "/binance",
        element: <BinancePage />,
        showHeader: true, showFooter: true
      }
    ] 
  }
];

export default router;