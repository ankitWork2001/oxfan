import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactions, fetchWalletBalance } from './walletThunk';

const initialState = {
    balance: null,
    transactions: [],
    loading: false,
    error: null,
};

const walletBalanceSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        clearWalletBalanceState: (state) => {
            state.balance = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWalletBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWalletBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.balance = action.payload.wallet; // assuming API returns { balance: ... }
            })
            .addCase(fetchWalletBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Transactions
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload.transactions; // assuming API returns { balance: ... }
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { clearWalletBalanceState } = walletBalanceSlice.actions;

export default walletBalanceSlice.reducer;
