// src/store/features/reward/rewardSlice.js

import { createSlice } from '@reduxjs/toolkit';
import {
    fetchRewardWallet,
    fetchReferralBonusHistory,
    fetchReferralSummary,
} from './rewardThunk';

const initialState = {
    rewardBalance: [],
    referralBonusHistory: [],
    referralSummary: [],
    loading: false,
    error: null,
};

const rewardSlice = createSlice({
    name: 'reward',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // === Fetch Reward Wallet ===
            .addCase(fetchRewardWallet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRewardWallet.fulfilled, (state, action) => {
                state.loading = false;
                state.rewardBalance = action.payload;
            })
            .addCase(fetchRewardWallet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch reward wallet';
            })
            // === Fetch Referral Bonus History ===
            .addCase(fetchReferralBonusHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReferralBonusHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.referralBonusHistory = action.payload.data || [];
            })
            .addCase(fetchReferralBonusHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch referral bonus history';
            })
            // === Fetch Referral  Summary ===
            .addCase(fetchReferralSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReferralSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.referralSummary = action.payload.data;
            })
            .addCase(fetchReferralSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch referral bonus history';
            })
    },
});

export default rewardSlice.reducer;
