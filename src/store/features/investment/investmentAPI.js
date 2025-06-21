import axios from 'axios'

const API_URL = 'https://spine.onrender.com/api';


export const getPlansApi = async (token) => {
    const response = await axios.get(`${API_URL}/invest/plans`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const getActiveInvestments = async (token) => {
    const response = await axios.get(`${API_URL}/invest/my-active`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getInvestmentsHistory = async (token) => {
    const response = await axios.get(`${API_URL}/invest/my-history`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const subscribeInvestment = async (id, data, token) => {
    const response = await axios.post(`${API_URL}/invest/subscribe/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};