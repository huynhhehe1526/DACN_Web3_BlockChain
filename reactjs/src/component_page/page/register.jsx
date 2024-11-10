import React, { useState } from 'react';
import '../scss/login.scss';
import {
    Button,
    Checkbox,
    Form,
    Input,
    notification
} from 'antd';
import { createUserAPI } from '../../util/api';
import { useNavigate } from 'react-router-dom';
import LanguageProvider, { useTranslation } from "../../lang/LanguageProvider";

const RegisterPage = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const { username, email, password } = values;
        const res = await createUserAPI(username, email, password);
        if (res) {
            notification.success({
                message: "Sign up succeed!",
                description: "Success"
            });
            navigate("/login")
        } else {
            notification.error({
                message: "Sign up failed!",
                description: "Error"
            })
        }
        console.log('Received values of form from res: ', res);
    };

    return (
        <div className='login-container' >
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

                    <Form
                        name="register"
                        onFinish={onFinish}
                        autoComplete='off'
                        style={{
                            maxWidth: 400,
                            width: '100%',
                            position: 'absolute',
                            right: "10%"
                        }}
                        scrollToFirstError
                        layout='vertical'
                    >
                        <h2 style={{ textTransform: "uppercase" }}>{i18n.t('form.signup')}</h2>

                        <Form.Item
                            name="username"
                            label="User name"
                            tooltip="What do you want others to call you?"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your nickname!',
                                    whitespace: true,
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Button type="primary" htmlType="submit"
                            style={{
                                position: 'absolute',
                                left: '35%'
                            }}
                        >
                            Register
                        </Button>
                    </Form>
                </div>
            </div>

        </div>

    );
};
export default RegisterPage;