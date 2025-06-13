// src/redux/thunks/spinThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { playSpinAPI, purchaseSpinAPI, getSpinLogsAPI } from '../../services/spinAPI';

export const purchaseSpin = createAsyncThunk(
    'spin/purchaseSpin',
    async (spinCount, { rejectWithValue }) => {
        try {
            return await purchaseSpinAPI(spinCount);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to purchase spins');
        }
    }
);

export const playSpin = createAsyncThunk(
    'spin/playSpin',
    async (_, { rejectWithValue }) => {
        try {
            return await playSpinAPI();
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to play spin');
        }
    }
);

export const getSpinLogs = createAsyncThunk(
    'spin/getSpinLogs',
    async (_, { rejectWithValue }) => {
        try {
            return await getSpinLogsAPI();
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch spin logs');
        }
    }
);
