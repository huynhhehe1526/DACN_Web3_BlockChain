import {
  AccountBalanceWallet,
  CurrencyBitcoin,
  DarkMode,
  Send
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
import { ConfigProvider, Flex, Popover } from 'antd';
import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../lang/LanguageProvider';
import { checkWinnerPrevious, getResult } from '../../redux/result/resultSlice';
import Header from "../layout/header";
import ConnectWalletModal from '../page/connect';

const WalletInterface = () => {
  const { i18n } = useTranslation();

  const [value, setValue] = useState('usd');
  const [isModalOpen, setModalOpen] = useState(false);
  const [showtotal, setShowToTal] = useState(0);
  const [btcPrice, setBtcPrice] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [isShowAddress, setIsShowAddress] = useState(false);

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
  const bitcoinWallet = userInfo?.bitcoin_wallet;

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
  //gốc
  useEffect(() => {
    if (winner && winner.winner) {
      setNotificationCount(1);
    }
  }, [winner]);
  // useEffect(() => {
  //   dispatch(getResult());
  // }, [dispatch])

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

  useEffect(() => {
    if (winner && winner.winner && currentUserId === winner.winner.winnerId) {
      // setNotificationCount(2);
      setNotificationCount((prevCount) => prevCount + 1);
    }
  }, [winner, currentUserId]);
  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  const handleJobRedirect = () => {
    navigate('/jobchain');
  }

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
    if (isShowNoticePublish == true) {
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

  //suaphanbitcoin
  const fetchBitcoinPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids: "bitcoin",
            order: "market_cap_desc",
            per_page: 1,
            page: 1,
          },
        }
      );
      
      if (response.data && response.data.length > 0) {
        setBtcPrice(response.data[0].current_price);
      }
    } catch (error) {
      console.error("Error fetching Bitcoin price:", error);
      // Fallback to a default price if API fails
      setBtcPrice(100000);
    }
  };

  // Fetch Bitcoin price on component mount and set up periodic updates
  useEffect(() => {
    fetchBitcoinPrice();
    
    // Update price every 10 seconds
    const intervalId = setInterval(fetchBitcoinPrice, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  // Function to convert BTC to USD
  const convertBtcToUsd = (btcAmount) => {
    return (btcAmount * btcPrice).toFixed(2);
  };

  // Determine the displayed total based on selected tab
  const displayTotal = value === 'usd' 
    ? convertBtcToUsd(showtotal) 
    : showtotal;

  // Determine the currency symbol
  const currencySymbol = value === 'usd' ? '$' : '₿';


  const content = (
    <div style={{ margin: 0, padding: '10px', height: 'auto' }}>
      {winner && winner.winner ? (
        <>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: 'gray', fontSize: '14px' }}>
              Ngày: {moment.utc(winner.winner.created_at).format('DD/MM/YYYY, HH:mm:ss')}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              textAlign: 'left',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: '15px',
            }}
          >
            <i className="fa-solid fa-circle" style={{ color: 'blue', fontSize: '8px' }}></i>
            <div className="content-notice" style={{ fontSize: '14px' }}>
              Chúc mừng người dùng {maskWinnerId(`${winner.winner.winnerId}`)} chiến thắng
            </div>
          </div>

          {currentUserId === winner.winner.winnerId && (
            <div
              style={{
                display: 'flex',
                gap: '10px',
                textAlign: 'left',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: '20px',
                paddingTop: '10px',
                borderTop: '1px solid #eee',
              }}
            >
              <i className="fa-solid fa-circle" style={{ color: 'green', fontSize: '8px' }}></i>
              <div className="content-notice" style={{ fontSize: '14px' }}>
                Chúc mừng bạn nhận được job!
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: '5px', padding: '5px 15px', fontSize: '12px' }}
                  onClick={handleJobRedirect}
                >
                  Xem Job
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="content-notice" style={{ fontSize: '14px', color: 'gray' }}>
          Hiện chưa có thông báo mới
        </div>
      )}
    </div>

  );
  const buttonWidth = 80;
  const handleCreateClick = () => {
    navigate('/create');
  };
  const handleShowAdressBitcoin = () => {
    setIsShowAddress(true);
  };
  const handleHideAddressBitcoin = () => {
    setIsShowAddress(false);
  }
  return (
    <div>
      <Header />
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
                  {/* <Button color="inherit">{i18n.t('wallet.exchange')}</Button>
                  <Button color="inherit">{i18n.t('wallet.saving')}</Button> */}
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
                      {isWinner == true && (
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
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateClick}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  Create
                </Button>
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
                    <Tab label="BTC" value="btc" />
                    <Tab label="USD" value="usd" />
                  </Tabs>
                  <Box sx={{ mt: 3 }}>
                    <Typography color="textSecondary">{i18n.t('wallet.totalBalance')}</Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {currencySymbol} {displayTotal}
                    </Typography>
                    {value === 'usd' && (
                      <Typography color="textSecondary" variant="body2">
                        1 BTC = ${btcPrice.toLocaleString()}
                      </Typography>
                    )}
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
                          <Button
                            color="primary"
                            sx={{ p: 0 }}
                            onClick={isShowAddress ? handleHideAddressBitcoin : handleShowAdressBitcoin}
                          >
                            {isShowAddress ? (
                              <Box>
                                <Typography variant="body2">{bitcoinWallet}</Typography>
                                <Button
                                  color="secondary"
                                  sx={{ mt: 1 }}
                                  onClick={handleHideAddressBitcoin}
                                >
                                  Ẩn
                                </Button>
                              </Box>
                            ) : (
                              <Button
                                color="primary"
                                sx={{ p: 0 }}
                                onClick={handleShowAdressBitcoin}
                              >
                                {i18n.t('button.showAddress')}
                              </Button>
                            )}
                          </Button>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography>
                          {value === 'btc' ? 'BTC' : 'USD'}
                        </Typography>
                        <Typography color="textSecondary">
                          {value === 'btc' 
                            ? `${showtotal} BTC` 
                            : `${convertBtcToUsd(showtotal)} USD`}
                        </Typography>
                        {value === 'usd' && (
                          <Typography variant="body2" color="textSecondary">
                            @ ${btcPrice.toLocaleString()} per BTC
                          </Typography>
                        )}
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
    </div>
  );
};

