import axios from "axios";
import React, { useEffect, useState } from "react";

const MarketPage = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchCoins = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/coins/markets",
                {
                    params: {
                        vs_currency: "usd",
                        order: "market_cap_desc",
                        per_page: 10,
                        page: 1,
                    },
                }
            );
            setCoins(response.data);
            setLastUpdated(new Date());
            setLoading(false);
        } catch (err) {
            setError("Không thể tải dữ liệu tiền ảo");
            setLoading(false);
        }
    };

    useEffect(() => {
        // Tải dữ liệu ban đầu
        fetchCoins();

        // Cập nhật dữ liệu mỗi 10 giây
        const intervalId = setInterval(fetchCoins, 10000);

        // Dọn dẹp interval khi component unmount
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ 
            fontFamily: 'Arial, sans-serif', 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '20px' 
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Thị Trường Tiền Điện Tử</h1>
                <small>
                    Cập nhật lần cuối: 
                    {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Chưa cập nhật'}
                </small>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: 'green' }}>
                        <th style={tableHeaderStyle}>Tên</th>
                        <th style={tableHeaderStyle}>Giá</th>
                        <th style={tableHeaderStyle}>24h</th>
                        <th style={tableHeaderStyle}>Vốn Hóa</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin) => (
                        <tr key={coin.id} style={tableRowStyle}>
                            <td style={cellStyle}>
                                <img 
                                    src={coin.image} 
                                    alt={coin.name} 
                                    style={{
                                        width: '20px', 
                                        marginRight: '10px', 
                                        verticalAlign: 'middle'
                                    }} 
                                />
                                {coin.name}
                            </td>
                            <td style={cellStyle}>
                                ${coin.current_price.toLocaleString()}
                            </td>
                            <td style={{
                                ...cellStyle,
                                color: coin.price_change_percentage_24h > 0 ? 'green' : 'red'
                            }}>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </td>
                            <td style={cellStyle}>
                                ${coin.market_cap.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const tableHeaderStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left'
};

const tableRowStyle = {
    borderBottom: '1px solid #eee'
};

const cellStyle = {
    padding: '10px',
    alignItems: 'center'
};

export default MarketPage;