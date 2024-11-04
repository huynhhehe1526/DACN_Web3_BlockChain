import React, { useState } from 'react';
import '../scss/header.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const redirectMarket = () => {
        navigate("/market")
    }
    const redirectBinance = () => {
        navigate("/binance")
    }

    const redirectWallet = () => {
        navigate("/wallets")
    }
    const redirectExchange = () => {
        navigate("/exchange")
    }
    const redirectLogin = () => {
        navigate("/login")
    }

    return (
        <>
            <div className="header">
                <div className="logo"></div>
                <nav className="menu-container">
                    <ul className="menu">
                        <li className="menu-item">
                            <a onClick={redirectMarket}>Thị trường</a>
                        </li>
                        <li className="menu-item">
                            <a onClick={redirectBinance}>Binance</a>
                        </li>
                        <li className="menu-item">
                            <a onClick={redirectWallet}>Wallets</a>
                        </li>
                        <li className="menu-item">
                            <a onClick={redirectExchange}>Exchange</a>
                        </li>
                        <li className="menu-item">
                            <a href="#">Development</a>
                            <ul className="submenu">
                                <li className="submenu-item">
                                    <a href="#">Resources</a>
                                    <ul className="sub-submenu">
                                        <li><a href="#">Docs</a></li>
                                        <li><a href="#">Templates</a></li>
                                        <li><a href="#">Guides</a></li>
                                        <li><a href="#">Guides</a></li>
                                        <li><a href="#">Guides</a></li>
                                        <li><a href="#">Guides</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Dev Tools</a></li>
                                <li><a href="#">SDKs</a></li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            <a onClick={redirectLogin}>Login</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Header;








