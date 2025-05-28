import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './MainStackNavigator';
import store from '../store/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import { loadUserFromStorage } from '../store/features/auth/authThunk';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from AsyncStorage on app startup
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <MainStackNavigator />
      {/* <AdminStackNavigator/> */}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