export default WalletInterface;



// import {
//   AccountBalanceWallet,
//   CurrencyBitcoin,
//   DarkMode,
//   Lock,
//   Send,
//   SwapHoriz,
//   WaterDrop
// } from '@mui/icons-material';
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   IconButton,
//   Tab,
//   Tabs,
//   Typography
// } from '@mui/material';
// import { ConfigProvider, Flex, Popover } from 'antd';
// import moment from "moment";
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from '../../lang/LanguageProvider';
// import { checkWinnerPrevious, getResult } from '../../redux/result/resultSlice';
// import Header from "../layout/header";
// import ConnectWalletModal from '../page/connect';




// const WalletInterface = () => {
//   const { i18n } = useTranslation();

//   const [value, setValue] = useState('usd');
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [showtotal, setShowToTal] = useState(0);

//   const [isWinner, setIsWinner] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isShowNoticePublish, setIsShowNoticePublish] = useState(false);
//   const totalBalance = useSelector((state) => state.guessBitCoin.totalBalance);

//   const winner = useSelector((state) => state.result.result);
//   console.log("Check log bên wallet tìm người chiến thắng: ", winner);


//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const openConnectWalletModal = () => {
//     setModalOpen(true);
//   };

//   const closeConnectWalletModal = () => {
//     setModalOpen(false);
//   };

//   const handleRedirectTransaction = () => {
//     navigate('/transaction');
//   };

//   const userInfo = JSON.parse(sessionStorage.getItem('bitcoinInfo')) || {};
//   const currentUserId = userInfo?._id;

//   console.log("Check userId đang đăng nhập: ", currentUserId);

//   useEffect(() => {
//     const bitcoinInfo = sessionStorage.getItem('bitcoinInfo');

//     if (bitcoinInfo) {
//       try {
//         const parsedData = JSON.parse(bitcoinInfo);
//         const total = parsedData?.totalBalance;
//         console.log("Check totalBalance từ sessionStorage: ", total);

//         if (showtotal === 0 && total) {
//           setShowToTal(total); // Set totalBalance only if it's 0
//         }
//       } catch (error) {
//         console.error("Error parsing bitcoinInfo from sessionStorage:", error);
//       }
//     }
//   }, [showtotal]);
//   useEffect(() => {
//     if (winner && winner.winner) {
//       setNotificationCount(1);
//     }
//   }, [winner]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await dispatch(checkWinnerPrevious(currentUserId)).unwrap();

//         if (result.error == 0) {
//           setIsWinner(true);
//         } else {
//           setIsWinner(false);
//         }
//         console.log("Success: ", result);
//       } catch (error) {
//         console.error("Error: ", error);
//       }
//     };

//     if (currentUserId) {
//       fetchData();
//     }
//   }, [dispatch, currentUserId]);

