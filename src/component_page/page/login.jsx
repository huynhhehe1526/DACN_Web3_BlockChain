import React from "react";
import '../scss/login.scss';
import LanguageProvider, { useTranslation } from "../../lang/LanguageProvider";

const LoginPage = () => {
	const { i18n, switchLanguage } = useTranslation();
	console.log("Check language: ")
    return (
        <>
		<div className="login-container">
				<div className="content-login">
					<div className="text-sci">
						<h2 className="animated-text">
							Welcome ! <br /> <span>To Our New Website.</span>
						</h2><br/>
						<p className="animated-text">
							Đăng nhập ngay để trải nghiệm nào !!!!
						</p>
					</div>
				</div>
				<div className="logreg-box">
					<div className="form-box login">
						<form action="#">
							<h2 style={{textTransform:"uppercase"}}>{i18n.t('form.signin')}</h2>
							<div className="input-box">
								<span className="icon">
									<i className="fas fa-envelope"></i>
								</span>
								<input type="email" required />
								<label>Email</label>
							</div>
							<div className="input-box">
								<span className="icon">
									<i className="fas fa-lock"></i>
								</span>
								<input type="password" required />
								<label>Password</label>
							</div>
							<div className="remember-forgot">
								<label>
									<input type="checkbox" />
									Remember me

								</label>
								<a href="#">Forgot password</a>
							</div>
							<button type="submit"
								className="btn-login"
							>Sign in <i className="fa-solid fa-paper-plane" style={{color:'white'}}></i></button>
							<div className="login-register">
								<p>
									Don&apos;t have an account?&nbsp;
									<a href="#" className="register-link">
										Sign up
									</a>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
            
        </>
    )
}

export default LoginPage;