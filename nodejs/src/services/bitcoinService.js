require("dotenv").config();
const GuessBitcoin = require("../models/guess_bitcoin");
const Result = require("../models/result");
const Reward = require("../models/reward");

// const handleguessBitcoinService = async (guessData) => {
//     try {
//         const guess = new GuessBitcoin(guessData);
//         if (guess.bitcoin > guess.totalBalance) {
//             return { message: "Số dư không đủ. Vui lòng nhập số nhỏ hơn hoặc bằng số dư bạn đang có!" };
//         }
//         await guess.save();
//         return { message: "Dự đoán đã được lưu!" };

//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// };


// const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
//     try {
//         const results = await GuessBitcoin.aggregate([
//             {
//                 $addFields: {
//                     deviation: {
//                         $abs: {
//                             $subtract: ["$predicted_price", actualPrice],
//                         },
//                     },
//                     actualPrice
//                 },
//             },
//             {
//                 $match: {
//                     deviation: { $lte: deviationThreshold },
//                 },
//             },
//             {
//                 $sort: { deviation: 1 },
//             },
//             {
//                 $limit: limit,
//             },
//         ]);
//         console.log('Check winner: ', results[0])
//         const saveResult = new Result({
//             winnerId: results[0]._id,
//             deviation: results[0].deviation,
//             actualPrice: actualPrice,
//             datePredicted: results[0].created_attoLocaleString("en-GB", { timeZone: "Asia/Bangkok", hour12: false })
//         });

//         await saveResult.save();
//         console.log('Check winner lưu vào database: ', saveResult)
//         return results.length > 0 ? results[0] : "không tìm thấy người chiến thắng";
//     } catch (error) {
//         throw new Error("Lỗi khi tính toán kết quả!");
//     }
// };

//tự code

// const handleguessBitcoinService = async (guessData) => {
//     try {
//         const filter = {
//             bank_account: guessData.bank_account,
//             bitcoin_wallet: guessData.bitcoin_wallet,
//         };

//         const existingRecord = await GuessBitcoin.findOne(filter);

//         if (existingRecord) {
//             if (existingRecord.bitcoin == 0 &&
//                 existingRecord.predicted_price == 0) {

//                 existingRecord.bitcoin = guessData.bitcoin;
//                 existingRecord.predicted_price = guessData.predicted_price;
//                 if (existingRecord.bitcoin > existingRecord.totalBalance) {
//                     return {
//                         error: 2,
//                         message: "Số dư không đủ",
//                         dulieucu: existingRecord,
//                         dulieumoi: guessData
//                     }
//                 }
//                 existingRecord.totalBalance -= existingRecord.bitcoin;
//                 return {
//                     message: "Cập nhật thành công",
//                     dulieucu: existingRecord,
//                     dulieumoi: guessData
//                 }
//             }
//         } else {
//             const randomtotalBalance =
//                 Math.floor(Math.random() * (9000000000 - 10000 + 1)) + 10000;

//             const newGuess = new GuessBitcoin({
//                 ...guessData,
//                 totalBalance: randomtotalBalance,
//             });

//             await newGuess.save();

//             return {
//                 message: "Kết nối ví thành công!",
//                 totalBalance: randomtotalBalance,
//                 data: newGuess
//             };
//         }
//     } catch (error) {
//         console.log("Check error handleguessBitcoinService:", error);
//         throw new Error("Đã xảy ra lỗi trong quá trình xử lý!");
//     }
// };


//code ap
// const handleguessBitcoinService = async (guessData) => {
//     try {
//         const filter = {
//             bank_account: guessData.bank_account,
//             bitcoin_wallet: guessData.bitcoin_wallet,
//         };

//         const existingRecord = await GuessBitcoin.findOne(filter);

//         if (existingRecord) {
//             // So sánh tất cả các trường

//             const isDuplicate =
//                 Number(existingRecord.bitcoin) === Number(guessData.bitcoin) &&
//                 Number(existingRecord.predicted_price) === Number(guessData.predicted_price) &&
//                 existingRecord.bank_account === guessData.bank_account &&
//                 existingRecord.bitcoin_wallet === guessData.bitcoin_wallet;

//             if (isDuplicate) {
//                 return {
//                     error: 1,
//                     message: "Dữ liệu đã tồn tại",
//                     dulieucu: existingRecord,
//                     dulieumoi: guessData
//                 };
//             } else {
//                 // Nếu dữ liệu không khớp, tiếp tục xử lý cập nhật
//                 if ((existingRecord.bitcoin == 0 && existingRecord.predicted_price == 0) ||
//                     Number(existingRecord.bitcoin) !== Number(guessData.bitcoin) || Number(existingRecord.predicted_price) !== Number(guessData.predicted_price)) {
//                     existingRecord.bitcoin = Number(guessData.bitcoin);
//                     existingRecord.predicted_price = Number(guessData.predicted_price);

//                     if (existingRecord.bitcoin > existingRecord.totalBalance) {
//                         return {
//                             error: 2,
//                             message: "Số dư không đủ",
//                             dulieucu: existingRecord,
//                             dulieumoi: guessData
//                         };
//                     }

//                     existingRecord.totalBalance -= existingRecord.bitcoin;
//                     await existingRecord.save();

//                     return {
//                         message: "Cập nhật thành công",
//                         dulieucu: existingRecord,
//                         dulieumoi: guessData
//                     };
//                 }
//             }
//             // return {
//             //     error: 3,
//             //     message: "Đã kết nối ví",
//             //     totalBalance: existingRecord.totalBalance,
//             //     dulieumoi: guessData
//             // }

//         } else {
//             // Trường hợp không tìm thấy bản ghi, tạo mới
//             const randomtotalBalance =
//                 Math.floor(Math.random() * (9000000000 - 10000 + 1)) + 10000;

//             const newGuess = new GuessBitcoin({
//                 ...guessData,
//                 totalBalance: randomtotalBalance,
//             });

//             await newGuess.save();

//             return {
//                 message: "Kết nối ví thành công!",
//                 totalBalance: randomtotalBalance,
//                 data: newGuess
//             };
//         }
//     } catch (error) {
//         console.log("Check error handleguessBitcoinService:", error);
//     }
// };


//rs

// const handleguessBitcoinService = async (guessData) => {
//     try {
//         // Lọc theo `bitcoin_wallet` và `bank_account`
//         const filter = {
//             bank_account: guessData.bank_account,
//             bitcoin_wallet: guessData.bitcoin_wallet,
//         };

//         // Tìm bản ghi dựa trên `filter`
//         const existingRecord = await GuessBitcoin.findOne(filter);

//         if (existingRecord) {
//             // Trả về `totalBalance` nếu bản ghi đã tồn tại
//             if (!guessData.bitcoin && !guessData.predicted_price) {
//                 return {
//                     message: "Bản ghi đã tồn tại",
//                     totalBalance: existingRecord.totalBalance,
//                     data: existingRecord,
//                 };
//             }

