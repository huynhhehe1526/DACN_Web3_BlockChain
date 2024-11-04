import React from "react";
import '../scss/footer.scss';
import { useNavigate } from 'react-router-dom';



const Footer = () => {
    const navigate = useNavigate();
    const redirectHomepage = () => {
        navigate('/');
    }
    return (
        <>
            <React.Fragment>
                <div div className='footer-container' >
                    <div className='footer-left'>
                        <h2>Thông tin chung</h2>
                        <ul>
                            <li><a onClick={() => redirectHomepage()}>Trang chủ</a></li>
                            <li><a >Giới thiệu</a></li>
                            <li>
                                <a >
                                    Quy định
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-center'>
                        <h2>Địa chỉ</h2>
                        <ul>
                            <ul type="circle">
                                <li>CNC</li>
                                <li>CN1</li>
                                <li>CN2</li>
                            </ul>
                        </ul>
                    </div>
                    <div className='footer-right'>
                        <h2>Theo dõi</h2>
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
                        <h2>Đăng ký nhanh!</h2>
                        <span style={{ fontWeight: 'Italic' }}>Đăng ký để nhận ưu đãi !</span>
                        <form>
                            <input type="text" placeholder="Enter your email...." />
                            <button type="submit">Submit</button>
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