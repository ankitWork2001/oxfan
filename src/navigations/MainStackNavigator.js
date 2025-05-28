import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ReferralDetailsScreen from '../components/ReferralDetailsScreen';
import PersonalDetails from '../components/PersonalDetails.';
import WalletInfoScreen from '../components/WalletInfoScreen';
import TransactionHistoryScreen from '../components/TransactionHistoryScreen';
import SettingsScreen from '../components/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import LoginScreen from '../screens/LoginScreen';
import WithdrawalScreen from '../components/WithdrawalScreen';
import DepositScreen from '../components/DepositScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="ReferralDetails" component={ReferralDetailsScreen} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="WalletInfo" component={WalletInfoScreen} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignInScreen} />
      <Stack.Screen name="Deposit" component={DepositScreen} />
      <Stack.Screen name="Withdraw" component={WithdrawalScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