//             // Nếu có thêm các giá trị khác, tiếp tục xử lý
//             const bitcoin = Number(guessData.bitcoin);
//             const predictedPrice = Number(guessData.predicted_price);

//             if (isNaN(bitcoin) || isNaN(predictedPrice)) {
//                 return {
//                     error: 400,
//                     message: "Giá trị bitcoin hoặc predicted_price không hợp lệ",
//                     dulieumoi: guessData,
//                 };
//             }

//             // Kiểm tra dữ liệu có trùng lặp không
//             const isDuplicate =
//                 existingRecord.bitcoin === bitcoin &&
//                 existingRecord.predicted_price === predictedPrice;

//             if (isDuplicate) {
//                 return {
//                     error: 1,
//                     message: "Dữ liệu đã tồn tại",
//                     dulieucu: existingRecord,
//                     dulieumoi: guessData,
//                 };
//             } else {
//                 // Cập nhật nếu dữ liệu khác nhau
//                 if (
//                     (existingRecord.bitcoin === 0 && existingRecord.predicted_price === 0) ||
//                     existingRecord.bitcoin !== bitcoin ||
//                     existingRecord.predicted_price !== predictedPrice
//                 ) {
//                     existingRecord.bitcoin = bitcoin;
//                     existingRecord.predicted_price = predictedPrice;

//                     if (bitcoin > existingRecord.totalBalance) {
//                         return {
//                             error: 2,
//                             message: "Số dư không đủ",
//                             dulieucu: existingRecord,
//                             dulieumoi: guessData,
//                         };
//                     }

//                     existingRecord.totalBalance -= bitcoin;
//                     await existingRecord.save();

//                     return {
//                         message: "Cập nhật thành công",
//                         dulieucu: existingRecord,
//                         dulieumoi: guessData,
//                     };
//                 }
//             }
//         } else {
//             // Nếu không tìm thấy bản ghi, tạo mới
//             const randomTotalBalance =
//                 Math.floor(Math.random() * (9000000000 - 10000 + 1)) + 10000;

//             const bitcoin = Number(guessData.bitcoin || 0);
//             const predictedPrice = Number(guessData.predicted_price || 0);

//             const newGuess = new GuessBitcoin({
//                 ...guessData,
//                 bitcoin: bitcoin,
//                 predicted_price: predictedPrice,
//                 totalBalance: randomTotalBalance,
//             });

//             await newGuess.save();

//             return {
//                 message: "Tạo mới thành công",
//                 totalBalance: randomTotalBalance,
//                 data: newGuess,
//             };
//         }
//     } catch (error) {
//         console.log("Check error handleguessBitcoinService:", error);
//         return { error: 500, message: "Internal Server Error" };
//     }
// };



//rs cuối

// const handleguessBitcoinService = async (guessData) => {
//     try {
//         // Lọc theo `bitcoin_wallet` và `bank_account`
//         const filter = {
//             bank_account: guessData.bank_account,
//             bitcoin_wallet: guessData.bitcoin_wallet,
//         };

//         // Tìm bản ghi dựa trên `filter`
//         const existingRecord = await GuessBitcoin.findOne(filter);

//         if (existingRecord) {
//             if (!guessData.bitcoin && !guessData.predicted_price) {
//                 return {
//                     message: "Ví đã kết nối",
//                     totalBalance: existingRecord.totalBalance,
//                     data: existingRecord,
//                 };
//             }
//             const bitcoin = Number(guessData.bitcoin);
//             const predictedPrice = Number(guessData.predicted_price);

//             if (isNaN(bitcoin) || isNaN(predictedPrice)) {
//                 return {
//                     error: 400,
//                     message: "Giá trị bitcoin hoặc predicted_price không hợp lệ",
//                     dulieumoi: guessData,
//                 };
//             }

//             const isDuplicate =
//                 existingRecord.bitcoin === bitcoin &&
//                 existingRecord.predicted_price === predictedPrice;

//             if (isDuplicate) {
//                 return {
//                     error: 1,
//                     message: "Dữ liệu đã tồn tại",
//                     data: existingRecord,
//                     dulieumoi: guessData,
//                 };
//             } else {
//                 if (
//                     (existingRecord.bitcoin === 0 && existingRecord.predicted_price === 0) ||
//                     existingRecord.bitcoin !== bitcoin ||
//                     existingRecord.predicted_price !== predictedPrice
//                 ) {
//                     if (bitcoin > existingRecord.totalBalance) {
//                         return {
//                             error: 2,
//                             message: "Số dư không đủ",
//                             dulieucu: existingRecord,
//                             dulieumoi: guessData,
//                         };
//                     }
//                     existingRecord.bitcoin = bitcoin;
//                     existingRecord.predicted_price = predictedPrice;

//                     existingRecord.totalBalance -= bitcoin;
//                     await existingRecord.save();

//                     return {
//                         message: "Cập nhật thành công",
//                         data: existingRecord,
//                         dulieumoi: guessData,
//                     };
//                 }
//             }
//         } else {
//             const randomTotalBalance =
//                 Math.floor(Math.random() * (9000000000 - 10000 + 1)) + 10000;

//             const bitcoin = Number(guessData.bitcoin || 0);
//             const predictedPrice = Number(guessData.predicted_price || 0);

//             const newGuess = new GuessBitcoin({
//                 ...guessData,
//                 bitcoin: bitcoin,
//                 predicted_price: predictedPrice,
//                 totalBalance: randomTotalBalance,
//             });

//             await newGuess.save();

//             return {
//                 message: "Tạo mới thành công",
//                 totalBalance: randomTotalBalance,
//                 data: newGuess,
//             };
//         }
//     } catch (error) {
//         console.log("Check error handleguessBitcoinService:", error);
//         return { error: 500, message: "Internal Server Error" };
//     }
// };