//   useEffect(() => {
//     if (winner && winner.winner && currentUserId === winner.winner.winnerId) {
//       // setNotificationCount(2);
//       setNotificationCount((prevCount) => prevCount + 1);
//     }
//   }, [winner, currentUserId]);
//   const handleNotificationClick = () => {
//     setNotificationCount(0);
//   };

//   const handleJobRedirect = () => {
//     navigate('/jobchain');
//   }

//   const handleClickCongBo = () => {
//     const notice = dispatch(getResult());
//     setIsShowNoticePublish(true);
//     localStorage.setItem("isShowNoticePublish", "true");
//     console.log("Check notice winner: ", notice);
//   }

//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === "isShowNoticePublish") {
//         const value = e.newValue === "true";
//         setIsShowNoticePublish(value);
//       }
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);
//   useEffect(() => {
//     const storedValue = localStorage.getItem("isShowNoticePublish");
//     if (storedValue === "true") {
//       setIsShowNoticePublish(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (isShowNoticePublish == true) {
//       dispatch(getResult());

//       const now = new Date();
//       const endOfDay = new Date();
//       endOfDay.setHours(23, 59, 59, 999);
//       const timeLeft = endOfDay - now;

//       console.log(`Thời gian còn lại đến cuối ngày: ${timeLeft} ms`);
//       const timeout = setTimeout(() => {
//         setIsShowNoticePublish(false);
//         console.log("Thông báo đã được reset!");
//       }, timeLeft);

//       return () => clearTimeout(timeout);
//     }
//   }, [isShowNoticePublish, dispatch]);

//   console.log("Check log bên wallet lấy ra state redux: ", totalBalance);


//   //redux getresult

//   const maskWinnerId = (winnerId) => {
//     if (!winnerId) return "";
//     const visiblePart = winnerId.slice(-4);
//     const maskedPart = "*".repeat(winnerId.length - 4);
//     return `${maskedPart}${visiblePart}`;
//   };


//   const [notificationCount, setNotificationCount] = useState(0);


//   const text = <span>Thông báo <hr sx={{ width: "10px" }} /></span>;
//   // const content = (
//   //   <div style={{ height: '50px', margin: 0, padding: 0 }}>
//   //     {winner && winner.winner ?
//   //       <>
//   //         <span style={{ color: 'gray' }}>Ngày: {moment.utc(winner.winner.created_at).format("DD/MM/YYYY, HH:mm:ss")}</span>
//   //         <div style={{ display: "flex", gap: "5px", textAlign: 'justify', alignItems: 'center', justifyContent: 'flex-start' }}>
//   //           <i className="fa-solid fa-circle" style={{ color: "blue", fontSize: "5px" }}></i>

//   //           <div div className='content-notice'>
//   //             Chúc mừng người dùng {maskWinnerId(`${winner.winner.winnerId}`)} chiến thắng
//   //           </div>
//   //         </div>
//   //       </>
//   //       :
//   //       <div div className='content-notice'>
//   //         Hiện chưa có thông báo mới
//   //       </div>
//   //     }

//   //   </div >

//   // );


//   const content = (
//     <div style={{ margin: 0, padding: '10px', height: 'auto' }}>
//       {winner && winner.winner ? (
//         <>
//           <div style={{ marginBottom: '10px' }}>
//             <span style={{ color: 'gray', fontSize: '14px' }}>
//               Ngày: {moment.utc(winner.winner.created_at).format('DD/MM/YYYY, HH:mm:ss')}
//             </span>
//           </div>
//           <div
//             style={{
//               display: 'flex',
//               gap: '10px',
//               textAlign: 'left',
//               alignItems: 'center',
//               justifyContent: 'flex-start',
//               marginBottom: '15px',
//             }}
//           >
//             <i className="fa-solid fa-circle" style={{ color: 'blue', fontSize: '8px' }}></i>
//             <div className="content-notice" style={{ fontSize: '14px' }}>
//               Chúc mừng người dùng {maskWinnerId(`${winner.winner.winnerId}`)} chiến thắng
//             </div>
//           </div>

//           {currentUserId === winner.winner.winnerId && (
//             <div
//               style={{
//                 display: 'flex',
//                 gap: '10px',
//                 textAlign: 'left',
//                 alignItems: 'center',
//                 justifyContent: 'flex-start',
//                 marginTop: '20px',
//                 paddingTop: '10px',
//                 borderTop: '1px solid #eee',
//               }}
//             >
//               <i className="fa-solid fa-circle" style={{ color: 'green', fontSize: '8px' }}></i>
//               <div className="content-notice" style={{ fontSize: '14px' }}>
//                 Chúc mừng bạn nhận được job!
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ marginLeft: '5px', padding: '5px 15px', fontSize: '12px' }}
//                   onClick={handleJobRedirect}
//                 >
//                   Xem Job
//                 </Button>
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="content-notice" style={{ fontSize: '14px', color: 'gray' }}>
//           Hiện chưa có thông báo mới
//         </div>
//       )}
//     </div>

