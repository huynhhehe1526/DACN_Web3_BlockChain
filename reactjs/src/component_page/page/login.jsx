import React, { useState } from "react";
import '../scss/login.scss';
import LanguageProvider, { useTranslation } from "../../lang/LanguageProvider";
import { handleLogin } from "../../util/api";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const { i18n } = useTranslation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Email:", email);
		console.log("Password:", password);
		const res = await handleLogin(email, password);
		if (res && res.error === 0) {
			localStorage.setItem("access_token", res.accessToken);
			localStorage.setItem("username", res.user.username);
			notification.success({
				message: res.message,
				description: "Success"
			})
			navigate("/")
		} else {
			notification.error({
				message: res.message,
				description: "Error"
			})
		}
		console.log("Check data from function handleLogin: ", res)
	};

	return (
		<>
			<div className="login-container">
				<div className="content-login">
					<div className="text-sci">
						<h2 className="animated-text">
							{i18n.t('form.title')} <br /> <span>{i18n.t('form.t_title')}</span>
						</h2><br />
						<p className="animated-text">
							{i18n.t('form.subtitle')}
						</p>
					</div>
				</div>
				<div className="logreg-box">
					<div className="form-box login">
						<form onSubmit={handleSubmit}>
							<h2 style={{ textTransform: "uppercase" }}>{i18n.t('form.signin')}</h2>
							<div className="input-box">
								<span className="icon">
									<i className="fas fa-envelope"></i>
								</span>
								<input
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label>Email</label>
							</div>
							<div className="input-box">
								<span className="icon">
									<i className="fas fa-lock"></i>
								</span>
								<input
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label>{i18n.t('label.password')}</label>
							</div>
							<div className="remember-forgot">
								<label>
									<input type="checkbox" />
									{i18n.t('checkbox.rememberMe')}
								</label>
								<a href="#">{i18n.t('button.forgotPass')}</a>
							</div>
							<button type="submit" className="btn-login">
								{i18n.t('button.singin')} <i className="fa-solid fa-paper-plane" style={{ color: 'white' }}></i>
							</button>
							<div className="login-register">
								<p>
									{i18n.t('form.notice')}&nbsp;
									<a href="/register" className="register-link">
										{i18n.t('button.signup')}
									</a>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
