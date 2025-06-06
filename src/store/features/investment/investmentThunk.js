import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPlansApi, getActiveInvestments, getInvestmentsHistory, subscribeInvestment } from './investmentAPI';

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

export const fetchInvestmentsHistory = createAsyncThunk(
    'investment/fetchInvestmentsHistory',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) throw new Error('No authentication token found');
            const data = await getInvestmentsHistory(token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getSubscribeInvestments = createAsyncThunk(
    'investment/getSubscribeInvestments',
    async ({ id, data }, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) throw new Error('No authentication token found');
            const response = await subscribeInvestment(id, data, token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.message || error.message);
        }
    }
);