//   );
//   const buttonWidth = 80;


//   const handleCreateClick = () => {
//     navigate('/create');  // Điều hướng đến trang Create
//   };


//   return (
//     <div>
//       <Header />
//       <Box sx={{ minHeight: '100vh' }}>
//         {/* Navigation Bar */}
//         <AppBar position="static" color="transparent" elevation={0}>
//           <Container>
//             <Box sx={{ display: 'flex', alignItems: 'center', py: 2, justifyContent: 'space-between' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//                 <Typography variant="h6" sx={{ color: '#6c5ce7' }}>◆</Typography>
//                 <Box sx={{ display: 'flex', gap: 2 }}>
//                   <Button color="primary">{i18n.t('wallet.wallet')}</Button>
//                   <Button color="inherit" onClick={handleRedirectTransaction}>
//                     {i18n.t('wallet.transaction')}
//                   </Button>
//                   <Button color="inherit">{i18n.t('wallet.exchange')}</Button>
//                   <Button color="inherit">{i18n.t('wallet.saving')}</Button>
//                 </Box>
//               </Box>
//               <Box>
//                 <ConfigProvider
//                   button={{
//                     style: {
//                       width: buttonWidth,
//                       margin: 4,
//                     },
//                   }}
//                 >
//                   <Flex vertical justify="center" align="center" className="demo">
//                     <Flex
//                       style={{
//                         width: buttonWidth * 5 + 32,
//                       }}
//                       justify="space-between"
//                       align="center"
//                     >
//                     </Flex>
//                     <Flex
//                       justify="center"
//                       align="center"
//                       style={{
//                         whiteSpace: 'nowrap',
//                       }}
//                     >
//                       {/* <Popover placement="bottom" title={text} content={content}>
//                       <i className="fa-solid fa-bell" style={{ color: "white", fontSize: "20px" }}></i>
//                     </Popover> */}
//                       <Popover
//                         placement="bottom"
//                         title={text}
//                         content={content}
//                       // Xử lý khi click
//                       >
//                         <Box sx={{ position: 'relative', display: 'inline-block' }}>
//                           <i className="fa-solid fa-bell" style={{ color: "white", fontSize: "20px", cursor: "pointer" }} onMouseEnter={handleNotificationClick}></i>
//                           {notificationCount > 0 && (
//                             <Box
//                               sx={{
//                                 position: 'absolute',
//                                 top: '-8px',
//                                 right: '-8px',
//                                 backgroundColor: 'red',
//                                 borderRadius: '50%',
//                                 width: '18px',
//                                 height: '18px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 color: 'white',
//                                 fontSize: '12px',
//                                 fontWeight: 'bold',
//                               }}
//                             >
//                               {notificationCount}
//                             </Box>
//                           )}
//                         </Box>
//                       </Popover>

//                       {/* Thêm nút công bố nếu người dùng là người chiến thắng hôm qua */}
//                       {isWinner && (
//                         <Button variant="contained" color="primary" onClick={handleClickCongBo}>
//                           Công bố
//                         </Button>
//                       )}

//                     </Flex>
//                   </Flex>
//                 </ConfigProvider>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 <ConnectWalletModal open={isModalOpen} onClose={closeConnectWalletModal} />
//                 <IconButton>
//                   <DarkMode />
//                 </IconButton>
//               </Box>
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleCreateClick}
//                   sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//                 >
//                   Create
//                 </Button>
//               </Box>
//             </Box>
//           </Container>
//         </AppBar>

