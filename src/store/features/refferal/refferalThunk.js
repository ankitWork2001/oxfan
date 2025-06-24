import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRefferalCode, getRefferalSummary, getRefferalTree, subscribeReferral } from './refferalApi';

// Async Thunk
export const fetchReferralCode = createAsyncThunk(
    'referral/fetchReferralCode',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token; // ✅ get token from Redux
            const data = await getRefferalCode(token);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch referral code'
            );
        }
    }
);
export const fetchReferralTree = createAsyncThunk(
    'referral/fetchReferralTree',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token; // ✅ get token from Redux
            const data = await getRefferalTree(token);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch referral code'
            );
        }
    }
);

export const submitReferral = createAsyncThunk(
    'referral/submitReferral',
    async ({ referralCode, token }, thunkAPI) => {
        try {
            const response = await subscribeReferral(token, referralCode);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Referral submission failed'
            );
        }
    }
);
