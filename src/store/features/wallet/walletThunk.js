import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactions, getWalletBalance } from './walletApi';

export const fetchWalletBalance = createAsyncThunk(
    'wallet/fetchWalletBalance',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token; // ✅ get token from Redux
            const data = await getWalletBalance(token);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch referral code'
            );
        }
    }
);
export const fetchTransactions = createAsyncThunk(
    'wallet/fetchTransactions',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token; // ✅ get token from Redux
            const data = await getTransactions(token);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch referral code'
            );
        }
    }
);