//         <Container sx={{ mt: 4 }}>
//           <Grid container spacing={3}>
//             {/* Balance Card */}
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Tabs value={value} onChange={handleChange}>
//                     <Tab label="USD" value="usd" />
//                     <Tab label="BTC" value="btc" />
//                   </Tabs>
//                   <Box sx={{ mt: 3 }}>
//                     <Typography color="textSecondary">{i18n.t('wallet.totalBalance')}</Typography>
//                     <Typography variant="h4" sx={{ mt: 1 }}>₿ {showtotal}</Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
//                     <Button variant="contained" color="primary" startIcon={<AccountBalanceWallet />} fullWidth>
//                       {i18n.t('button.deposit')}
//                     </Button>
//                     <Button variant="outlined" startIcon={<Send />} fullWidth>
//                       {i18n.t('button.send')}
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Right Section */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="h5" gutterBottom>{i18n.t('wallet.forYou')}</Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={4}>
//                   <Card sx={{ bgcolor: '#6c5ce7', color: '#ddd', height: '100%', textAlign: 'justify' }}>
//                     <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                       <Lock sx={{ fontSize: 40, mb: 2 }} />
//                       <Typography>{i18n.t('wallet.backupWallet')}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <Card sx={{ bgcolor: '#2d3436', color: 'white', height: '100%', textAlign: 'justify' }}>
//                     <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                       <WaterDrop sx={{ fontSize: 40, mb: 2 }} />
//                       <Typography>{i18n.t('wallet.provideDex')}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <Card sx={{ bgcolor: '#000000', color: 'white', height: '100%', textAlign: 'justify' }}>
//                     <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                       <SwapHoriz sx={{ fontSize: 40, mb: 2 }} />
//                       <Typography>{i18n.t('wallet.tradeSwap')}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Grid>

//               {/* Assets Section */}
//               <Box sx={{ mt: 4 }}>
//                 <Typography variant="h5" gutterBottom>{i18n.t('wallet.yourAsset')}</Typography>
//                 <Typography color="textSecondary" gutterBottom>
//                   Here you can safely store, send and receive assets
//                 </Typography>

//                 <Card>
//                   <CardContent>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <CurrencyBitcoin sx={{ color: '#f39c12', fontSize: 32 }} />
//                         <Box>
//                           <Typography variant="body1">Bitcoin</Typography>
//                           <Button color="primary" sx={{ p: 0 }}>{i18n.t('button.showAddress')}</Button>
//                         </Box>
//                       </Box>
//                       <Box sx={{ textAlign: 'right' }}>
//                         <Typography> BTC</Typography>
//                         <Typography color="textSecondary">0 USD</Typography>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>

//                 <Button color="primary" fullWidth sx={{ mt: 2 }}>
//                   {i18n.t('button.addCustomToken')}
//                 </Button>
//                 <Button color="primary" fullWidth sx={{ mt: 1 }}>
//                   {i18n.t('button.addCurrency')}
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </div>
//   );
// };

// export default WalletInterface;

//rs

//test thui nè
// import {
//   AccountBalanceWallet,
//   CurrencyBitcoin,
//   DarkMode,
//   Lock,
//   Send,
//   SwapHoriz,
//   WaterDrop
// } from '@mui/icons-material';
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   IconButton,
//   Tab,
//   Tabs,
//   Typography
// } from '@mui/material';
// import { ConfigProvider, Flex, Popover } from 'antd';
// import moment from "moment";
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from '../../lang/LanguageProvider';
// import { checkWinnerPrevious, getResult } from '../../redux/result/resultSlice';
// import Header from "../layout/header";
// import ConnectWalletModal from '../page/connect';
// import Cookies from 'js-cookie';

// const WalletInterface = () => {
//   const { i18n } = useTranslation();

//   const [value, setValue] = useState('usd');
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [showtotal, setShowToTal] = useState(0);

//   const [isWinner, setIsWinner] = useState(false);
//   const [isShowAddress, setIsShowAddress] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isShowNoticePublish, setIsShowNoticePublish] = useState(false);
//   const totalBalance = useSelector((state) => state.guessBitCoin.totalBalance);

//   const winner = useSelector((state) => state.result.result);
//   console.log("Check log bên wallet tìm người chiến thắng: ", winner);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const openConnectWalletModal = () => {
//     setModalOpen(true);
//   };

//   const closeConnectWalletModal = () => {
//     setModalOpen(false);
//   };

//   const handleRedirectTransaction = () => {
//     navigate('/transaction');
//   };

//   const userInfo = JSON.parse(sessionStorage.getItem('bitcoinInfo')) || {};
//   const currentUserId = userInfo?._id;

//   const bitcoinWallet = userInfo?.bitcoin_wallet;

//   console.log("Check userId đang đăng nhập: ", currentUserId);

//   useEffect(() => {
//     const bitcoinInfo = sessionStorage.getItem('bitcoinInfo');

//     if (bitcoinInfo) {
//       try {
//         const parsedData = JSON.parse(bitcoinInfo);
//         const total = parsedData?.totalBalance;
//         console.log("Check totalBalance từ sessionStorage: ", total);

