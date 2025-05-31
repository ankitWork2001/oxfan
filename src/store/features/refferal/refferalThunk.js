import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRefferalCode } from './refferalApi';

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
