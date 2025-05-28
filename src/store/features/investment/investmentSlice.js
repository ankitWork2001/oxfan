import { createSlice } from "@reduxjs/toolkit";
import { getPlans, fetchActiveInvestments } from "./investmentThunk";

const investmentSlice = createSlice({
    name: "investment",
    initialState: {
        // Investment Plans
        investmentPlans: [],
        plansLoading: false,
        plansError: null,

        // Active Investments
        activeInvestments: [],
        activeLoading: false,
        activeError: null,

        // General loading/error (optional)
        loading: false,
        error: null
    },
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            // Handle getPlans actions
            .addCase(getPlans.pending, (state) => {
                state.plansLoading = true;
                state.plansError = null;
                state.loading = true; // Optional general loading
            })
            .addCase(getPlans.fulfilled, (state, action) => {
                state.plansLoading = false;
                state.investmentPlans = action.payload;
                state.loading = false; // Optional general loading
            })
            .addCase(getPlans.rejected, (state, action) => {
                state.plansLoading = false;
                state.plansError = action.payload || "Failed to fetch investment plans";
                state.loading = false; // Optional general loading
                state.error = action.payload || "Failed to fetch investment plans"; // Optional general error
            })

            // Handle fetchActiveInvestments actions
            .addCase(fetchActiveInvestments.pending, (state) => {
                state.activeLoading = true;
                state.activeError = null;
                state.loading = true; // Optional general loading
            })
            .addCase(fetchActiveInvestments.fulfilled, (state, action) => {
                state.activeLoading = false;
                state.activeInvestments = action.payload;
                state.loading = false; // Optional general loading
            })
            .addCase(fetchActiveInvestments.rejected, (state, action) => {
                state.activeLoading = false;
                state.activeError = action.payload || "Failed to fetch active investments";
                state.loading = false; // Optional general loading
                state.error = action.payload || "Failed to fetch active investments"; // Optional general error
            });
    },
});

export default investmentSlice.reducer;