const handleguessBitcoinService = async (guessData) => {
    try {
        // Lọc theo `bitcoin_wallet` và `bank_account`
        const filter = {
            bank_account: guessData.bank_account,
            bitcoin_wallet: guessData.bitcoin_wallet,
        };

        // Tìm bản ghi dựa trên `filter`
        const existingRecord = await GuessBitcoin.findOne(filter);

        if (existingRecord) {
            // Kiểm tra trường hợp không thay đổi giá trị bitcoin và predicted_price
            if (!guessData.bitcoin && !guessData.predicted_price) {
                return {
                    message: "Ví đã kết nối",
                    totalBalance: existingRecord.totalBalance,
                    data: existingRecord,
                };
            }

            const bitcoin = Number(guessData.bitcoin);
            const predictedPrice = Number(guessData.predicted_price);

            // Kiểm tra tính hợp lệ của giá trị bitcoin và predicted_price
            if (isNaN(bitcoin) || isNaN(predictedPrice)) {
                return {
                    error: 400,
                    message: "Giá trị bitcoin hoặc predicted_price không hợp lệ",
                    dulieumoi: guessData,
                };
            }

            const isDuplicate =
                existingRecord.bitcoin === bitcoin &&
                existingRecord.predicted_price === predictedPrice;

            // Kiểm tra dữ liệu có trùng hay không
            if (isDuplicate) {
                return {
                    error: 1,
                    message: "Dữ liệu đã tồn tại",
                    data: existingRecord,
                    dulieumoi: guessData,
                };
            } else {
                // Kiểm tra và cập nhật dữ liệu nếu cần
                if (
                    (existingRecord.bitcoin === 0 && existingRecord.predicted_price === 0) ||
                    existingRecord.bitcoin !== bitcoin ||
                    existingRecord.predicted_price !== predictedPrice
                ) {
                    if (bitcoin > existingRecord.totalBalance) {
                        return {
                            error: 2,
                            message: "Số dư không đủ",
                            data: existingRecord,
                            dulieumoi: guessData,
                        };
                    }

                    // Cập nhật số bitcoin, cộng dồn giá trị bitcoin mới vào giá trị cũ
                    existingRecord.bitcoin += bitcoin;  // Cộng thêm số bitcoin vào

                    existingRecord.predicted_price = predictedPrice;

                    // Trừ đi số dư tổng của ví
                    existingRecord.totalBalance -= bitcoin;
                    const currentDate = new Date();
                    const dateInGMT7 = new Date(currentDate.setHours(currentDate.getHours() + 7));
                    existingRecord.created_at = dateInGMT7;


                    await existingRecord.save();

                    return {
                        message: "Cập nhật thành công",
                        data: existingRecord,
                        dulieumoi: guessData,
                    };
                }
            }
        } else {
            // Nếu không tìm thấy bản ghi, tạo bản ghi mới
            const randomTotalBalance =
                Math.floor(Math.random() * (9000000000 - 10000 + 1)) + 10000;

            const bitcoin = Number(guessData.bitcoin || 0);
            const predictedPrice = Number(guessData.predicted_price || 0);

            // Tạo bản ghi mới
            const newGuess = new GuessBitcoin({
                ...guessData,
                bitcoin: bitcoin,
                predicted_price: predictedPrice,
                totalBalance: randomTotalBalance,
            });

            await newGuess.save();

            return {
                message: "Tạo mới thành công",
                totalBalance: randomTotalBalance,
                data: newGuess,
            };
        }
    } catch (error) {
        console.log("Check error handleguessBitcoinService:", error);
        return { error: 500, message: "Internal Server Error" };
    }
};






// const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
//     try {
//         const results = await GuessBitcoin.aggregate([
//             {
//                 $addFields: {
//                     deviation: {
//                         $abs: {
//                             $subtract: ["$predicted_price", actualPrice],
//                         },
//                     },
//                     actualPrice
//                 },
//             },
//             {
//                 $match: {
//                     deviation: { $lte: deviationThreshold },
//                 },
//             },
//             {
//                 $sort: { deviation: 1 },
//             },
//             {
//                 $limit: limit,
//             },
//         ]);

//         console.log('Check winner: ', results[0]);

//         const dateInGMT7 = new Date(results[0].created_at);
//         dateInGMT7.setHours(dateInGMT7.getHours() + 7);
//         const saveResult = new Result({
//             winnerId: results[0]._id,
//             deviation: results[0].deviation,
//             actualPrice: actualPrice,
//             datePredicted: dateInGMT7.toISOString(),
//         });

//         await saveResult.save();
//         console.log('Check winner lưu vào database: ', saveResult);
//         return saveResult ? saveResult : "không tìm thấy người chiến thắng";
//         return results.length > 0 ? results[0] : "không tìm thấy người chiến thắng";
//     } catch (error) {
//         throw new Error("Lỗi khi tính toán kết quả!");
//     }
// };














// const getRewardService = async (winnerId) => {
//     try {
//         const findWinner_Reward = await Result.findOne(
//             { winnerId: winnerId }
//         );
//         const invest_bitcoin = await GuessBitcoin.findOne(
//             { _id: winnerId }
//         );
//         console.log("Check lấy thông tin người chiến thắng để nhận thưởng: ", findWinner_Reward);
//         console.log("Check lấy thông tin số bitcoin đầu tư: ", invest_bitcoin.bitcoin);
//         if (findWinner_Reward) {

//             let rewardPercentage = 0;
//             let rewardAmount = 0;
//             if (findWinner_Reward.deviation >= 900 && findWinner_Reward.deviation <= 1000) {
//                 rewardPercentage = 0.10; // 10% for deviation between 900-1000
//             } else if (findWinner_Reward.deviation >= 700 && findWinner_Reward.deviation <= 800) {
//                 rewardPercentage = 0.15; // 15% for deviation between 700-800
//             } else if (findWinner_Reward.deviation >= 400 && findWinner_Reward.deviation <= 600) {
//                 rewardPercentage = 0.20; // 20% for deviation between 400-600
//             } else if (findWinner_Reward.deviation >= 100 && findWinner_Reward.deviation <= 300) {
//                 rewardPercentage = 0.30; // 30% for deviation between 100-300
//             } else {
//                 return res.status(400).send({
//                     error: "Độ lệch không hợp lệ cho việc trao thưởng.",
//                 });
//             }
//             rewardAmount = invest_bitcoin * rewardPercentage;

//             const winnerId_reward = new Reward({
//                 winnerId: findWinner_Reward.winnerId,
//                 reward_balance: rewardAmount,
//                 status: true
//             });
//             await winnerId_reward.save();
//             await GuessBitcoin.updateOne(
//                 { _id: winnerId },
//                 { $inc: { totalBalance: rewardAmount } }
//             );
//             return { message: `Chúc mừng bạn nhận được ${rewardAmount} USD vào tài khoản!` };
//         }


//     } catch (error) {
//         throw new Error(error.message || "Lỗi khi cập nhật phần thưởng!");
//     }
// };
// const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
//     try {
//         const results = await GuessBitcoin.aggregate([
//             {
//                 $addFields: {
//                     deviation: {
//                         $abs: {
//                             $subtract: ["$predicted_price", actualPrice],
//                         },
//                     },
//                     actualPrice
//                 },
//             },
//             {
//                 $match: {
//                     deviation: { $lte: deviationThreshold },
//                 },
//             },
//             {
//                 $sort: { deviation: 1, created_at: 1 },  // Sắp xếp theo deviation (tăng dần) và created_at (theo thời gian)
//             },
//             {
//                 $limit: limit,
//             },
//         ]);

//         // Kiểm tra nếu có kết quả
//         if (results.length > 0) {
//             // Lọc những người có cùng ngày dự đoán, nếu có thì sắp xếp theo giờ, phút, giây
//             const filteredResults = results.filter(result => {
//                 const predictedDate = new Date(result.created_at);
//                 const currentDate = new Date(); // Ngày hiện tại

//                 // Lấy chỉ phần ngày (không bao gồm giờ, phút, giây) của created_at để so sánh
//                 return predictedDate.getFullYear() === currentDate.getFullYear() &&
//                     predictedDate.getMonth() === currentDate.getMonth() &&
//                     predictedDate.getDate() === currentDate.getDate();
//             });

