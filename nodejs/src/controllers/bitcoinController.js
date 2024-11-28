const { handleguessBitcoinService,
  getResultWinnerService, getRewardService,
  checkPreviousWinnerService
} = require("../services/bitcoinService")

const actualPrice = 30000;
const deviationThreshold = 1000;
const limit = 1;
const handleguessBitcoin = async (req, res) => {
  console.log("Check req.body: ", req.body)
  try {
    const result = await handleguessBitcoinService(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


// const checkPreviousWinner = async (req, res) => {
//   const { userId } = req.query;
//   try {
//     const isPreviousWinnerAllowedToPublish = await checkPreviousWinnerService(new Date(), userId);
//     if (!isPreviousWinnerAllowedToPublish) {
//       return res.status(403).json({ message: "Bạn không có quyền công bố kết quả." });
//     }
//     return res.status(200).send(
//       {
//         error: 0,
//         message: "Bạn được cấp quyền công bố kết quả"
//       }
//     )
//   } catch (error) {
//     console.error("Lỗi khi công bố kết quả:", error);
//     return res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình công bố kết quả." });
//   }
// };


//test 1

const checkPreviousWinner = async (req, res) => {
  const { userId } = req.body;
  try {
    const isPreviousWinnerAllowedToPublish = await checkPreviousWinnerService(userId);
    // if (!isPreviousWinnerAllowedToPublish) {
    //   return res.status(403).json({ error: 1, message: "Bạn không có quyền công bố kết quả." });
    // }
    return res.status(200).send(
      {
        isPreviousWinnerAllowedToPublish,
        // error: 0,
        // message: "Bạn được cấp quyền công bố kết quả"
      }
    )
  } catch (error) {
    console.error("Lỗi khi công bố kết quả:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình công bố kết quả." });
  }
};

//gốc
// const findWinner = async (req, res) => {
//   try {

//     const winner = await getResultWinnerService(actualPrice, deviationThreshold, limit);

//     if (winner) {
//       res.status(200).send({
//         message: "Người chiến thắng được tìm thấy!",
//         winner,
//       });
//     } else {
//       res.status(200).send({
//         message: "Không có người chiến thắng trong lần này.",
//       });
//     }
//   } catch (error) {
//     res.status(500).send({
//       error: error.message || "Lỗi khi tính toán kết quả!",
//     });
//   }
// };

//test 1



const findWinner = async (req, res) => {
  try {

    const winner = await getResultWinnerService(actualPrice, deviationThreshold, limit);

    if (winner) {
      res.status(200).send({
        message: "Người chiến thắng được tìm thấy!",
        winner,
      });
    } else {
      res.status(200).send({
        message: "Không có người chiến thắng trong lần này.",
      });
    }

  } catch (error) {
    res.status(500).send({
      error: error.message || "Lỗi khi tính toán kết quả!",
    });
  }
};


// const getReward = async (req, res) => {
//   try {

//     const winner = await getResultWinnerService(actualPrice, deviationThreshold, limit);
//     console.log("Check id winner:", winner.winnerId)

//     if (!winner.winnerId) {
//       return res.status(400).send({
//         error: "Không tìm thấy người chiến thắng!",
//       });
//     }
//     const rewardResult = await getRewardService(winner.winnerId);

//     // // Gửi phản hồi thành công (chỉ gọi một lần)
//     return res.status(200).send({
//       message: "Phần thưởng đã được trao!",
//       user: rewardResult,
//     });
//   } catch (error) {
//     // Xử lý lỗi server
//     console.error("Lỗi trong hàm getReward: ", error);
//     // Đảm bảo không gửi lại phản hồi nếu đã có phản hồi trước đó
//     if (!res.headersSent) {
//       return res.status(500).send({
//         error: error.message || "Lỗi khi trao thưởng!",
//       });
//     }
//   }
// };

const getReward = async (req, res) => {
  try {
    const winner = await getResultWinnerService(actualPrice, deviationThreshold, limit);
    console.log("Check id winner:", winner);
    const currentDate = new Date();
    console.log("Check current date getReward: ", currentDate);

    if (!winner.winnerId) {
      return res.status(400).send({
        error: "Không tìm thấy người chiến thắng!",
      });
    }

    const rewardResult = await getRewardService(winner.winnerId);

    return res.status(200).send({
      message: `Phần thưởng đã được trao! Chúc mừng bạn nhận được ${rewardResult.rewardAmount} USD vào tài khoản!`,
      user: rewardResult,
    });
  } catch (error) {
    console.error("Lỗi trong hàm getReward: ", error);
    if (!res.headersSent) {
      return res.status(500).send({
        error: error.message || "Lỗi khi trao thưởng!",
      });
    }
  }
};




module.exports = {
  handleguessBitcoin, findWinner, getReward,
  checkPreviousWinner
}