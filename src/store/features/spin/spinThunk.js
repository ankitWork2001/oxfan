import { createAsyncThunk } from '@reduxjs/toolkit';
import { playSpinAPI, purchaseSpinAPI, getSpinLogsAPI, prizelistAPI, getSpinCountAPI } from './spinApi';

export const purchaseSpin = createAsyncThunk(
    'spin/purchaseSpin',
    async (spinCount, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            return await purchaseSpinAPI(token, spinCount);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to purchase spins');
        }
    }
);

export const playSpin = createAsyncThunk(
    'spin/playSpin',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            return await playSpinAPI(token);
        } catch (err) {
            console.log('playSpin API error:', err?.response?.data || err.message);
            return rejectWithValue(err?.response?.data?.message || 'Failed to play spin');
        }
    }

);
export const prizelist = createAsyncThunk(
    'spin/prizelist',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            return await prizelistAPI(token);
        } catch (err) {
            console.log('prizelist API error:', err?.response?.data || err.message);
            return rejectWithValue(err?.response?.data?.message || 'Failed to get prizelist');
        }
    }
);

export const getSpinLogs = createAsyncThunk(
    'spin/getSpinLogs',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            return await getSpinLogsAPI(token);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch spin logs');
        }
    }
);

export const getSpinCount = createAsyncThunk(
    'spin/getSpinCount',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            return await getSpinCountAPI(token);
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || 'Failed to fetch spin count');
        }
    }
);