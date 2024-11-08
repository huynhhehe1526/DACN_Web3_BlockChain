import React, { useState } from 'react';
import '../scss/header.scss';
import { useNavigate } from 'react-router-dom';
import logo_VietNam from '../../assets/image/logo_VietNam.png';
import logo_nuocAnh from '../../assets/image/logo_nuocAnh.png';
import { useTranslation } from '../../lang/LanguageProvider';

const Header = () => {
    const navigate = useNavigate();
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);
    const { i18n, switchLanguage } = useTranslation();

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

    const handleChangeLanguage = () => {
        setShowLanguageOptions(true); 
      };
    
      const handleLanguageSelect = locale => {
        switchLanguage(locale);
        setShowLanguageOptions(false);
      };

    return (
        <>
            <div className="header">
                <div className="logo"></div>
                <nav className="menu-container">
                    <ul className="menu">
                        <li className="menu-item">
                        <a onClick={redirectMarket}>{i18n.t('header.market')}</a>
                        </li>
                        <li className="menu-item">
                            <a onClick={redirectBinance}>{i18n.t('header.binance')}</a>
                        </li>
                        <li className="menu-item">
                            <a onClick={redirectWallet}>{i18n.t('header.wallet')}</a>
                        </li>
                        <li className="menu-item">
                            <a onClick={redirectExchange}>{i18n.t('header.exchange')}</a>
                        </li>
                        <li className="menu-item">
                            <a href="#">{i18n.t('header.language')}</a>
                            <ul className="submenu">
                                <li className="submenu-item">
                                    <img className='logo-nation' src={logo_VietNam} alt='Việt Nam'/>
                                    <a onClick={() => handleLanguageSelect('vi')}>Tiếng Việt</a>
                                    {/* <ul className="sub-submenu">
                                        <li><a href="#">Docs</a></li>
                                    </ul> */}
                                </li>
                                <li className="submenu-item">
                                    <img className='logo-nation' src={logo_nuocAnh} alt='Anh'/>
                                    <a onClick={() => handleLanguageSelect('en')}>Tiếng Anh</a>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            <a onClick={redirectLogin}>{i18n.t('header.login')}</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Header;

