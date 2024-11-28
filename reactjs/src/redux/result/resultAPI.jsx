import axios from '../../util/axios';



const checkWinnerPrevious = async (userId) => {
    const response = axios.post('/api/checkpreviouswinner', { userId });
    return response;
}

const getResult = async () => {
    const response = axios.get('/api/result');
    return response;
};


const resultAPI = {
    getResult, checkWinnerPrevious

};

export default resultAPI;