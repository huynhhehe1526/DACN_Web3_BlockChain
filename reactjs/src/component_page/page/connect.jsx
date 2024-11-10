import { AccountBalanceWallet, Close as CloseIcon, Warning } from '@mui/icons-material';
import { Alert, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Snackbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import metamask from "../../assets/image/metamask.jpg";
import walletconnect from '../../assets/image/walletconnect.png'
import coinbase from '../../assets/image/coinbase.jpg';
import trustwallet from '../../assets/image/trustwallet.jpg';
import { useTranslation } from '../../lang/LanguageProvider';

const WALLETS = [
  { 
    name: 'MetaMask', 
    icon: metamask, 
    description_vi: 'Kết nối với ví MetaMask của bạn', 
    description_en: 'Connect to your MetaMask Wallet', 
    type: 'metamask',
    error_vi:"MetaMask không được cài đặt",
    error_en:"MetaMask is not installed"  
  },
  { 
    name: 'WalletConnect', 
    icon: walletconnect, 
    description_vi: 'Quét bằng WalletConnect để kết nối',
    description_en: 'Scan with WalletConnect to connect', 
    type: 'walletconnect',
    error_vi:"WalletConnect đang được phát triển",
    error_en:"WalletConnect is under development" 
  },
  { 
    name: 'Coinbase Wallet', 
    icon: coinbase, 
    description_vi: 'Kết nối với ví Coinbase của bạn', 
    description_en: 'Connect to your Coinbase Wallet', 
    type: 'coinbase',
    error_vi:"Coinbase Wallet đang được phát triển",
    error_en:"Coinbase Wallet is under development" 
  },
  { 
    name: 'Trust Wallet', 
    icon: trustwallet, 
    description_vi: 'Kết nối với ví Trust của bạn', 
    description_en: 'Connect to your Trust Wallet', 
    type: 'trust',
    error_vi:"Trust Wallet đang được phát triển",
    error_en:"Trust Wallet is under development" 
  }
];

const ConnectWalletModal = ({ open, onClose }) => {
  const {i18n, locale} = useTranslation();
  const [error, setError] = useState('');
  const [connecting, setConnecting] = useState(false);
  const handleConnectWallet = async (walletType) => {
    setConnecting(true);
    try {
      const wallet = WALLETS.find((w) => w.type === walletType);
  
      switch (walletType) {
        case 'metamask':
          if (!window.ethereum) {
            throw new Error(locale === "vi" ? wallet.error_vi : wallet.error_en);
          }
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          break;
        case 'walletconnect':
          throw new Error(locale === "vi" ? wallet.error_vi : wallet.error_en);
        case 'coinbase':
          throw new Error(locale === "vi" ? wallet.error_vi : wallet.error_en);
        case 'trust':
          throw new Error(locale === "vi" ? wallet.error_vi : wallet.error_en);
        default:
          throw new Error(locale === "vi" ? "Ví không được hỗ trợ" : "Unsupported wallet");
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
            <Typography variant="h6" sx={{color:'black'}}>{i18n.t('connectWalletModal.title')}</Typography>
            <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
          </Box>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
          {i18n.t('connectWalletModal.description')}
          </Typography>
          <List>
            {WALLETS.map((wallet) => (
              <ListItem key={wallet.type} disablePadding>
                <ListItemButton onClick={() => handleConnectWallet(wallet.type)} disabled={connecting} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1, '&:hover': { bgcolor: 'action.hover' } }}>
                  <ListItemIcon>
                    <Box component="img" src={wallet.icon} alt={wallet.name} sx={{ width: 40, height: 40, p: 1 }} onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png' }} />
                  </ListItemIcon>
                  <ListItemText primary={wallet.name} sx={{color:'black', fontWeight:'bold'}} secondary={locale=="vi"? wallet.description_vi :wallet.description_en} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Alert severity="warning" icon={<Warning />} sx={{ mt: 2 }}>
            {i18n.t('connectWalletModal.warning')}
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



const WalletConnector = () => {
  const {i18n}  =useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<AccountBalanceWallet />} onClick={handleOpen}>
        {i18n.t('button.connectWallet')}
      </Button>
      <ConnectWalletModal open={open} onClose={handleClose} />
    </>
  );
};

export default WalletConnector;
