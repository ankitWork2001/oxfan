// src/services/rewardAPI.js
import axios from 'axios'

const API_URL = 'https://spine.onrender.com/api/reward';

export const getRewardWallet = async (token) => {
    const response = await axios.get(`${API_URL}/getreward`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const getReferralBonusHistory = async (token) => {
    const response = await axios.get(`${API_URL}/ReferralBonusHistory`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const getReferralSummary = async (token) => {
    const response = await axios.get(`${API_URL}/referral-summary`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};