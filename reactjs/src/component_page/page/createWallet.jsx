import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateWallet = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name) {
      setError('Tên không thể để trống!');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/create_wallet', { bank_account: name });
      const wallet = response.data.wallet;
      setWalletData(wallet);
      setSuccess(true);
      sessionStorage.setItem('bitcoinInfo', JSON.stringify(wallet));
    } catch (error) {
      setError('Lỗi tạo ví, vui lòng thử lại!');
      console.error('Error creating wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setWalletData(null);
    setSuccess(false);
    navigate('/wallets');
  };

  return (
    <Container>
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Tạo Ví Mới
        </Typography>

        <TextField
          label="Nhập tên ví"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mt: 2 , backgroundColor : "white"}}
          error={Boolean(error)}
          helperText={error}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Tạo Ví'}
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Box>

      {/* Modal hiển thị thông tin ví */}
      <Modal open={success} onClose={closeModal}>
        <Card sx={{ maxWidth: 500, margin: 'auto', mt: 10, p: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Thông Tin Ví Bitcoin
            </Typography>

            {walletData && (
              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Bitcoin Wallet:</strong> {walletData.bitcoin_wallet}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Tài Khoản Ngân Hàng:</strong> {walletData.bank_account}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Mnemonic:</strong> {walletData.mnemonic}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Số Dư:</strong> {walletData.totalBalance} BTC
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={closeModal}
            >
              Đóng
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </Container>
  );
};

export default CreateWallet;
