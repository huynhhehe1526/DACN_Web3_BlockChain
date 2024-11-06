import { AccountBalanceWallet, Close as CloseIcon, Warning } from '@mui/icons-material';
import { Alert, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Snackbar, Typography } from '@mui/material';
import React, { useState } from 'react';

const WALLETS = [
  { name: 'MetaMask', icon: '/metamask.png', description: 'Connect to your MetaMask Wallet', type: 'metamask' },
  { name: 'WalletConnect', icon: '/walletconnect.png', description: 'Scan with WalletConnect to connect', type: 'walletconnect' },
  { name: 'Coinbase Wallet', icon: '/coinbase.png', description: 'Connect to your Coinbase Wallet', type: 'coinbase' },
  { name: 'Trust Wallet', icon: '/trustwallet.png', description: 'Connect to your Trust Wallet', type: 'trust' }
];

const ConnectWalletModal = ({ open, onClose }) => {
  const [error, setError] = useState('');
  const [connecting, setConnecting] = useState(false);

  const handleConnectWallet = async (walletType) => {
    setConnecting(true);
    try {
      switch (walletType) {
        case 'metamask':
          if (!window.ethereum) {
            throw new Error('MetaMask không được cài đặt');
          }
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          break;
        case 'walletconnect':
          throw new Error('WalletConnect đang được phát triển');
        case 'coinbase':
          throw new Error('Coinbase Wallet đang được phát triển');
        case 'trust':
          throw new Error('Trust Wallet đang được phát triển');
        default:
          throw new Error('Ví không được hỗ trợ');
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setConnecting(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1300 }}>
        <Box sx={{ width: '90%', maxWidth: 500, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 3, position: 'relative' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Kết nối ví</Typography>
            <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
          </Box>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
            Chọn ví bạn muốn kết nối. Nếu bạn chưa cài đặt ví, bạn có thể chọn một ví và được hướng dẫn cài đặt.
          </Typography>
          <List>
            {WALLETS.map((wallet) => (
              <ListItem key={wallet.type} disablePadding>
                <ListItemButton onClick={() => handleConnectWallet(wallet.type)} disabled={connecting} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1, '&:hover': { bgcolor: 'action.hover' } }}>
                  <ListItemIcon>
                    <Box component="img" src={wallet.icon} alt={wallet.name} sx={{ width: 40, height: 40, p: 1 }} onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png'; }} />
                  </ListItemIcon>
                  <ListItemText primary={wallet.name} secondary={wallet.description} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Alert severity="warning" icon={<Warning />} sx={{ mt: 2 }}>
            Bằng cách kết nối ví, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi
          </Alert>
        </Box>
      </Box>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

const WalletConnector = ({ open, onClose }) => (
  <>
    <Button variant="contained" color="primary" startIcon={<AccountBalanceWallet />} onClick={onClose}>
      Kết nối ví
    </Button>
    <ConnectWalletModal open={open} onClose={onClose} />
  </>
);

export default WalletConnector;
