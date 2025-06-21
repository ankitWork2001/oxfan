import axios from 'axios';

const API_URL = 'https://spine.onrender.com/api/spin';

export const purchaseSpinAPI = async (token, spinCount) => {
    const response = await axios.post(`${API_URL}/purchase`, { spinCount }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
export const playSpinAPI = async (token) => {
    const response = await axios.get(`${API_URL}/play`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
export const prizelistAPI = async (token) => {
    const response = await axios.get(`${API_URL}/prizelist`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.prizes;
};

export const getSpinLogsAPI = async (token) => {
    const response = await axios.get(`${API_URL}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
export const getSpinCountAPI = async (token) => {
    const response = await axios.get(`${API_URL}/count`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
