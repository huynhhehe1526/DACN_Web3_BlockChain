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
import React from 'react';
import { useNavigate } from 'react-router-dom';



const WalletInterface = () => {
  const [value, setValue] = React.useState('usd');

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const redirectConnectWallet = () => {
    navigate("/connect_wallet")
}

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Container>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography variant="h6" sx={{ color: '#6c5ce7' }}>◆</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="primary">Wallet</Button>
                <Button color="inherit">Transactions</Button>
                <Button color="inherit">Exchange</Button>
                <Button color="inherit">Earn</Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button variant="outlined" color="primary" onClick={redirectConnectWallet}>
                Connect Wallet
              </Button>
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
                  <Typography color="textSecondary">Your total balance</Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>₿ 0</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button variant="contained" color="primary" startIcon={<AccountBalanceWallet />} fullWidth>
                    Deposit
                  </Button>
                  <Button variant="outlined" startIcon={<Send />} fullWidth>
                    Send
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>For you</Typography>
            <Grid container spacing={2}>
              {/* Feature Cards */}
              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: '#6c5ce7', color: 'white' }}>
                  <CardContent>
                    <Lock sx={{ fontSize: 40, mb: 2 }} />
                    <Typography>Please backup your wallet</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: '#2d3436', color: 'white' }}>
                  <CardContent>
                    <WaterDrop sx={{ fontSize: 40, mb: 2 }} />
                    <Typography>Provide liquidity to our DEX</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: '#000000', color: 'white' }}>
                  <CardContent>
                    <SwapHoriz sx={{ fontSize: 40, mb: 2 }} />
                    <Typography>Trade SWAP on uniswap</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Assets Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>Your assets</Typography>
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
                        <Button color="primary" sx={{ p: 0 }}>Show address</Button>
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
                Add custom token
              </Button>
              <Button color="primary" fullWidth sx={{ mt: 1 }}>
                Add currency
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WalletInterface;