import axios from 'axios'

const API_URL = 'https://vtoxfambackend.onrender.com/api';


export const getRefferalCode = async (token) => {
    const response = await axios.get(`${API_URL}/referral/code`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};