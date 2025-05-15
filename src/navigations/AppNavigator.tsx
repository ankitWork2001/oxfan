import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import MainStackNavigator from './MainStackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoardScreen from '../adminTemplateScreens/DashBoardScreen';
import UsersScreen from '../adminTemplateScreens/UsersScreen';
import InvestmentsScreen from '../adminTemplateScreens/InvestmentsScreen';
import SpinLogsScreen from '../adminTemplateScreens/SpinLogsScreen';
import DepositsScreen from '../adminTemplateScreens/DepositsScreen';
import WithdrawalsScreen from '../adminTemplateScreens/WithdrawalsScreen';
import SettingsScreen from '../adminTemplateScreens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={DashBoardScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Investments" component={InvestmentsScreen} />
        <Stack.Screen name="SpinLogs" component={SpinLogsScreen} />
        <Stack.Screen name="Deposits" component={DepositsScreen} />
        <Stack.Screen name="Withdrawals" component={WithdrawalsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        {/* Add other screens here */}
      </Stack.Navigator>
      {/* <MainStackNavigator /> */}
    </NavigationContainer>
  );
}


// import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart'

// const DashBoardScreen = () => {
//     return (
//         <SafeAreaView>
//             <ScrollView>
//                 <AdminTemplateHeaderPart />
//             </ScrollView>
//         </SafeAreaView>
//     )
// }

// export default DashBoardScreen

// const styles = StyleSheet.create({})