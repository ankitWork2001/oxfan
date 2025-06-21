// src/redux/slices/spinSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { playSpin, purchaseSpin, getSpinLogs, prizelist, getSpinCount } from './spinThunk';


const initialState = {
    loading: false,
    error: null,
    spinLogs: [],
    prizeList: [],
    lastSpinResult: null,
    remainingSpins: 0,
    walletBalance: 0,
};

const spinSlice = createSlice({
    name: 'spin',
    initialState,
    reducers: {
        clearSpinState: (state) => {
            state.error = null;
            state.lastSpinResult = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(purchaseSpin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(purchaseSpin.fulfilled, (state, action) => {
                state.loading = false;
                state.remainingSpins = action.payload.updatedSpinCount;
                state.walletBalance = action.payload.remainingBalance;
            })
            .addCase(purchaseSpin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(playSpin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(playSpin.fulfilled, (state, action) => {
                state.loading = false;
                state.lastSpinResult = action.payload.spin;
                state.remainingSpins = action.payload.userData?.spinCount ?? state.remainingSpins;
                state.walletBalance = action.payload.UserReward?.rewardBalance ?? state.walletBalance;
            })
            .addCase(playSpin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getSpinLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSpinLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.spinLogs = action.payload.spins;
            })
            .addCase(getSpinLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //priceLIsts
            .addCase(prizelist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(prizelist.fulfilled, (state, action) => {
                state.loading = false;
                state.prizeList = action.payload || [];
            })
            .addCase(prizelist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
            //spin count
            .addCase(getSpinCount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSpinCount.fulfilled, (state, action) => {
                state.loading = false;
                state.remainingSpins = action.payload.spinCount ?? 0;
            })
            .addCase(getSpinCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { clearSpinState } = spinSlice.actions;
export default spinSlice.reducer;
