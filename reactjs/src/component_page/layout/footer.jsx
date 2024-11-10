import React from "react";
import '../scss/footer.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "../../lang/LanguageProvider";


const Footer = () => {
    const {i18n} = useTranslation();
    const navigate = useNavigate();
    const redirectHomepage = () => {
        navigate('/');
    }
    return (
        <>
            <React.Fragment>
                <div div className='footer-container' >
                    <div className='footer-left'>
                        <h2>{i18n.t('footer.generalInfor')}</h2>
                        <ul>
                            <li><a onClick={() => redirectHomepage()}>{i18n.t('footer.homepage')}</a></li>
                            <li><a >{i18n.t('footer.introduce')}</a></li>
                            <li>
                                <a >
                                {i18n.t('footer.regular')}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-center'>
                        <h2>{i18n.t('footer.address')}</h2>
                        <ul>
                            <ul type="circle">
                                <li>CNC</li>
                                <li>CN1</li>
                                <li>CN2</li>
                            </ul>
                        </ul>
                    </div>
                    <div className='footer-right'>
                        <h2>{i18n.t('footer.followUs')}</h2>
                        <ul className="social">
                            <li>
                                <i className="fab fa-facebook"></i>
                                <a href='https://www.facebook.com' target='_blank'>
                                    Facebook
                                </a>
                            </li>
                            <li><i className="fab fa-twitter-square"></i> Twitter</li>
                            <li><i className="fab fa-instagram"></i> Instagram</li>
                        </ul>
                    </div>
                    <div className="footer-extra">
                        <h2>{i18n.t('footer.quickSingup')}</h2>
                        <span style={{ fontWeight: 'Italic' }}>{i18n.t('footer.offerSignup')}</span>
                        <form>
                            <input type="text" placeholder={`${i18n.t('input.email')}`} required/>
                            <button type="submit">{i18n.t('button.submit')} <i className="fa-solid fa-paper-plane" style={{color:'black'}}></i></button>
                        </form>
                    </div>
                </div >
                <div className="footer-copyright">
                    <center>
                        <hr />
                        <p>© 2024 AllTop.vn, Inc. All rights reserved.</p>
                    </center>
                </div>
            </React.Fragment>
        </>
    )
}

export default Footer;