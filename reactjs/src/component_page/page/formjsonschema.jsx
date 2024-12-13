//rs

import Form from '@rjsf/core';
import { useState, useEffect } from 'react';
import validator from '@rjsf/validator-ajv8';
import { postGuessBitCoin } from '../../redux/guessBitCoin/guessBitcoinSlice';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd'; 
import { getResult } from '../../redux/result/resultSlice';

const schema = {
    title: "Nhập thông tin Bitcoin",
    type: "object",
    properties: {
        bitcoin_wallet: { type: "string", title: "Ví Bitcoin" },
        bank_account: { type: "string", title: "Tài khoản ngân hàng" },
        bitcoin: { type: "number", title: "Số bitcoin", minimum: 0 },
        predicted_price: { type: "number", title: "Giá dự báo", minimum: 0 }
    },
    required: ["bitcoin_wallet", "bank_account", "bitcoin", "predicted_price"]
};

const uiSchema = {
    bitcoin: {
        "ui:widget": "updown"
    }
};

const Formjsonschema = () => {
    const dispatch = useDispatch();
    const winner = useSelector((state) => state.result.result); 
    const [formData, setFormData] = useState({
        bitcoin_wallet: '',
        bank_account: '',
        bitcoin: 0,
        predicted_price: 0
    });

    const [isWinner, setIsWinner] = useState(false);

    useEffect(() => {
        const bitcoinInfo = sessionStorage.getItem('bitcoinInfo');
        if (bitcoinInfo) {
            try {
                const parsedData = JSON.parse(bitcoinInfo);
                if (parsedData) {
                    setFormData((prevData) => {
                        if (
                            parsedData.bitcoin_wallet !== prevData.bitcoin_wallet ||
                            parsedData.bank_account !== prevData.bank_account ||
                            parsedData.bitcoin !== prevData.bitcoin ||
                            parsedData.predicted_price !== prevData.predicted_price
                        ) {
                            return {
                                bitcoin_wallet: parsedData.bitcoin_wallet || '',
                                bank_account: parsedData.bank_account || '',
                                bitcoin: parsedData.bitcoin || 0,
                                predicted_price: parsedData.predicted_price || 0
                            };
                        }
                        return prevData; 
                    });
                }
            } catch (error) {
                console.error('Lỗi khi phân tích JSON từ sessionStorage:', error);
            }
        }
    }, []); 

    useEffect(() => {
        if (winner && winner.winner) {
            setIsWinner(true);
        } else {
            setIsWinner(false);
        }
    }, [winner]);

    const handleSubmit = async (formData) => {
        try {
            const res = await dispatch(postGuessBitCoin(formData)).unwrap();
            if (res) {
                console.log("check res ben form schema json: ", res);
                if (res.data) {
                    if (res.error == 0) {
                        notification.success({
                            message: res.message,
                            description: "Success"
                        });
                        notification.info({
                            message: "Bạn đầu tư " + res.data.bitcoin + "$",
                            description: "Info"
                        });
                    } else {
                        notification.info({
                            message: res.message,
                            description: "Info"
                        });
                    }
                } else {
                    notification.info({
                        message: res.message,
                        description: "Info"
                    });
                }
            }
        } catch (error) {
            notification.error({
                message: "Lỗi khi gửi dữ liệu",
                description: error.message || "Có lỗi xảy ra khi gửi dữ liệu"
            });
        }
    };

    return (
        <div>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onSubmit={({ formData }) => handleSubmit(formData)}
                validator={validator}
                disabled={isWinner} // Disable form nếu công bố winner
            />
        </div>
    );
};

export default Formjsonschema;