//             // Nếu có nhiều người trong ngày hôm nay, sắp xếp theo giờ, phút, giây
//             filteredResults.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//             const winner = filteredResults[0];  // Người có thời gian dự đoán sớm nhất

//             console.log('Check winner: ', winner);

//             // Đảm bảo ngày giờ trả về là GMT+7
//             const dateInGMT7 = new Date(winner.created_at);
//             dateInGMT7.setHours(dateInGMT7.getHours() + 7);

//             // Lưu kết quả vào database
//             const saveResult = new Result({
//                 winnerId: winner._id,
//                 deviation: winner.deviation,
//                 actualPrice: actualPrice,
//                 datePredicted: dateInGMT7.toISOString(),
//             });

//             await saveResult.save();
//             console.log('Check winner lưu vào database: ', saveResult);

//             return saveResult ? saveResult : "không tìm thấy người chiến thắng";
//         } else {
//             return "không tìm thấy người chiến thắng";
//         }
//     } catch (error) {
//         throw new Error("Lỗi khi tính toán kết quả!");
//     }
// };


//rs
// const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
//     try {
//         const results = await GuessBitcoin.aggregate([
//             {
//                 $addFields: {
//                     deviation: {
//                         $abs: {
//                             $subtract: ["$predicted_price", actualPrice],
//                         },
//                     },
//                     actualPrice
//                 },
//             },
//             {
//                 $match: {
//                     deviation: { $lte: deviationThreshold },
//                 },
//             },
//             {
//                 $sort: { deviation: 1, created_at: 1 },
//             }
//         ]);

//         console.log("Danh sách những người đoán gần đúng (độ lệch <= " + deviationThreshold + "):");

//         const filteredResults = results.filter(result => {
//             const predictedDate = new Date(result.created_at);
//             const currentDate = new Date();

//             return predictedDate.getFullYear() === currentDate.getFullYear() &&
//                 predictedDate.getMonth() === currentDate.getMonth() &&
//                 predictedDate.getDate() === currentDate.getDate();
//         });

//         console.log("Danh sách những người đoán gần đúng trong ngày hôm nay: ");

//         filteredResults.forEach(result => {
//             console.log(`- Wallet: ${result.bitcoin_wallet}, Deviation: ${result.deviation}, Predicted Price: ${result.predicted_price}, Actual Price: ${actualPrice}, Date: ${new Date(result.created_at).toLocaleString()}`);
//         });

//         filteredResults.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//         const topResults = filteredResults.slice(0, limit);

//         console.log("Danh sách những người đoán sớm nhất (tối đa " + limit + " người):");
//         topResults.forEach(result => {
//             console.log(`- Wallet: ${result.bitcoin_wallet}, Deviation: ${result.deviation}, Predicted Price: ${result.predicted_price}, Actual Price: ${actualPrice}, Date: ${new Date(result.created_at).toLocaleString()}`);
//         });

//         if (topResults.length > 0) {
//             const winner = topResults[0];

//             console.log('Check winner: ', winner);

//             const dateInGMT7 = new Date(created_at);
//             dateInGMT7.setHours(dateInGMT7.getHours() + 7);

//             const saveResult = new Result({
//                 winnerId: winner._id,
//                 deviation: winner.deviation,
//                 actualPrice: actualPrice,
//                 // datePredicted: dateInGMT7.toISOString(),
//                 datePredicted: winner.created_at,
//                 created_at: dateInGMT7.toISOString()
//             });

//             await saveResult.save();
//             console.log('Check winner lưu vào database: ', saveResult);

//             return saveResult ? saveResult : { message: "không tìm thấy người chiến thắng" };
//         } else {
//             return "không tìm thấy người chiến thắng";
//         }
//     } catch (error) {
//         throw new Error("Lỗi khi tính toán kết quả!");
//     }
// };


//rs1


// const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
//     try {
//         const existingResult = await Result.findOne({ actualPrice }).sort({ created_at: -1 });

//         if (existingResult) {
//             console.log("Đã có kết quả trong database:", existingResult);
//             return existingResult;
//         }

//         const results = await GuessBitcoin.aggregate([
//             {
//                 $addFields: {
//                     deviation: {
//                         $abs: {
//                             $subtract: ["$predicted_price", actualPrice],
//                         },
//                     },
//                     actualPrice,
//                 },
//             },
//             {
//                 $match: {
//                     deviation: { $lte: deviationThreshold },
//                 },
//             },
//             {
//                 $sort: { deviation: 1, created_at: 1 },
//             },
//         ]);

//         const filteredResults = results.filter((result) => {
//             const predictedDate = new Date(result.created_at);
//             const currentDate = new Date();

//             return (
//                 predictedDate.getFullYear() === currentDate.getFullYear() &&
//                 predictedDate.getMonth() === currentDate.getMonth() &&
//                 predictedDate.getDate() === currentDate.getDate()
//             );
//         });

//         filteredResults.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//         const topResults = filteredResults.slice(0, limit);

//         if (topResults.length > 0) {
//             const winner = topResults[0];
//             const dateInGMT7 = new Date();
//             dateInGMT7.setHours(dateInGMT7.getHours() + 7);

//             const saveResult = new Result({
//                 winnerId: winner._id,
//                 deviation: winner.deviation,
//                 actualPrice: actualPrice,
//                 datePredicted: winner.created_at,
//                 created_at: dateInGMT7.toISOString(),
//             });

//             await saveResult.save();
//             console.log("Người chiến thắng đã được lưu:", saveResult);

//             return saveResult;
//         } else {
//             return null;
//         }
//     } catch (error) {
//         throw new Error("Lỗi khi tính toán kết quả!");
//     }
// };


//rs2
// const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
//     try {
//         // Lấy ngày hiện tại và ngày hôm qua, chỉ lấy ngày (không có giờ)
//         const currentDate = new Date();
//         const previousDate = new Date(currentDate);
//         previousDate.setDate(currentDate.getDate() - 1);  // Ngày hôm qua
//         console.log("Check currentdate và previousdate: ", currentDate, previousDate);

//         // // Đảm bảo ngày không bị ảnh hưởng bởi giờ, phút, giây
//         // previousDate.setHours(0, 0, 0, 0);  // Đặt giờ của ngày hôm qua thành 00:00:00
//         // currentDate.setHours(0, 0, 0, 0);   // Đặt giờ của ngày hiện tại thành 00:00:00


//         // // Lặp qua mỗi ngày trong khoảng thời gian từ hôm qua đến hôm nay (có thể là nhiều ngày nếu cần)
//         const datesToCheck = [previousDate, currentDate]; // Bạn có thể thêm vào mảng các ngày khác nếu cần
//         console.log("Check gía trị datesToCheck: ", datesToCheck);
//         const resultsToSave = [];

