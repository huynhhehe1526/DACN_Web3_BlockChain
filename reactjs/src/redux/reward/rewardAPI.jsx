import axios from '../../util/axios';

const getRewardForWinner = async (formData) => {
    const response = await axios.post(`/api/reward`, formData);
    return response;
};


const rewardAPI = {
    getRewardForWinner

};

export default rewardAPI;