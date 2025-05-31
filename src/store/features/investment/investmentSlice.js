import { createSlice } from "@reduxjs/toolkit";
import { getPlans, fetchActiveInvestments, fetchInvestmentsHistory } from "./investmentThunk";

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

        // Active Investments
        investmentsHistory: [],
        historyLoading: false,
        historyError: null,

        // General loading/error (optional)
        loading: false,
        error: null
    },
    reducers: {},
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
            })

            // Handle fetchInvestmentsHistory actions
            .addCase(fetchInvestmentsHistory.pending, (state) => {
                state.historyLoading = true;
                state.historyError = null;
                state.loading = true; 
            })
            .addCase(fetchInvestmentsHistory.fulfilled, (state, action) => {
                state.historyLoading = false;
                state.investmentsHistory = action.payload;
                state.loading = false; 
            })
            .addCase(fetchInvestmentsHistory.rejected, (state, action) => {
                state.historyLoading = false;
                state.historyError = action.payload || "Failed to fetch investments history";
                state.loading = false;
                state.error = action.payload || "Failed to fetch investments history"; 
            });
    },
});

export default investmentSlice.reducer;