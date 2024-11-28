// import Form from '@rjsf/core';
// import { useState } from 'react';
// import validator from '@rjsf/validator-ajv8';
// import { savePriceGuess } from '../../util/api';
// import { postGuessBitCoin } from '../../redux/guessBitCoin/guessBitcoinSlice';
// import { useDispatch } from 'react-redux';

// const schema = {
//     title: "Nhập thông tin Bitcoin",
//     type: "object",
//     properties: {
//         bitcoin_wallet: { type: "string", title: "Ví Bitcoin" },
//         bank_account: { type: "string", title: "Tài khoản ngân hàng" },
//         bitcoin: { type: "number", title: "Số bitcoin", minimum: 0 },
//         predicted_price: { type: "number", title: "Giá dự báo", minimum: 0 }
//     },
//     required: ["bitcoin_wallet", "bank_account", "bitcoin", "predicted_price"]
// };

// const uiSchema = {
//     bitcoin: {
//         "ui:widget": "updown"
//     }
// };

// const Formjsonschema = () => {
//     const dispatch = useDispatch();

//     // const handleSubmit = async (formData) => {
//     //     try {
//     //         const response = await savePriceGuess(formData);
//     //         console.log("Check responsive save price guess: ", response)
//     //         alert(response.message);
//     //     } catch (error) {
//     //         alert("Lỗi khi gửi dữ liệu!");
//     //     }
//     // };
//     const bitcoinInfo = JSON.parse(sessionStorage.getItem('bitcoinInfo'));
//     const total = bitcoinInfo?.totalBalance;

//     const handleSubmit = async (formData) => {
//         try {
//             const res = await dispatch(postGuessBitCoin(formData)).unwrap();
//             if (res) {
//                 if (res.data) {
//                     setDtWallet(res.data);

//                     notification.success({
//                         message: res.message,
//                         description: "Success"
//                     })
//                     onClose();
//                 }
//                 notification.info({
//                     message: res.message,
//                     description: "Info"
//                 })

//             }
//         } catch (error) {
//             alert("Lỗi khi gửi dữ liệu!");
//         }
//     };
//     return (
//         <div>
//             <Form
//                 schema={schema}
//                 uiSchema={uiSchema}
//                 onSubmit={({ formData }) => handleSubmit(formData)}
//                 validator={validator}
//             />
//         </div>
//     );
// };

// export default Formjsonschema;



















// import Form from '@rjsf/core';
// import { useState, useEffect } from 'react';
// import validator from '@rjsf/validator-ajv8';
// import { postGuessBitCoin } from '../../redux/guessBitCoin/guessBitcoinSlice';
// import { useDispatch } from 'react-redux';
// import { notification } from 'antd'; // Giả sử bạn sử dụng Ant Design để hiển thị thông báo

// const schema = {
//     title: "Nhập thông tin Bitcoin",
//     type: "object",
//     properties: {
//         bitcoin_wallet: { type: "string", title: "Ví Bitcoin" },
//         bank_account: { type: "string", title: "Tài khoản ngân hàng" },
//         bitcoin: { type: "number", title: "Số bitcoin", minimum: 0 },
//         predicted_price: { type: "number", title: "Giá dự báo", minimum: 0 }
//     },
//     required: ["bitcoin_wallet", "bank_account", "bitcoin", "predicted_price"]
// };

// const uiSchema = {
//     bitcoin: {
//         "ui:widget": "updown"
//     }
// };

// const Formjsonschema = () => {
//     const dispatch = useDispatch();
//     const [formData, setFormData] = useState({
//         bitcoin_wallet: '',
//         bank_account: '',
//         bitcoin: 0,
//         predicted_price: 0
//     });

//     const bitcoinInfo = JSON.parse(sessionStorage.getItem('bitcoinInfo'));

//     useEffect(() => {
//         // Lấy giá trị từ sessionStorage nếu có

//         if (bitcoinInfo) {
//             setFormData({
//                 bitcoin_wallet: bitcoinInfo?.bitcoin_wallet || '',  // Đảm bảo có giá trị mặc định nếu không có trong sessionStorage
//                 bank_account: bitcoinInfo?.bank_account || '',      // Đảm bảo có giá trị mặc định nếu không có trong sessionStorage
//                 bitcoin: bitcoinInfo?.bitcoin || 0,                  // Đảm bảo có giá trị mặc định
//                 predicted_price: bitcoinInfo?.predicted_price || 0   // Đảm bảo có giá trị mặc định
//             });
//         }
//     }, [bitcoinInfo]);  // useEffect chỉ chạy một lần khi component mount

//     const handleSubmit = async (formData) => {
//         try {
//             const res = await dispatch(postGuessBitCoin(formData)).unwrap();
//             if (res) {
//                 console.log("check res ben form schema json: ", res)
//                 if (res.data) {
//                     notification.success({
//                         message: res.message,
//                         description: "Success"
//                     });
//                 }
//             }
//         } catch (error) {
//             alert("Lỗi khi gửi dữ liệu!");
//         }
//     };

//     return (
//         <div>
//             <Form
//                 schema={schema}
//                 uiSchema={uiSchema}
//                 formData={formData}  // Truyền formData đã được cập nhật từ sessionStorage
//                 onSubmit={({ formData }) => handleSubmit(formData)}
//                 validator={validator}
//             />
//         </div>
//     );
// };

// export default Formjsonschema;



//rs

import Form from '@rjsf/core';
import { useState, useEffect } from 'react';
import validator from '@rjsf/validator-ajv8';
import { postGuessBitCoin } from '../../redux/guessBitCoin/guessBitcoinSlice';
import { useDispatch } from 'react-redux';
import { notification } from 'antd'; // Giả sử bạn sử dụng Ant Design để hiển thị thông báo

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
    const [formData, setFormData] = useState({
        bitcoin_wallet: '',
        bank_account: '',
        bitcoin: 0,
        predicted_price: 0
    });

    useEffect(() => {
        // Kiểm tra giá trị của sessionStorage có hợp lệ không
        const bitcoinInfo = sessionStorage.getItem('bitcoinInfo');
        if (bitcoinInfo) {
            try {
                const parsedData = JSON.parse(bitcoinInfo);
                // Chỉ cập nhật nếu dữ liệu hợp lệ
                if (parsedData) {
                    setFormData((prevData) => {
                        // Chỉ cập nhật formData nếu có sự thay đổi thực sự
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
                        return prevData; // Trả lại dữ liệu cũ nếu không có sự thay đổi
                    });
                }
            } catch (error) {
                console.error('Lỗi khi phân tích JSON từ sessionStorage:', error);
            }
        }
    }, []); // Chỉ chạy một lần khi component mount

    const handleSubmit = async (formData) => {
        try {
            const res = await dispatch(postGuessBitCoin(formData)).unwrap();
            if (res) {
                console.log("check res ben form schema json: ", res);
                if (res.data) {
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
                notification.error({
                    message: res.message,
                    description: "Error"
                });
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
                formData={formData}  // Truyền formData đã được cập nhật từ sessionStorage
                onSubmit={({ formData }) => handleSubmit(formData)}
                validator={validator}
            />
        </div>
    );
};

export default Formjsonschema;
