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
  colors,
  Container,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ConnectWalletModal from '../page/connect';
import { useTranslation } from '../../lang/LanguageProvider';
import { useSelector } from 'react-redux';
import { postGuessBitCoin } from '../../redux/guessBitCoin/guessBitcoinSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button as AntButton, ConfigProvider, Flex, notification, Popover } from 'antd';
import { getResult, checkWinnerPrevious } from '../../redux/result/resultSlice';
import moment from "moment";
const WalletInterface = () => {
  const { i18n } = useTranslation();

  const [value, setValue] = useState('usd');
  const [isModalOpen, setModalOpen] = useState(false);
  const [showtotal, setShowToTal] = useState(0);

  const [isWinner, setIsWinner] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowNoticePublish, setIsShowNoticePublish] = useState(false);
  const totalBalance = useSelector((state) => state.guessBitCoin.totalBalance);

  const winner = useSelector((state) => state.result.result);
  console.log("Check log bên wallet tìm người chiến thắng: ", winner);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openConnectWalletModal = () => {
    setModalOpen(true);
  };

  const closeConnectWalletModal = () => {
    setModalOpen(false);
  };

  const handleRedirectTransaction = () => {
    navigate('/transaction');
  };

  const userInfo = JSON.parse(sessionStorage.getItem('bitcoinInfo')) || {};
  const currentUserId = userInfo?._id;

  console.log("Check userId đang đăng nhập: ", currentUserId);

  useEffect(() => {
    const bitcoinInfo = sessionStorage.getItem('bitcoinInfo');

    if (bitcoinInfo) {
      try {
        const parsedData = JSON.parse(bitcoinInfo);
        const total = parsedData?.totalBalance;
        console.log("Check totalBalance từ sessionStorage: ", total);

        if (showtotal === 0 && total) {
          setShowToTal(total); // Set totalBalance only if it's 0
        }
      } catch (error) {
        console.error("Error parsing bitcoinInfo from sessionStorage:", error);
      }
    }
  }, [showtotal]);
  useEffect(() => {
    if (winner && winner.winner) {
      setNotificationCount(1);
    }
  }, [winner]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(checkWinnerPrevious(currentUserId)).unwrap();

        if (result.error == 0) {
          setIsWinner(true);
        } else {
          setIsWinner(false);
        }
        console.log("Success: ", result);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    if (currentUserId) {
      fetchData();
    }
  }, [dispatch, currentUserId]);
  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  const handleClickCongBo = () => {
    const notice = dispatch(getResult());
    setIsShowNoticePublish(true);
    localStorage.setItem("isShowNoticePublish", "true");
    console.log("Check notice winner: ", notice);
  }

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "isShowNoticePublish") {
        const value = e.newValue === "true";
        setIsShowNoticePublish(value);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    const storedValue = localStorage.getItem("isShowNoticePublish");
    if (storedValue === "true") {
      setIsShowNoticePublish(true);
    }
  }, []);

  useEffect(() => {
    if (isShowNoticePublish) {
      dispatch(getResult());

      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const timeLeft = endOfDay - now;

      console.log(`Thời gian còn lại đến cuối ngày: ${timeLeft} ms`);
      const timeout = setTimeout(() => {
        setIsShowNoticePublish(false);
        console.log("Thông báo đã được reset!");
      }, timeLeft);

      return () => clearTimeout(timeout);
    }
  }, [isShowNoticePublish, dispatch]);

  console.log("Check log bên wallet lấy ra state redux: ", totalBalance);


  //redux getresult

  const maskWinnerId = (winnerId) => {
    if (!winnerId) return "";
    const visiblePart = winnerId.slice(-4);
    const maskedPart = "*".repeat(winnerId.length - 4);
    return `${maskedPart}${visiblePart}`;
  };


  const [notificationCount, setNotificationCount] = useState(0);


  const text = <span>Thông báo <hr sx={{ width: "10px" }} /></span>;
  const content = (
    <div style={{ height: '50px', margin: 0, padding: 0 }}>
      {winner && winner.winner ?
        <>
          <span style={{ color: 'gray' }}>Ngày: {moment.utc(winner.winner.created_at).format("DD/MM/YYYY, HH:mm:ss")}</span>
          <div style={{ display: "flex", gap: "5px", textAlign: 'justify', alignItems: 'center', justifyContent: 'flex-start' }}>
            <i className="fa-solid fa-circle" style={{ color: "blue", fontSize: "5px" }}></i>

            <div div className='content-notice'>
              Chúc mừng người dùng {maskWinnerId(`${winner.winner.winnerId}`)} chiến thắng
            </div>
          </div>
        </>
        :
        <div div className='content-notice'>
          Hiện chưa có thông báo mới
        </div>
      }

    </div >

  );
  const buttonWidth = 80;




  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Container>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography variant="h6" sx={{ color: '#6c5ce7' }}>◆</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="primary">{i18n.t('wallet.wallet')}</Button>
                <Button color="inherit" onClick={handleRedirectTransaction}>
                  {i18n.t('wallet.transaction')}
                </Button>
                <Button color="inherit">{i18n.t('wallet.exchange')}</Button>
                <Button color="inherit">{i18n.t('wallet.saving')}</Button>
              </Box>
            </Box>
            <Box>
              <ConfigProvider
                button={{
                  style: {
                    width: buttonWidth,
                    margin: 4,
                  },
                }}
              >
                <Flex vertical justify="center" align="center" className="demo">
                  <Flex
                    style={{
                      width: buttonWidth * 5 + 32,
                    }}
                    justify="space-between"
                    align="center"
                  >
                  </Flex>
                  <Flex
                    justify="center"
                    align="center"
                    style={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {/* <Popover placement="bottom" title={text} content={content}>
                      <i className="fa-solid fa-bell" style={{ color: "white", fontSize: "20px" }}></i>
                    </Popover> */}
                    <Popover
                      placement="bottom"
                      title={text}
                      content={content}
                    // Xử lý khi click
                    >
                      <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <i className="fa-solid fa-bell" style={{ color: "white", fontSize: "20px", cursor: "pointer" }} onMouseEnter={handleNotificationClick}></i>
                        {notificationCount > 0 && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              backgroundColor: 'red',
                              borderRadius: '50%',
                              width: '18px',
                              height: '18px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '12px',
                              fontWeight: 'bold',
                            }}
                          >
                            {notificationCount}
                          </Box>
                        )}
                      </Box>
                    </Popover>

                    {/* Thêm nút công bố nếu người dùng là người chiến thắng hôm qua */}
                    {isWinner && (
                      <Button variant="contained" color="primary" onClick={handleClickCongBo}>
                        Công bố
                      </Button>
                    )}

                  </Flex>
                </Flex>
              </ConfigProvider>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ConnectWalletModal open={isModalOpen} onClose={closeConnectWalletModal} />
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
                  <Typography variant="h4" sx={{ mt: 1 }}>₿ {showtotal}</Typography>
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
                      <Typography> BTC</Typography>
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

