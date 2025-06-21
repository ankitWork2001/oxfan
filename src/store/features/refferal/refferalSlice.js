import { createSlice } from "@reduxjs/toolkit";
import {
    fetchReferralCode,
    submitReferral,
    fetchReferralTree // Import the new thunk
} from "./refferalThunk";

const referralSlice = createSlice({
    name: 'referral',
    initialState: {
        code: null,
        tree: null, // Add tree to hold referral tree data
        loading: false,
        error: null,
        submitSuccess: false,
    },
    reducers: {
        clearReferralState: (state) => {
            state.code = null;
            state.tree = null; // Clear tree as well
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
            .addCase(submitReferral.fulfilled, (state) => {
                state.loading = false;
                state.submitSuccess = true;
            })
            .addCase(submitReferral.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.submitSuccess = false;
            })
            //  Fetch Referral Tree
            .addCase(fetchReferralTree.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReferralTree.fulfilled, (state, action) => {
                state.loading = false;
                state.tree = action.payload.referralTree; // Set the tree data
            })
            .addCase(fetchReferralTree.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearReferralState } = referralSlice.actions;

export default referralSlice.reducer;