//         if (showtotal === 0 && total) {
//           setShowToTal(total); // Set totalBalance only if it's 0
//         }
//       } catch (error) {
//         console.error("Error parsing bitcoinInfo from sessionStorage:", error);
//       }
//     }
//   }, [showtotal]);
//   //gốc
//   useEffect(() => {
//     if (winner && winner.winner) {
//       setNotificationCount(1);
//       const winnerId = winner.winner.winnerId;
//       // Lưu thông báo vào cookie (có thể là chuỗi hoặc số)
//       Cookies.set('isShowNoticePublish', 'true', { expires: 1, path: '/', domain: "doanweb3.netlify.app", secure: true }); // Cookie sẽ hết hạn sau 1 ngày
//       Cookies.set('winnerId', winnerId, { expires: 1, path: '/', domain: "doanweb3.netlify.app", secure: true });
//     }
//   }, [winner]);


//   useEffect(() => {
//     // Kiểm tra xem có thông báo mới không khi page được tải lại
//     const isShowNoticePublishCookie = Cookies.get('isShowNoticePublish');
//     if (isShowNoticePublishCookie === 'true') {
//       setIsShowNoticePublish(true);
//     }
//   }, []);



//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await dispatch(checkWinnerPrevious(currentUserId)).unwrap();

//         if (result.error == 0) {
//           setIsWinner(true);
//         } else {
//           setIsWinner(false);
//         }
//         console.log("Success: ", result);
//       } catch (error) {
//         console.error("Error: ", error);
//       }
//     };

//     if (currentUserId) {
//       fetchData();
//     }
//   }, [dispatch, currentUserId]);

//   useEffect(() => {
//     if (winner && winner.winner && currentUserId === winner.winner.winnerId) {
//       // setNotificationCount(2);
//       setNotificationCount((prevCount) => prevCount + 1);
//     }
//   }, [winner, currentUserId]);
//   const handleNotificationClick = () => {
//     setNotificationCount(0);
//   };


//   useEffect(() => {
//     const handleCookieChange = () => {
//       const storedValue = Cookies.get('isShowNoticePublish');
//       if (storedValue === 'true') {
//         setIsShowNoticePublish(true);
//       }
//     };

//     handleCookieChange();
//   }, []);


//   const handleJobRedirect = () => {
//     navigate('/jobchain');
//   }

//   const handleClickCongBo = () => {
//     const notice = dispatch(getResult());
//     setIsShowNoticePublish(true);
//     Cookies.set("isShowNoticePublish", "true", { expires: 1, path: '/', domain: "doanweb3.netlify.app" }); // Cookie hết hạn sau 1 ngày

//     console.log("Check notice winner: ", notice);
//   }

//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === "isShowNoticePublish") {
//         const value = e.newValue === "true";
//         setIsShowNoticePublish(value);
//       }
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);
//   // useEffect(() => {
//   //   const storedValue = localStorage.getItem("isShowNoticePublish");
//   //   if (storedValue === "true") {
//   //     setIsShowNoticePublish(true);
//   //   }
//   // }, []);


//   useEffect(() => {
//     if (isShowNoticePublish === true) {
//       dispatch(getResult());

//       const now = new Date();
//       const endOfDay = new Date();
//       endOfDay.setHours(23, 59, 59, 999); // Hết ngày
//       const timeLeft = endOfDay - now;

//       const timeout = setTimeout(() => {
//         setIsShowNoticePublish(false);
//         Cookies.remove('isShowNoticePublish');
//         Cookies.remove('winnerId');
//         console.log("Thông báo đã được reset!");
//       }, timeLeft);

//       return () => clearTimeout(timeout);
//     }
//   }, [isShowNoticePublish, dispatch]);


//   console.log("Check log bên wallet lấy ra state redux: ", totalBalance);


//   //redux getresult

//   const maskWinnerId = (winnerId) => {
//     if (!winnerId) return "";
//     const visiblePart = winnerId.slice(-4);
//     const maskedPart = "*".repeat(winnerId.length - 4);
//     return `${maskedPart}${visiblePart}`;
//   };


//   const [notificationCount, setNotificationCount] = useState(0);


//   const text = <span>Thông báo <hr sx={{ width: "10px" }} /></span>;


//   const content = (
//     <div style={{ margin: 0, padding: '10px', height: 'auto' }}>
//       {winner && winner.winner ? (
//         <>
//           <div style={{ marginBottom: '10px' }}>
//             <span style={{ color: 'gray', fontSize: '14px' }}>
//               Ngày: {moment.utc(winner.winner.created_at).format('DD/MM/YYYY, HH:mm:ss')}
//             </span>
//           </div>
//           <div
//             style={{
//               display: 'flex',
//               gap: '10px',
//               textAlign: 'left',
//               alignItems: 'center',
//               justifyContent: 'flex-start',
//               marginBottom: '15px',
//             }}
//           >
//             <i className="fa-solid fa-circle" style={{ color: 'blue', fontSize: '8px' }}></i>
//             <div className="content-notice" style={{ fontSize: '14px' }}>
//               Chúc mừng người dùng {maskWinnerId(`${winner.winner.winnerId}`)} chiến thắng
//             </div>
//           </div>

