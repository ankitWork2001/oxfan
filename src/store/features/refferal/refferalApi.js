import axios from 'axios'

const API_URL = 'https://spine.onrender.com/api/referral';


export const getRefferalCode = async (token) => {
    const response = await axios.get(`${API_URL}/code`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getRefferalTree = async (token) => {
    const response = await axios.get(`${API_URL}/tree`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const subscribeReferral = async (token, referralCode) => {
    const response = await axios.post(
        `${API_URL}/refer`,
        { referralCode }, // Pass the referral code in the request body
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};