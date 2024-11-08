import React from 'react';
import '../scss/homepage.scss';
import shopify from '../../assets/image/shopify.png';
import aws from '../../assets/image/aws.png';
import paradigm from '../../assets/image/paradigm.png';
import ztx from '../../assets/image/ztx.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../lang/LanguageProvider';

const HomePage = () => {
    const {i18n}  =useTranslation();
    const navigate = useNavigate();
    const redirectWallet = () => {
        navigate("/wallets")
    }
    const redirectConnectWallet = () => {
        navigate("/connect_wallet")
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


            <div className="css-1jx91x0">
                <div className="css-1vrsic3">
                    <div className="css-ahthbn">
                        <div className="css-11nrrcx">
                            <div className="css-1vakbk4">
                                <h3 className="chakra-heading css-1v790t6">Smart Contracts</h3>
                            </div>
                            <p className="chakra-text css-12f876q">Ideal for hobbyists who require basic features.</p>
                        </div>
                        <div className="css-o2ldmt">
                            <div className="css-1juabkl">
                                <h2 className="chakra-heading css-yexrf0">$0</h2>
                                <p className="chakra-text css-pvagxz">/ month</p>
                            </div>
                        </div>
                    </div>
                    <div className="!text-foreground css-1m1sj5m">
                        <div className="css-1uqaien">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                                focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                            <div className="css-1aagtwh">
                                <p className="chakra-text css-jqypxo">1,000 monthly active wallets</p>
                            </div>
                        </div>
                        <div className="css-1uqaien">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                                focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                            <p className="chakra-text css-jqypxo">Web, Mobile &amp; Gaming SDKs</p>
                        </div>
                        <div className="css-1uqaien">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                                focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                            <p className="chakra-text css-jqypxo">Contract &amp; Wallet APIs</p>
                        </div>
                        <div className="css-1uqaien">

                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                                focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                            <p className="chakra-text css-jqypxo">Audited smart contracts</p>
                        </div>
                        <div className="css-1uqaien">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                                focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                            <p className="chakra-text css-jqypxo">Community Support</p>
                        </div>
                        <div className="css-1uqaien">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                                focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                            <p className="chakra-text css-jqypxo">Blockchain infra (RPC, IPFS)</p>
                        </div>
                    </div>
                    <div className="css-164iyj1">
                        <a className="chakra-link chakra-button css-1v413bu"
                            href="#">Get started for free</a>
                    </div>
                </div>
                <div className="css-y4kmsg">
                    <div className="css-qa2pfb"></div>
                    <div className="css-15r8kd8">
                        <div className="css-ahthbn">
                            <div className="css-11nrrcx">
                                <div className="css-1vakbk4">
                                    <h3 className="chakra-heading css-1v790t6">Web3</h3>
                                </div>
                                <p className="chakra-text css-12f876q">Ideal for production-grade applications.</p>
                            </div>
                            <div className="css-o2ldmt">
                                <div className="css-1juabkl">
                                    <h2 className="chakra-heading css-yexrf0"><span className="css-1n13rwa">$99</span>
                                    </h2>
                                    <p className="chakra-text css-pvagxz">/ month</p>
                                </div>
                            </div>
                        </div>
                        <div className="!text-foreground css-1m1sj5m">
                            <p className="chakra-text !text-foreground css-x3d532">Everything in Starter, plus:</p>
                            <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                                <div className="css-1aagtwh">
                                    <p className="chakra-text css-jqypxo">10,000 monthly active wallets</p>
                                    <div className="css-764ymq"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                        viewBox="0 0 1024 1024" focusable="false" className="chakra-icon css-1odaobc"
                                        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm47.7-395.2l-25.4-5.9V348.6c38 5.2 61.5 29 65.5 58.2.5 4 3.9 6.9 7.9 6.9h44.9c4.7 0 8.4-4.1 8-8.8-6.1-62.3-57.4-102.3-125.9-109.2V263c0-4.4-3.6-8-8-8h-28.1c-4.4 0-8 3.6-8 8v33c-70.8 6.9-126.2 46-126.2 119 0 67.6 49.8 100.2 102.1 112.7l24.7 6.3v142.7c-44.2-5.9-69-29.5-74.1-61.3-.6-3.8-4-6.6-7.9-6.6H363c-4.7 0-8.4 4-8 8.7 4.5 55 46.2 105.6 135.2 112.1V761c0 4.4 3.6 8 8 8h28.4c4.4 0 8-3.6 8-8.1l-.2-31.7c78.3-6.9 134.3-48.8 134.3-124-.1-69.4-44.2-100.4-109-116.4zm-68.6-16.2c-5.6-1.6-10.3-3.1-15-5-33.8-12.2-49.5-31.9-49.5-57.3 0-36.3 27.5-57 64.5-61.7v124zM534.3 677V543.3c3.1.9 5.9 1.6 8.8 2.2 47.3 14.4 63.2 34.4 63.2 65.1 0 39.1-29.4 62.6-72 66.4z">
                                        </path>
                                    </svg></div>
                                    <p className="chakra-text text-muted-foreground css-7l74i4">then $0.02/wallet</p>
                                </div>
                            </div>
                            <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                                <p className="chakra-text css-jqypxo">Production grade infrastructure</p>
                            </div>
                            <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                                <p className="chakra-text css-jqypxo">Prioritized support</p>
                            </div>
                            <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                                <p className="chakra-text css-jqypxo">Custom branding</p>
                            </div>
                            <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                                <p className="chakra-text css-jqypxo">User analytics</p>
                            </div>
                            <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                                <p className="chakra-text css-jqypxo">Third party auth support</p>
                            </div>
                            <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                </path>
                            </svg>
                                <p className="chakra-text css-jqypxo">Advanced paymaster rules</p>
                            </div>
                        </div>
                        <div className="css-164iyj1">
                            <a className="chakra-link chakra-button css-1v413bu"
                                href="#">Get started for free</a>
                        </div>
                    </div>
                </div>
                <div className="css-1vrsic3">
                    <div className="css-ahthbn">
                        <div className="css-11nrrcx">
                            <div className="css-1vakbk4">
                                <h3 className="chakra-heading css-1v790t6">Blockchain</h3>
                            </div>
                            <p className="chakra-text css-12f876q">Ideal for teams that require more customization, SLAs, and
                                support.</p>
                        </div>
                        <div className="css-o2ldmt">
                            <div className="css-1juabkl">
                                <h2 className="chakra-heading css-yexrf0">Custom</h2>
                            </div>
                        </div>
                    </div>
                    <div className="!text-foreground css-1m1sj5m">
                        <p className="chakra-text !text-foreground css-x3d532">Everything in Growth, plus:</p>
                        <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                            viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                            </path>
                        </svg>
                            <p className="chakra-text css-jqypxo">Custom rate limits for APIs &amp; Infra</p>
                        </div>
                        <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                            viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                            </path>
                        </svg>
                            <p className="chakra-text css-jqypxo">Dedicated support channel</p>
                        </div>
                        <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                            viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                            </path>
                        </svg>
                            <p className="chakra-text css-jqypxo">Guaranteed support response time</p>
                        </div>
                        <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                            viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                            </path>
                        </svg>
                            <p className="chakra-text css-jqypxo">Direct access to solutions &amp; engineering teams</p>
                        </div>
                        <div className="css-1uqaien"><svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                            viewBox="0 0 512 512" focusable="false" className="chakra-icon css-7xl85z" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                            </path>
                        </svg>
                            <p className="chakra-text css-jqypxo">Enterprise grade SLAs</p>
                        </div>
                    </div>
                    <div className="css-164iyj1"><a target="_blank" rel="noopener" className="chakra-link chakra-button css-b5oi97"
                        href="#">Contact us
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
                    </a>
                    </div>
                </div>
            </div>


            <section className="solutions-section">
                <h2>{i18n.t('homepage.titleDetribute')}</h2>
                <div className="css-1wg1opb">
                    <div className="chakra-linkbox css-uth939">
                        <img alt="" src="https://www.verdict.co.uk/wp-content/uploads/2022/12/Shutterstock_2183804245.jpg"
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
                        <img alt="" src="https://markup-ua.com/blog/wp-content/uploads/2024/03/Web3.webp"
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
                            src="https://gfiblockchain.com/wp-content/uploads/2023/06/z4409711254086_a96e32b06de75c017dd527754480f74e-scaled.jpg"
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