import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import investmentReducer from './features/investment/investmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    investment: investmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
