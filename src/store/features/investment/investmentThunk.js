import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPlansApi, getActiveInvestments } from './investmentAPI';

export const getPlans = createAsyncThunk(
    'investment/getPlans',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token; // ✅ get token from Redux
            const data = await getPlansApi(token);
            return data.plans;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const fetchActiveInvestments = createAsyncThunk(
    'investment/fetchActiveInvestments',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) throw new Error('No authentication token found');
            const data = await getActiveInvestments(token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);