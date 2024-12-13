import React from 'react';
import { useNavigate } from 'react-router-dom';
import aws from '../../assets/image/aws.png';
import paradigm from '../../assets/image/paradigm.png';
import shopify from '../../assets/image/shopify.png';
import ztx from '../../assets/image/ztx.png';
import { useTranslation } from '../../lang/LanguageProvider';
import '../scss/homepage.scss';

const HomePage = () => {
    const {i18n}  =useTranslation();
    const navigate = useNavigate();
    const redirectWallet = () => {
        navigate("/wallets")
    }
    const redirectConnectWallet = () => {
        navigate("/wallets")
    }
    return (
        <>
            <section className="hero-section">
                <h1 style={{ color: "white" }}>{i18n.t('homepage.title')},
                    <span className='animation-opensource'>
                        react, open-source, web3, blockchain
                    </span>!
                </h1>
                <p>{i18n.t('homepage.description')}</p>
                <button className='btn-wallet'
                    onClick={redirectWallet}
                >
                    {i18n.t('button.wallet')}
                </button>
                <button className='btn-connect-wallet'
                    onClick={redirectConnectWallet}
                >{i18n.t('button.connectWallet')}&nbsp;&nbsp;
                    <span
                        className="chakra-button__icon css-1hzyiq5">
                        <svg stroke="currentColor" fill="none" strokeWidth="2"
                            viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" focusable="false"
                            className="chakra-icon css-13otjrl" aria-hidden="true" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </span>
                </button>
            </section>

            <section className="logo-marquee">
                <div className="logo-track">
                    <img src={shopify} alt="shopify" />
                    <img src={aws} alt="aws" />
                    <img src={paradigm} alt="paradigm" />
                    <img src={ztx} alt="ztx" />
                    <img src={shopify} alt="shopify" />
                    <img src={aws} alt="aws" />
                    <img src={paradigm} alt="paradigm" />
                    <img src={ztx} alt="ztx" />
                    <img src={shopify} alt="shopify" />
                    <img src={aws} alt="aws" />
                    <img src={paradigm} alt="paradigm" />
                    <img src={ztx} alt="ztx" />

                </div>
                <div className="logo-track-reverse">
                    <img src={shopify} alt="shopify" />
                    <img src={aws} alt="aws" />
                    <img src={paradigm} alt="paradigm" />
                    <img src={ztx} alt="ztx" />
                    <img src={shopify} alt="shopify" />
                    <img src={aws} alt="aws" />
                    <img src={paradigm} alt="paradigm" />
                    <img src={ztx} alt="ztx" />
                    <img src={shopify} alt="shopify" />
                    <img src={aws} alt="aws" />
                    <img src={paradigm} alt="paradigm" />
                    <img src={ztx} alt="ztx" />
                </div>
            </section>

            <section className="solutions-section">
                <h2>{i18n.t('homepage.titleDetribute')}</h2>
                <div className="css-1wg1opb">
                    <div className="chakra-linkbox css-uth939">
                        <img alt="" src="D:\download\Đồ Án Tốt Nghiệp\DACN_Web3_BlockChain\reactjs\src\assets\image\Quân.jpg"
                            className="chakra-image css-4zb3ge" />
                        <div className="css-ygyttu">
                            <div className="css-0">
                                <h3 className="chakra-heading css-9660jd">
                                    <a href="#"
                                        className="chakra-linkbox__overlay chakra-link css-14dorxq" rel="noopener"
                                        target="_blank">Quân</a>
                                </h3>
                                <p className="chakra-text css-1vhu1yz">Web3 may well rely on technologies that are not related to
                                    blockchain or cryptocurrency. For example, technologies such as augmented reality (AR),
                                    virtual reality (VR), the internet of things (IoT), and the metaverse may become essential
                                    to the new era of the internet as well.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="chakra-linkbox css-5or9b3">
                        <img alt="" src="D:\download\Đồ Án Tốt Nghiệp\DACN_Web3_BlockChain\reactjs\src\assets\image\Huỳnh.jpg"
                            className="chakra-image css-4zb3ge" />
                        <div className="css-ygyttu">
                            <div className="css-0">
                                <h3 className="chakra-heading css-n5fnr2"><a href="#"
                                    className="chakra-linkbox__overlay chakra-link css-14dorxq" rel="noopener"
                                    target="_blank">Huỳnh</a></h3>
                                <p className="chakra-text css-1vhu1yz">Web3 may well rely on technologies that are not related to
                                    blockchain or cryptocurrency. For example, technologies such as augmented reality (AR),
                                    virtual reality (VR), the internet of things (IoT), and the metaverse may become essential
                                    to the new era of the internet as well.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="chakra-linkbox css-5or9b3">
                        <img alt=""
                            src="D:\download\Đồ Án Tốt Nghiệp\DACN_Web3_BlockChain\reactjs\src\assets\image\Quảng.jpg"
                            className="chakra-image css-4zb3ge" />
                        <div className="css-ygyttu">
                            <div className="css-0">
                                <h3 className="chakra-heading css-n5fnr2">
                                    <a href="#"
                                        className="chakra-linkbox__overlay chakra-link css-14dorxq" rel="noopener"
                                        target="_blank">Quảng</a>
                                </h3>
                                <p className="chakra-text css-1vhu1yz">Web3 may well rely on technologies that are not related to
                                    blockchain or cryptocurrency. For example, technologies such as augmented reality (AR),
                                    virtual reality (VR), the internet of things (IoT), and the metaverse may become essential
                                    to the new era of the internet as well.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default HomePage;