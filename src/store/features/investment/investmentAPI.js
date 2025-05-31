import axios from 'axios'

const API_URL = 'https://vtoxfambackend.onrender.com/api';


export const getPlansApi = async (token) => {
    const response = await axios.get(`${API_URL}/invest/plans`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const getActiveInvestments = async (token) => {
    const response = await axios.get(`${API_URL}/invest/active`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getInvestmentsHistory = async (token) => {
    const response = await axios.get(`${API_URL}/invest/history`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};