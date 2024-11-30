import axios from '../../util/axios';

const postGuessBitCoin = async (formData) => {
    const response = await axios.post(`/api/guess_bitcoin`, formData);
    if (response) {
        sessionStorage.setItem('bitcoinInfo', JSON.stringify(response.data));
    }
    return response;
};
const guessBitcoinAPI = {
    postGuessBitCoin

};
export default guessBitcoinAPI;