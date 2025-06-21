// src/store/features/reward/rewardThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getReferralBonusHistory, getReferralSummary, getRewardWallet } from './rewardApi';

export const fetchRewardWallet = createAsyncThunk(
    'reward/fetchRewardWallet',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token; // ✅ adjust if your token is in a different slice
            const data = await getRewardWallet(token);
            return data;
        } catch (error) {
            console.error('Error fetching reward wallet:', error);
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

export const fetchReferralBonusHistory = createAsyncThunk(
    'reward/fetchReferralBonusHistory',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token; // ✅ adjust if your token is in a different slice
            const data = await getReferralBonusHistory(token);
            return data;
        } catch (error) {
            console.error('Error fetching reward history:', error);
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

export const fetchReferralSummary = createAsyncThunk(
    'reward/fetchReferralSummary',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token; // ✅ adjust if your token is in a different slice
            const data = await getReferralSummary(token);
            return data;
        } catch (error) {
            console.error('Error fetching reward history:', error);
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);
