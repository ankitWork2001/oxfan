import { createSlice } from "@reduxjs/toolkit";
import { fetchReferralCode, submitReferral } from "./refferalThunk";

const referralSlice = createSlice({
    name: 'referral',
    initialState: {
        code: null,
        loading: false,
        error: null,
        submitSuccess: false, // Added to track referral submission success
    },
    reducers: {
        clearReferralState: (state) => {
            state.code = null;
            state.loading = false;
            state.error = null;
            state.submitSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Referral Code
            .addCase(fetchReferralCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReferralCode.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload;
            })
            .addCase(fetchReferralCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Submit Referral
            .addCase(submitReferral.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.submitSuccess = false;
            })
            .addCase(submitReferral.fulfilled, (state, action) => {
                state.loading = false;
                state.submitSuccess = true;
            })
            .addCase(submitReferral.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.submitSuccess = false;
            });
    },
});

export const { clearReferralState } = referralSlice.actions;

export default referralSlice.reducer;
