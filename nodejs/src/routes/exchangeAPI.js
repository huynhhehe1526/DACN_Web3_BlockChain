const express = require('express');
const axios = require('axios');

const routerAPI = express.Router();

// Mock prediction function
const predictPrice = (currentPrice) => {
    // Dự đoán giá trị tăng/giảm (giả sử tăng 5% trong ví dụ này)
    return (currentPrice * 1.05).toFixed(2);
};

routerAPI.post('/convert', async (req, res) => {
    const { bitcoinAmount, targetCurrency } = req.body;

    if (!bitcoinAmount || !targetCurrency) {
        return res.status(400).json({ error: 'Missing required parameters: bitcoinAmount or targetCurrency' });
    }

    try {
        // Gọi API từ bên thứ 3 để lấy tỷ giá
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${targetCurrency}`
        );

        const exchangeRate = response.data.bitcoin[targetCurrency];

        if (!exchangeRate) {
            return res.status(404).json({ error: `Exchange rate for ${targetCurrency} not found.` });
        }

        // Chuyển đổi số Bitcoin sang loại tiền tệ đích
        const convertedAmount = (bitcoinAmount * exchangeRate).toFixed(2);

        // Dự đoán giá trị trong tương lai
        const predictedRate = predictPrice(exchangeRate);
        const predictedAmount = (bitcoinAmount * predictedRate).toFixed(2);

        return res.status(200).json({
            bitcoinAmount,
            targetCurrency,
            currentRate: exchangeRate,
            convertedAmount,
            predictedRate,
            predictedAmount,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Error fetching exchange rate or processing the request.' });
    }
});

module.exports = routerAPI;


/*
const convertBitcoin = async () => {
    const apiUrl = 'http://localhost:<PORT>/convert'; // Thay <PORT> bằng cổng server của bạn
    const requestBody = {
        bitcoinAmount: 0.5,
        targetCurrency: 'usd'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Conversion Result:', data);
    } catch (error) {
        console.error('API call failed:', error.message);
    }
};

convertBitcoin();

*/ 