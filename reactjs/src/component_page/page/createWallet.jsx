import { Alert, Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateWallet = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name) {
      setError('Tên không thể để trống!');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/create_wallet', { bank_account: name }); // Đổi API_ENDPOINT thành URL thực tế
      setSuccess(true);
      console.log('Tạo ví thành công:', response.data);
      setTimeout(() => navigate('/wallet'), 2000); // Điều hướng sau 2 giây
    } catch (error) {
      setError('Lỗi tạo ví, vui lòng thử lại!');
      console.error('Error creating wallet:', error);
    } finally {
      setLoading(false);
    }
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
          sx={{ mt: 2 }}
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

        {success && (
          <Alert severity="success" sx={{ mt: 3 }}>
            Tạo ví thành công! Đang chuyển hướng...
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default CreateWallet;