//           {currentUserId === winner.winner.winnerId && (
//             <div
//               style={{
//                 display: 'flex',
//                 gap: '10px',
//                 textAlign: 'left',
//                 alignItems: 'center',
//                 justifyContent: 'flex-start',
//                 marginTop: '20px',
//                 paddingTop: '10px',
//                 borderTop: '1px solid #eee',
//               }}
//             >
//               <i className="fa-solid fa-circle" style={{ color: 'green', fontSize: '8px' }}></i>
//               <div className="content-notice" style={{ fontSize: '14px' }}>
//                 Chúc mừng bạn nhận được job!
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ marginLeft: '5px', padding: '5px 15px', fontSize: '12px' }}
//                   onClick={handleJobRedirect}
//                 >
//                   Xem Job
//                 </Button>
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="content-notice" style={{ fontSize: '14px', color: 'gray' }}>
//           Hiện chưa có thông báo mới
//         </div>
//       )}
//     </div>

//   );
//   const buttonWidth = 80;
//   const handleCreateClick = () => {
//     navigate('/create');
//   };
//   const handleShowAdressBitcoin = () => {
//     setIsShowAddress(true);
//   };
//   const handleHideAddressBitcoin = () => {
//     setIsShowAddress(false);
//   }
//   return (
//     <div>
//       <Header />
//       <Box sx={{ minHeight: '100vh' }}>
//         {/* Navigation Bar */}
//         <AppBar position="static" color="transparent" elevation={0}>
//           <Container>
//             <Box sx={{ display: 'flex', alignItems: 'center', py: 2, justifyContent: 'space-between' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//                 <Typography variant="h6" sx={{ color: '#6c5ce7' }}>◆</Typography>
//                 <Box sx={{ display: 'flex', gap: 2 }}>
//                   <Button color="primary">{i18n.t('wallet.wallet')}</Button>
//                   <Button color="inherit" onClick={handleRedirectTransaction}>
//                     {i18n.t('wallet.transaction')}
//                   </Button>
//                   {/* <Button color="inherit">{i18n.t('wallet.exchange')}</Button>
//                   <Button color="inherit">{i18n.t('wallet.saving')}</Button> */}
//                 </Box>
//               </Box>
//               <Box>
//                 <ConfigProvider
//                   button={{
//                     style: {
//                       width: buttonWidth,
//                       margin: 4,
//                     },
//                   }}
//                 >
//                   <Flex vertical justify="center" align="center" className="demo">
//                     <Flex
//                       style={{
//                         width: buttonWidth * 5 + 32,
//                       }}
//                       justify="space-between"
//                       align="center"
//                     >
//                     </Flex>
//                     <Flex
//                       justify="center"
//                       align="center"
//                       style={{
//                         whiteSpace: 'nowrap',
//                       }}
//                     >
//                       {/* <Popover placement="bottom" title={text} content={content}>
//                       <i className="fa-solid fa-bell" style={{ color: "white", fontSize: "20px" }}></i>
//                     </Popover> */}
//                       <Popover
//                         placement="bottom"
//                         title={text}
//                         content={content}
//                       // Xử lý khi click
//                       >
//                         <Box sx={{ position: 'relative', display: 'inline-block' }}>
//                           <i className="fa-solid fa-bell" style={{ color: "white", fontSize: "20px", cursor: "pointer" }} onMouseEnter={handleNotificationClick}></i>
//                           {notificationCount > 0 && (
//                             <Box
//                               sx={{
//                                 position: 'absolute',
//                                 top: '-8px',
//                                 right: '-8px',
//                                 backgroundColor: 'red',
//                                 borderRadius: '50%',
//                                 width: '18px',
//                                 height: '18px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 color: 'white',
//                                 fontSize: '12px',
//                                 fontWeight: 'bold',
//                               }}
//                             >
//                               {notificationCount}
//                             </Box>
//                           )}
//                         </Box>
//                       </Popover>

//                       {/* Thêm nút công bố nếu người dùng là người chiến thắng hôm qua */}
//                       {isWinner == true && (
//                         <Button variant="contained" color="primary" onClick={handleClickCongBo}>
//                           Công bố
//                         </Button>
//                       )}