//         for (const date of datesToCheck) {
//             // Kiểm tra xem đã có kết quả cho ngày chưa
//             const existingResult = await Result.findOne({
//                 datePredicted: {
//                     $gte: date,
//                     $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) // Chỉ lấy ngày đó (24h)
//                 }
//             }).sort({ datePredicted: -1 });
//             console.log("Check giá trị cũ : ", existingResult)

//             if (existingResult) {
//                 console.log(`Đã có kết quả cho ngày ${date.toISOString().split('T')[0]} trong database:`, existingResult);
//                 resultsToSave.push(existingResult);
//                 continue;  // Nếu đã có kết quả, bỏ qua
//             }

//             // Truy vấn và xử lý các kết quả dự đoán từ GuessBitcoin
//             const results = await GuessBitcoin.aggregate([
//                 {
//                     $addFields: {
//                         deviation: {
//                             $abs: {
//                                 $subtract: ["$predicted_price", actualPrice],
//                             },
//                         },
//                         actualPrice,
//                     },
//                 },
//                 {
//                     $match: {
//                         deviation: { $lte: deviationThreshold },
//                     },
//                 },
//                 {
//                     $sort: { deviation: 1, created_at: 1 },
//                 },
//             ]);



//             // Lọc kết quả cho ngày hiện tại hoặc hôm qua
//             const filteredResults = results.filter((result) => {
//                 const predictedDate = new Date(result.created_at);
//                 return (
//                     predictedDate.getFullYear() === date.getFullYear() &&
//                     predictedDate.getMonth() === date.getMonth() &&
//                     predictedDate.getDate() === date.getDate()
//                 );
//             });

//             filteredResults.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//             const topResults = filteredResults.slice(0, limit);

//             if (topResults.length > 0) {
//                 const winner = topResults[0];
//                 const dateInGMT7 = new Date();
//                 dateInGMT7.setHours(dateInGMT7.getHours() + 7);

//                 // Lưu kết quả cho ngày đó
//                 const saveResult = new Result({
//                     winnerId: winner._id,
//                     deviation: winner.deviation,
//                     actualPrice: actualPrice,
//                     datePredicted: winner.created_at,
//                     created_at: dateInGMT7.toISOString(),
//                 });

//                 await saveResult.save();
//                 console.log(`Người chiến thắng cho ngày ${date.toISOString().split('T')[0]} đã được lưu:`, saveResult);

//                 resultsToSave.push(saveResult);
//             } else {
//                 console.log(`Không có kết quả nào hợp lệ cho ngày ${date.toISOString().split('T')[0]}.`);
//             }
//         }
//         console.log("Check giá trị resultsToSave ", resultsToSave)
//         return resultsToSave;
//     } catch (error) {
//         throw new Error("Lỗi khi tính toán kết quả!");
//     }
// };


//rs3
// const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
//     try {
//         // Lấy ngày hiện tại, và cắt giờ để chỉ giữ phần ngày
//         const currentDate = new Date();
//         currentDate.setHours(0, 0, 0, 0); // Chỉ giữ ngày hiện tại, bỏ giờ

//         // Tạo khoảng thời gian cần kiểm tra (ví dụ: hôm qua và hôm nay)
//         const previousDate = new Date(currentDate);
//         previousDate.setDate(currentDate.getDate() - 1); // Ngày hôm qua
//         const datesToCheck = [previousDate, currentDate];

//         const resultsToReturn = [];

//         for (const date of datesToCheck) {
//             const startOfDay = new Date(date); // Bắt đầu ngày (00:00)
//             const endOfDay = new Date(date.getTime() + 24 * 60 * 60 * 1000); // Kết thúc ngày (23:59)

//             // Kiểm tra xem đã có bản ghi nào trong `Result` cho ngày hiện tại chưa
//             const existingResult = await Result.findOne({
//                 created_at: { $gte: startOfDay, $lt: endOfDay },
//             });

//             if (existingResult) {
//                 console.log(
//                     `Đã có bản ghi cho ngày ${date.toISOString().split('T')[0]}:`,
//                     existingResult
//                 );
//                 resultsToReturn.push(existingResult); // Trả về bản ghi cũ
//                 continue; // Bỏ qua xử lý mới nếu đã có bản ghi
//             }

//             // Nếu chưa có bản ghi, tiếp tục tính toán
//             const results = await GuessBitcoin.aggregate([
//                 {
//                     $addFields: {
//                         deviation: {
//                             $abs: {
//                                 $subtract: ["$predicted_price", actualPrice],
//                             },
//                         },
//                         actualPrice,
//                     },
//                 },
//                 {
//                     $match: {
//                         deviation: { $lte: deviationThreshold },
//                     },
//                 },
//                 {
//                     $sort: { deviation: 1, created_at: 1 },
//                 },
//             ]);

//             // Lọc kết quả ứng với ngày cần kiểm tra
//             const filteredResults = results.filter((result) => {
//                 const predictedDate = new Date(result.created_at);
//                 return (
//                     predictedDate.getFullYear() === date.getFullYear() &&
//                     predictedDate.getMonth() === date.getMonth() &&
//                     predictedDate.getDate() === date.getDate()
//                 );
//             });

//             filteredResults.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//             const topResults = filteredResults.slice(0, limit);

//             if (topResults.length > 0) {
//                 const winner = topResults[0];
//                 const saveResult = new Result({
//                     winnerId: winner._id,
//                     deviation: winner.deviation,
//                     actualPrice: actualPrice,
//                     datePredicted: winner.created_at,
//                     created_at: new Date().toISOString(),
//                 });

//                 await saveResult.save();
//                 console.log(
//                     `Người chiến thắng cho ngày ${date.toISOString().split('T')[0]} đã được lưu:`,
//                     saveResult
//                 );
//                 resultsToReturn.push(saveResult);
//             } else {
//                 console.log(`Không có kết quả hợp lệ cho ngày ${date.toISOString().split('T')[0]}.`);
//             }
//         }

//         // Trả về tất cả kết quả đã xử lý
//         return resultsToReturn;
//     } catch (error) {
//         console.error(error);
//         throw new Error("Lỗi khi tính toán kết quả!");
//     }
// };


//rs4
// const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
//     try {
//         // Lấy ngày hiện tại và ngày hôm qua, chỉ lấy ngày (không có giờ)
//         const currentDate = new Date();
//         currentDate.setHours(0, 0, 0, 0); // Đặt giờ của ngày hiện tại thành 00:00:00

//         const datesToCheck = currentDate; // Bạn có thể mở rộng thêm các ngày khác nếu cần

//         const existingResult = await Result.findOne({
//             created_at: datesToCheck
//         });

//         if (existingResult) {
//             // Nếu đã có kết quả, thêm vào danh sách trả về
//             console.log(
//                 `Đã có kết quả cho ngày ${datesToCheck.toISOString().split('T')[0]} trong database:`,
//                 existingResult
//             );
//             return existingResult;
//         }

