import axios from "./axios";

const createUserAPI = (username, email, password) => {
    const URL_API = "/api/register";
    const data = {
        username, email, password
    }
    return axios.post(URL_API, data)
}


const handleLogin = (email, password) => {
    const URL_API = "/api/login";
    const data = {
        email, password
    }
    return axios.post(URL_API, data)
}

export {
    createUserAPI,
    handleLogin
}