//                     </Flex>
//                   </Flex>
//                 </ConfigProvider>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 <ConnectWalletModal open={isModalOpen} onClose={closeConnectWalletModal} />
//                 <IconButton>
//                   <DarkMode />
//                 </IconButton>
//               </Box>
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleCreateClick}
//                   sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//                 >
//                   Create
//                 </Button>
//               </Box>
//             </Box>
//           </Container>
//         </AppBar>

//         <Container sx={{ mt: 4 }}>
//           <Grid container spacing={3}>
//             {/* Balance Card */}
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Tabs value={value} onChange={handleChange}>
//                     <Tab label="USD" value="usd" />
//                     <Tab label="BTC" value="btc" />
//                   </Tabs>
//                   <Box sx={{ mt: 3 }}>
//                     <Typography color="textSecondary">{i18n.t('wallet.totalBalance')}</Typography>
//                     <Typography variant="h4" sx={{ mt: 1 }}>₿ {showtotal}</Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
//                     <Button variant="contained" color="primary" startIcon={<AccountBalanceWallet />} fullWidth>
//                       {i18n.t('button.deposit')}
//                     </Button>
//                     <Button variant="outlined" startIcon={<Send />} fullWidth>
//                       {i18n.t('button.send')}
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Right Section */}
//             <Grid item xs={12} md={6}>
//               {/* <Typography variant="h5" gutterBottom>{i18n.t('wallet.forYou')}</Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={4}>
//                   <Card sx={{ bgcolor: '#6c5ce7', color: '#ddd', height: '100%', textAlign: 'justify' }}>
//                     <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                       <Lock sx={{ fontSize: 40, mb: 2 }} />
//                       <Typography>{i18n.t('wallet.backupWallet')}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <Card sx={{ bgcolor: '#2d3436', color: 'white', height: '100%', textAlign: 'justify' }}>
//                     <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                       <WaterDrop sx={{ fontSize: 40, mb: 2 }} />
//                       <Typography>{i18n.t('wallet.provideDex')}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <Card sx={{ bgcolor: '#000000', color: 'white', height: '100%', textAlign: 'justify' }}>
//                     <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                       <SwapHoriz sx={{ fontSize: 40, mb: 2 }} />
//                       <Typography>{i18n.t('wallet.tradeSwap')}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Grid> */}

//               {/* Assets Section */}
//               <Box sx={{ mt: 4 }}>
//                 <Typography variant="h5" gutterBottom>{i18n.t('wallet.yourAsset')}</Typography>
//                 <Typography color="textSecondary" gutterBottom>
//                   Here you can safely store, send and receive assets
//                 </Typography>

//                 <Card>
//                   <CardContent>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <CurrencyBitcoin sx={{ color: '#f39c12', fontSize: 32 }} />
//                         <Box>
//                           <Typography variant="body1">Bitcoin</Typography>
//                           {/* {isShowAddress == true ?
//                             <Button color="primary" sx={{ p: 0 }}
//                               onClick={handleShowAdressBitcoin()}
//                             >{bitcoinWallet}</Button>
//                             :
//                             <Button color="primary" sx={{ p: 0 }}
//                               onClick={handleShowAdressBitcoin()}
//                             >{i18n.t('button.showAddress')}</Button>
//                           }

//                           <Button color="primary" sx={{ p: 0 }}

//                           >{i18n.t('button.showAddress')}</Button> */}

//                           <Button
//                             color="primary"
//                             sx={{ p: 0 }}
//                             onClick={isShowAddress ? handleHideAddressBitcoin : handleShowAdressBitcoin}
//                           >
//                             {isShowAddress ? (
//                               <Box>
//                                 <Typography variant="body2">{bitcoinWallet}</Typography>
//                                 <Button
//                                   color="secondary"
//                                   sx={{ mt: 1 }}
//                                   onClick={handleHideAddressBitcoin}
//                                 >
//                                   Ẩn
//                                 </Button>
//                               </Box>
//                             ) : (
//                               <Button
//                                 color="primary"
//                                 sx={{ p: 0 }}
//                                 onClick={handleShowAdressBitcoin}
//                               >
//                                 {i18n.t('button.showAddress')}
//                               </Button>
//                             )}
//                           </Button>

//                         </Box>
//                       </Box>
//                       <Box sx={{ textAlign: 'right' }}>
//                         <Typography> BTC</Typography>
//                         <Typography color="textSecondary">0 USD</Typography>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>

//                 <Button color="primary" fullWidth sx={{ mt: 2 }}>
//                   {i18n.t('button.addCustomToken')}
//                 </Button>
//                 <Button color="primary" fullWidth sx={{ mt: 1 }}>
//                   {i18n.t('button.addCurrency')}
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </div>
//   );
// };

// export default WalletInterface;




