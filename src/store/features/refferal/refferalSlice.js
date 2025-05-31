import { createSlice } from "@reduxjs/toolkit";
import { fetchReferralCode } from "./refferalThunk";

const referralSlice = createSlice({
    name: 'referral',
    initialState: {
        code: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearReferralState: (state) => {
            state.code = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export const { clearReferralState } = referralSlice.actions;

export default referralSlice.reducer;