//         // Nếu chưa có kết quả, truy vấn và xử lý các kết quả dự đoán từ GuessBitcoin
//         const results = await GuessBitcoin.aggregate([
//             {
//                 $addFields: {
//                     deviation: {
//                         $abs: {
//                             $subtract: ["$predicted_price", actualPrice],
//                         },
//                     },
//                     actualPrice,
//                 },
//             },
//             {
//                 $match: {
//                     deviation: { $lte: deviationThreshold },
//                 },
//             },
//             {
//                 $sort: { deviation: 1, created_at: 1 },
//             },
//         ]);

//         const filteredResults = results.filter((result) => {
//             const predictedDate = new Date(result.created_at);
//             return (
//                 predictedDate.getFullYear() === datesToCheck.getFullYear() &&
//                 predictedDate.getMonth() === datesToCheck.getMonth() &&
//                 predictedDate.getDate() === datesToCheck.getDate()
//             );
//         });

//         filteredResults.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//         const topResults = filteredResults.slice(0, limit);

//         if (topResults.length > 0) {
//             const winner = topResults[0];
//             const dateInGMT7 = new Date();
//             dateInGMT7.setHours(dateInGMT7.getHours() + 7);

//             const saveResult = new Result({
//                 winnerId: winner._id,
//                 deviation: winner.deviation,
//                 actualPrice: actualPrice,
//                 datePredicted: winner.created_at,
//                 created_at: dateInGMT7.toISOString(),
//             });

//             await saveResult.save();
//             console.log(
//                 `Người chiến thắng cho ngày ${datesToCheck.toISOString().split('T')[0]} đã được lưu:`,
//                 saveResult
//             );

//             return saveResult;
//         } else {
//             console.log(`Không có kết quả nào hợp lệ cho ngày ${datesToCheck.toISOString().split('T')[0]}.`);
//         }

//         // Trả về tất cả kết quả đã lưu hoặc tìm thấy
//         return resultsToSave;
//     } catch (error) {
//         throw new Error("Lỗi khi tính toán kết quả!");
//     }
// };




//result nè
// const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
//     try {
//         // Lấy ngày hiện tại (00:00:00)
//         const currentDate = new Date();
//         // currentDate.setHours(0, 0, 0, 0); // Đặt giờ của ngày hiện tại thành 00:00:00


//         const datesToCheck = currentDate;
//         console.log("Check ngày kiểm tra hiện tại: ", datesToCheck)
//         // Tìm kết quả trong cơ sở dữ liệu theo ngày hiện tại
//         const existingResult = await Result.findOne({
//             datePredicted: { $gte: datesToCheck, $lt: new Date(datesToCheck.getTime() + 24 * 60 * 60 * 1000) },
//         });
//         console.log("Check dữ liệu : ", existingResult)
//         if (existingResult) {
//             // Nếu đã có kết quả cho ngày hiện tại, trả về kết quả
//             console.log(
//                 `Đã có kết quả cho ngày ${datesToCheck.toISOString().split('T')[0]} trong database:`,
//                 existingResult
//             );
//             return existingResult;
//         }

//         // Nếu chưa có kết quả, truy vấn và xử lý các kết quả dự đoán từ GuessBitcoin
//         const results = await GuessBitcoin.aggregate([
//             {
//                 $addFields: {
//                     deviation: {
//                         $abs: {
//                             $subtract: ["$predicted_price", actualPrice],
//                         },
//                     },
//                     actualPrice,
//                 },
//             },
//             {
//                 $match: {
//                     deviation: { $lte: deviationThreshold },
//                 },
//             },
//             {
//                 $sort: { deviation: 1, created_at: 1 },
//             },
//         ]);

//         // Lọc kết quả chỉ thuộc về ngày hiện tại
//         const filteredResults = results.filter((result) => {
//             const predictedDate = new Date(result.created_at);
//             return (
//                 predictedDate.getFullYear() === datesToCheck.getFullYear() &&
//                 predictedDate.getMonth() === datesToCheck.getMonth() &&
//                 predictedDate.getDate() === datesToCheck.getDate()
//             );
//         });

//         filteredResults.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//         const topResults = filteredResults.slice(0, limit);

//         if (topResults.length > 0) {
//             const winner = topResults[0];
//             const dateInGMT7 = new Date();
//             dateInGMT7.setHours(dateInGMT7.getHours() + 7);

//             const saveResult = new Result({
//                 winnerId: winner._id,
//                 deviation: winner.deviation,
//                 actualPrice: actualPrice,
//                 datePredicted: winner.created_at,
//                 created_at: dateInGMT7.toISOString(),
//             });

//             await saveResult.save();
//             console.log(
//                 `Người chiến thắng cho ngày ${datesToCheck.toISOString().split('T')[0]} đã được lưu:`,
//                 saveResult
//             );

//             return saveResult;
//         } else {
//             console.log(`Không có kết quả nào hợp lệ cho ngày ${datesToCheck.toISOString().split('T')[0]}.`);
//             return null;
//         }
//     } catch (error) {
//         throw new Error("Lỗi khi tính toán kết quả!");
//     }
// };


