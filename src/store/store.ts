import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import investmentReducer from './features/investment/investmentSlice';
import adminInvestmentReducer from './features/adminInvestment/investemntsSlice';  // renamed here
import adminAllUserReducer from './features/adminUsers/adminUsersSlice'
import adminDashboardReducer from './features/adminDashboard/adminDashboardSlice'
import adminSpinLogsReducer from './features/adminSpinLogs/adminSpinLogsSlice';
import depositsReducer from './features/adminDeposits/adminDepositsSlice';
import withdrawalsReducer from './features/adminWithdrawals/adminWithdrawalsSlice';
import plansReducer from './features/adminPlans/adminPlansSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    investment: investmentReducer,       // from investmentSlice
    adminInvestment: adminInvestmentReducer,  // from adminInvestment slice
    adminAllUser: adminAllUserReducer, // from adminAllUserReducer slice
    adminDashboard: adminDashboardReducer, // from adminAllUserReducer slice
    adminSpinLogs: adminSpinLogsReducer,
    deposits: depositsReducer,
    withdrawals: withdrawalsReducer,
    plans: plansReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
