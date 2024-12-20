const { createUserService, handleLoginService } = require("../services/userService")

const createUser = async (req, res) => {
    console.log("Check req.body: ", req.body)
    const { username, email, password } = req.body;
    const data = await createUserService(username, email, password);
    return res.status(200).json(data)
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await handleLoginService(email, password);
    return res.status(200).json(data)
}

module.exports = {
    createUser,
    handleLogin
}