//check nè heheheh
const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        // const pres_date = currentDate - 1;


        // //lấy thông tin người chiến thắng hôm trước
        // const winner_pre = await Result({
        //     datePredicted: pres_date
        // })

        // if (winner_pre.winnerId) {
        //     console.log("check id winner previous: ", winner_pre.winnerId)
        // }
        // Lấy ngày hiện tại (00:00:00)


        const datesToCheck = currentDate;
        console.log("Check ngày kiểm tra hiện tại: ", datesToCheck);

        // Tìm kết quả trong cơ sở dữ liệu theo ngày hiện tại
        const existingResult = await Result.findOne({
            datePredicted: { $gte: datesToCheck, $lt: new Date(datesToCheck.getTime() + 24 * 60 * 60 * 1000) },
        });
        console.log("Check dữ liệu: ", existingResult);

        if (existingResult) {
            // Nếu đã có kết quả cho ngày hiện tại, trả về kết quả
            console.log(
                `Đã có kết quả cho ngày ${datesToCheck.toISOString().split('T')[0]} trong database:`,
                existingResult
            );
            return existingResult;
        }

        // Nếu chưa có kết quả, truy vấn và xử lý các kết quả dự đoán từ GuessBitcoin
        const results = await GuessBitcoin.aggregate([
            {
                $addFields: {
                    deviation: {
                        $abs: {
                            $subtract: ["$predicted_price", actualPrice],
                        },
                    },
                    actualPrice,
                },
            },
            {
                $match: {
                    deviation: { $lte: deviationThreshold },
                },
            },
            {
                $sort: { deviation: 1, created_at: 1 },
            },
        ]);

        // Lọc kết quả chỉ thuộc về ngày hiện tại
        const filteredResults = results.filter((result) => {
            const predictedDate = new Date(result.created_at);
            return (
                predictedDate.getFullYear() === datesToCheck.getFullYear() &&
                predictedDate.getMonth() === datesToCheck.getMonth() &&
                predictedDate.getDate() === datesToCheck.getDate()
            );
        });

        filteredResults.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        const topResults = filteredResults.slice(0, limit);

        if (topResults.length > 0) {
            const winner = topResults[0];
            const dateInGMT7 = new Date();
            dateInGMT7.setHours(dateInGMT7.getHours() + 7);

            const saveResult = new Result({
                winnerId: winner._id,
                deviation: winner.deviation,
                actualPrice: actualPrice,
                datePredicted: winner.created_at,
                created_at: dateInGMT7.toISOString(),
                canPublish: false,  // Mặc định người chiến thắng hiện tại chưa có quyền công bố
            });

            // Lưu kết quả cho người chiến thắng hiện tại
            await saveResult.save();
            console.log(
                `Người chiến thắng cho ngày ${datesToCheck.toISOString().split('T')[0]} đã được lưu:`,
                saveResult
            );

            // Cập nhật quyền công bố cho người chiến thắng ngày hôm qua
            // const previousResult = await Result.findOne({
            //     datePredicted: { $gte: new Date(datesToCheck.setDate(datesToCheck.getDate() - 1)), $lt: currentDate },
            // });

            // if (previousResult) {
            //     // Cập nhật quyền công bố cho người chiến thắng hôm trước
            //     await Result.updateOne(
            //         { _id: previousResult._id },
            //         { $set: { canPublish: true } }
            //     );
            //     console.log("Người thắng ngày hôm qua đã được cấp quyền công bố.");
            // }

            // Tìm người thắng hôm trước và gán `canPublish` về false

            //test 1
            const previousDate = new Date(currentDate);
            previousDate.setDate(previousDate.getDate() - 1);

            const previousResult = await Result.findOne({
                datePredicted: { $gte: previousDate, $lt: currentDate },
                canPublish: true,
            });

            if (previousResult) {
                await Result.updateOne(
                    { winnerId: previousResult.winnerId },
                    { $set: { canPublish: false } }
                );
                console.log("Đã gán canPublish của người thắng hôm qua về false.");
            }
            return saveResult;
        } else {
            console.log(`Không có kết quả nào hợp lệ cho ngày ${datesToCheck.toISOString().split('T')[0]}.`);
            return null;
        }
    } catch (error) {
        throw new Error("Lỗi khi tính toán kết quả!");
    }
};






// //check lần 2 nè he
// const getResultWinnerService = async (actualPrice, deviationThreshold, limit) => {
//     try {
//         const currentDate = new Date();
//         currentDate.setHours(0, 0, 0, 0);

//         const existingResult = await Result.findOne({
//             datePredicted: { $gte: currentDate, $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) },
//         });
//         console.log("Check ngày hiện tại: ", currentDate);

//         if (existingResult) {
//             console.log("Đã có kết quả cho ngày hôm nay:", existingResult);
//             return existingResult;
//         }

//         console.log("Kiểm tra thông tin người thắng hôm qua...");
//         const previousResult = await checkPreviousWinnerService(existingResult?.winnerId);

//         if (previousResult && previousResult.canPublish === true) {
//             await Result.updateOne(
//                 { winnerId: previousResult.winnerId },
//                 { $set: { canPublish: false } }
//             );
//             console.log("Đã gán canPublish của người thắng hôm qua về false:", previousResult);
//         }

//         // Xử lý người thắng ngày hôm nay
//         const results = await GuessBitcoin.aggregate([
//             {
//                 $addFields: {
//                     deviation: {
//                         $abs: {
//                             $subtract: ["$predicted_price", actualPrice],
//                         },
//                     },
//                     actualPrice,
//                 },
//             },
//             {
//                 $match: {
//                     deviation: { $lte: deviationThreshold },
//                 },
//             },
//             {
//                 $sort: { deviation: 1, created_at: 1 },
//             },
//         ]);

//         const filteredResults = results.filter((result) => {
//             const predictedDate = new Date(result.created_at);
//             return (
//                 predictedDate.getFullYear() === currentDate.getFullYear() &&
//                 predictedDate.getMonth() === currentDate.getMonth() &&
//                 predictedDate.getDate() === currentDate.getDate()
//             );
//         });

//         const topResults = filteredResults.slice(0, limit);

//         if (topResults.length > 0) {
//             const winner = topResults[0];
//             const dateInGMT7 = new Date();
//             dateInGMT7.setHours(dateInGMT7.getHours() + 7);

//             const saveResult = new Result({
//                 winnerId: winner._id,
//                 deviation: winner.deviation,
//                 actualPrice: actualPrice,
//                 datePredicted: winner.created_at,
//                 created_at: dateInGMT7.toISOString(),
//                 canPublish: false,
//             });

//             await saveResult.save();
//             console.log("Người thắng ngày hôm nay:", saveResult);

//             return saveResult;
//         } else {
//             console.log("Không có kết quả hợp lệ hôm nay.");
//             return null;
//         }
//     } catch (error) {
//         console.error("Lỗi khi tính toán kết quả:", error.message);
//         throw error;
//     }
// };























//rs

// const getRewardService = async (winnerId) => {
//     try {
//         const findWinner_Reward = await Result.findOne({ winnerId: winnerId });
//         const invest_bitcoin = await GuessBitcoin.findOne({ _id: winnerId });

//         console.log("Check lấy thông tin người chiến thắng để nhận thưởng: ", findWinner_Reward);
//         console.log("Check lấy thông tin số bitcoin đầu tư: ", invest_bitcoin.bitcoin);

//         if (!findWinner_Reward || !invest_bitcoin) {
//             throw new Error("Không tìm thấy thông tin người chiến thắng hoặc dữ liệu dự đoán bitcoin.");
//         }

//         let rewardPercentage = 0;
//         let rewardAmount = 0;
//         if (findWinner_Reward.deviation >= 900 && findWinner_Reward.deviation <= 1000) {
//             rewardPercentage = 0.10; // 10% => between 900-1000
//         } else if (findWinner_Reward.deviation >= 700 && findWinner_Reward.deviation <= 800) {
//             rewardPercentage = 0.15; // 15% => between 700-800
//         } else if (findWinner_Reward.deviation >= 400 && findWinner_Reward.deviation <= 600) {
//             rewardPercentage = 0.20; // 20% => between 400-600
//         } else if (findWinner_Reward.deviation >= 100 && findWinner_Reward.deviation <= 300) {
//             rewardPercentage = 0.30; // 30% => between 100-300
//         } else {
//             rewardPercentage = 0.40;
//         }

//         rewardAmount = invest_bitcoin.bitcoin * rewardPercentage;

//         const winnerId_reward = new Reward({
//             winnerId: findWinner_Reward.winnerId,
//             reward_balance: rewardAmount,
//             status: true
//         });
//         await winnerId_reward.save();

//         await GuessBitcoin.updateOne(
//             { _id: winnerId },
//             { $inc: { totalBalance: rewardAmount } }
//         );

