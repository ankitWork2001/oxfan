import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ReferralDetailsScreen from '../components/ReferralDetailsScreen';
import PersonalDetails from '../components/PersonalDetails.';
import WalletInfoScreen from '../components/WalletInfoScreen';
import TransactionHistoryScreen from '../components/TransactionHistoryScreen';
import SettingsScreen from '../components/SettingsScreen';

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
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
