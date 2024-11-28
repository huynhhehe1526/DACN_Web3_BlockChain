const express = require('express');
const { createUser, handleLogin } = require('../controllers/userController');
const { handleguessBitcoin, findWinner, getReward, checkPreviousWinner } = require('../controllers/bitcoinController');

const routerAPI = express.Router();


routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello word api")
})

routerAPI.post("/register", createUser)
routerAPI.post("/login", handleLogin)
routerAPI.post("/guess_bitcoin", handleguessBitcoin)
routerAPI.get("/result", findWinner)
routerAPI.post("/reward", getReward)
routerAPI.post("/checkpreviouswinner", checkPreviousWinner)

module.exports = routerAPI; 