import {
    AccountBalanceWallet,
    CurrencyBitcoin,
    DarkMode,
    Lock,
    Send,
    SwapHoriz,
    WaterDrop
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    Tab,
    Tabs,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import ConnectWalletModal from '../page/connect';
import { useTranslation } from '../../lang/LanguageProvider';
  
  const WalletInterface = () => {
    const {i18n} = useTranslation();


    const [value, setValue] = React.useState('usd');
    const [isModalOpen, setModalOpen] = useState(false);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const openConnectWalletModal = () => {
      setModalOpen(true);
    };
  
    const closeConnectWalletModal = () => {
      setModalOpen(false);
    };
  
    return (
      <Box sx={{minHeight: '100vh' }}>
        {/* Navigation Bar */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 2, justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography variant="h6" sx={{ color: '#6c5ce7' }}>◆</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button color="primary">{i18n.t('wallet.wallet')}</Button>
                  <Button color="inherit">{i18n.t('wallet.transaction')}</Button>
                  <Button color="inherit">{i18n.t('wallet.exchange')}</Button>
                  <Button color="inherit">{i18n.t('wallet.saving')}</Button>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                
                <ConnectWalletModal open={isModalOpen} onClose={closeConnectWalletModal} />
                {/* <Button variant="outlined" color="primary" onClick={openConnectWalletModal}>
                  Connect Wallet
                </Button> */}
                <IconButton>
                  <DarkMode />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </AppBar>
  
        
  
        <Container sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {/* Balance Card */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="USD" value="usd" />
                    <Tab label="BTC" value="btc" />
                  </Tabs>
                  <Box sx={{ mt: 3 }}>
                    <Typography color="textSecondary">{i18n.t('wallet.totalBalance')}</Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>₿ 0</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button variant="contained" color="primary" startIcon={<AccountBalanceWallet />} fullWidth>
                      {i18n.t('button.deposit')}
                    </Button>
                    <Button variant="outlined" startIcon={<Send />} fullWidth>
                    {i18n.t('button.send')}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
  
            {/* Right Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>{i18n.t('wallet.forYou')}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: '#6c5ce7', color: '#ddd', height: '100%', textAlign: 'justify' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Lock sx={{ fontSize: 40, mb: 2 }} />
                      <Typography>{i18n.t('wallet.backupWallet')}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: '#2d3436', color: 'white', height: '100%', textAlign: 'justify' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <WaterDrop sx={{ fontSize: 40, mb: 2 }} />
                      <Typography>{i18n.t('wallet.provideDex')}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: '#000000', color: 'white', height: '100%', textAlign: 'justify' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <SwapHoriz sx={{ fontSize: 40, mb: 2 }} />
                      <Typography>{i18n.t('wallet.tradeSwap')}</Typography>
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>
  
              {/* Assets Section */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>{i18n.t('wallet.yourAsset')}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  Here you can safely store, send and receive assets
                </Typography>
                
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CurrencyBitcoin sx={{ color: '#f39c12', fontSize: 32 }} />
                        <Box>
                          <Typography variant="body1">Bitcoin</Typography>
                          <Button color="primary" sx={{ p: 0 }}>{i18n.t('button.showAddress')}</Button>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography>0 BTC</Typography>
                        <Typography color="textSecondary">0 USD</Typography>
                      </Box>
                    </Box>
                </CardContent>
                </Card>
  
                <Button color="primary" fullWidth sx={{ mt: 2 }}>
                  {i18n.t('button.addCustomToken')}
                </Button>
                <Button color="primary" fullWidth sx={{ mt: 1 }}>
                  {i18n.t('button.addCurrency')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };
  
  export default WalletInterface;
  