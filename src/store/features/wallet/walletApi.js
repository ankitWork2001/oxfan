import axios from 'axios'

const API_URL = 'https://spine.onrender.com/api/wallet';


export const getWalletBalance = async (token) => {
    const response = await axios.get(`${API_URL}/balance`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};