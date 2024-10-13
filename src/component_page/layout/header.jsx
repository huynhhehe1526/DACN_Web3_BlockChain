import React, { useState } from 'react';
import './header.scss';

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="logo"></div>
                <nav className="menu-container">
                    <ul className="menu">
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
                            <a href="#">Development</a>
                        </li>
                        <li className="menu-item">
                            <a href="#">Development</a>
                        </li>
                        <li className="menu-item">
                            <a href="#">Development</a>
                        </li>
                        <li className="menu-item">
                            <a href="#">Development</a>
                        </li>
                        <li className="menu-item">
                            <a href="#">Login</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Header;