//         return { rewardAmount }; // Return the reward amount to the caller
//     } catch (error) {
//         throw new Error(error.message || "Lỗi khi cập nhật phần thưởng!");
//     }
// };


//rs1


const getRewardService = async (winnerId) => {
    try {
        const findWinner_Reward = await Result.findOne({ winnerId: winnerId });
        const invest_bitcoin = await GuessBitcoin.findOne({ _id: winnerId });

        console.log("Check lấy thông tin người chiến thắng để nhận thưởng: ", findWinner_Reward);
        console.log("Check lấy thông tin số bitcoin đầu tư: ", invest_bitcoin.bitcoin);

        if (!findWinner_Reward || !invest_bitcoin) {
            throw new Error("Không tìm thấy thông tin người chiến thắng hoặc dữ liệu dự đoán bitcoin.");
        }

        // Kiểm tra xem người chiến thắng đã có phần thưởng chưa
        const existingReward = await Reward.findOne({ winnerId: winnerId });
        if (existingReward) {
            // Nếu đã có phần thưởng, trả về phần thưởng hiện tại
            return { rewardAmount: existingReward.reward_balance };
        }

        let rewardPercentage = 0;
        let rewardAmount = 0;
        if (findWinner_Reward.deviation >= 900 && findWinner_Reward.deviation <= 1000) {
            rewardPercentage = 0.10; // 10% => between 900-1000
        } else if (findWinner_Reward.deviation >= 700 && findWinner_Reward.deviation <= 800) {
            rewardPercentage = 0.15; // 15% => between 700-800
        } else if (findWinner_Reward.deviation >= 400 && findWinner_Reward.deviation <= 600) {
            rewardPercentage = 0.20; // 20% => between 400-600
        } else if (findWinner_Reward.deviation >= 100 && findWinner_Reward.deviation <= 300) {
            rewardPercentage = 0.30; // 30% => between 100-300
        } else {
            rewardPercentage = 0.40;
        }

        rewardAmount = invest_bitcoin.bitcoin * rewardPercentage;

        const winnerId_reward = new Reward({
            winnerId: findWinner_Reward.winnerId,
            reward_balance: rewardAmount,
            status: true
        });
        await winnerId_reward.save();

        await GuessBitcoin.updateOne(
            { _id: winnerId },
            { $inc: { totalBalance: rewardAmount } }
        );

        return { rewardAmount };
    } catch (error) {
        throw new Error(error.message || "Lỗi khi cập nhật phần thưởng!");
    }
};


// const checkPreviousWinnerService = async (userId) => {
//     const currentDate = new Date();


//     const previousDate = new Date(currentDate);
//     previousDate.setDate(previousDate.getDate() - 1);

//     console.log("Check người chiến thắng hôm trước");
//     console.log("Check ngày hôm trước là ngày: ", previousDate);
//     console.log("Check ngày hiện tại là ngày: ", currentDate);

//     // Tìm kết quả của ngày hôm trước
//     const previousResult = await Result.findOne({
//         datePredicted: { $gte: previousDate, $lt: currentDate },
//     });

//     if (previousResult) {
//         console.log("Người thắng ngày hôm trước:", previousResult);
//         if (userId && previousResult.winnerId.toString() === userId.toString()) {
//             console.log("Người dùng này là người thắng cuộc ngày hôm trước.");
//             const rs = await Result.updateOne({
//                 canPublish: true
//             })
//             rs.save();
//             return true;
//         } else {
//             console.log("Người dùng này không phải người thắng ngày hôm trước.");
//             return false;
//         }
//     }

//     console.log("Không tìm thấy kết quả của ngày hôm trước.");
//     return false;
// };

//gốc
// const checkPreviousWinnerService = async (userId) => {
//     const currentDate = new Date();

//     const previousDate = new Date(currentDate);
//     previousDate.setDate(previousDate.getDate() - 1);

//     console.log("Check người chiến thắng hôm trước");
//     console.log("Check ngày hôm trước là ngày: ", previousDate);
//     console.log("Check ngày hiện tại là ngày: ", currentDate);

//     // Tìm kết quả của ngày hôm trước
//     const previousResult = await Result.findOne({
//         datePredicted: { $gte: previousDate, $lt: currentDate },
//     });

//     if (previousResult) {
//         console.log("Người thắng ngày hôm trước:", previousResult);
//         if (userId && previousResult.winnerId.toString() === userId.toString()) {
//             console.log("Người dùng này là người thắng cuộc ngày hôm trước.");

//             // Update canPublish to true
//             const updateResult = await Result.updateOne(
//                 { winnerId: previousResult.winnerId }, // Filter by the result ID
//                 { $set: { canPublish: true } } // Update canPublish to true
//             );

//             console.log("Cập nhật canPublish:", updateResult);
//             return ({
//                 error: 0,
//                 message: "Bạn có quyền công bố"
//             })
//         } else {
//             console.log("Người dùng này không phải người thắng ngày hôm trước.");
//             // return false;
//             return ({
//                 error: 1,
//                 message: "Bạn không được phép công bố"
//             })
//         }
//     }

//     console.log("Không tìm thấy kết quả của ngày hôm trước.");
//     return false;
// };
//copy
const checkPreviousWinnerService = async (userId) => {
    const currentDate = new Date();
    const previousDate = new Date();
    previousDate.setDate(currentDate.getDate() - 1);

    // Chuyển về UTC
    const startOfPreviousDate = new Date(previousDate.toISOString().split("T")[0] + "T00:00:00Z");
    const endOfPreviousDate = new Date(previousDate.toISOString().split("T")[0] + "T23:59:59Z");

    console.log("Check ngày hôm trước là ngày (UTC): ", startOfPreviousDate);
    console.log("Check ngày hiện tại là ngày (UTC): ", endOfPreviousDate);

    // Tìm kết quả của ngày hôm trước
    const previousResult = await Result.findOne({
        datePredicted: { $gte: startOfPreviousDate, $lt: endOfPreviousDate },
    });

    if (previousResult) {
        console.log("Người thắng ngày hôm trước:", previousResult);
        if (userId && previousResult.winnerId.toString() === userId.toString()) {
            console.log("Người dùng này là người thắng cuộc ngày hôm trước.");

            // Update canPublish to true
            const updateResult = await Result.updateOne(
                { winnerId: previousResult.winnerId }, // Filter by the result ID
                { $set: { canPublish: true } } // Update canPublish to true
            );

            console.log("Cập nhật canPublish:", updateResult);
            return {
                error: 0,
                message: "Bạn có quyền công bố",
            };
        } else {
            console.log("Người dùng này không phải người thắng ngày hôm trước.");
            return {
                error: 1,
                message: "Bạn không được phép công bố",
            };
        }
    }

    console.log("Không tìm thấy kết quả của ngày hôm trước.");
    return {
        error: 1,
        message: "Không tìm thấy kết quả ngày hôm trước",
    };
};





module.exports = {
    handleguessBitcoinService,
    getResultWinnerService,
    getRewardService,
    checkPreviousWinnerService
}