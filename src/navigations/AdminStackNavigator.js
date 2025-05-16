import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoardScreen from '../adminTemplateScreens/DashBoardScreen';
import UsersScreen from '../adminTemplateScreens/UsersScreen';
import InvestmentsScreen from '../adminTemplateScreens/InvestmentsScreen';
import SpinLogsScreen from '../adminTemplateScreens/SpinLogsScreen';
import DepositsScreen from '../adminTemplateScreens/DepositsScreen';
import WithdrawalsScreen from '../adminTemplateScreens/WithdrawalsScreen';
import AdminSettingsScreen from '../adminTemplateScreens/AdminSettingsScreen';


const Stack = createNativeStackNavigator();

const AdminStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={DashBoardScreen} />
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="Investments" component={InvestmentsScreen} />
            <Stack.Screen name="SpinLogs" component={SpinLogsScreen} />
            <Stack.Screen name="Deposits" component={DepositsScreen} />
            <Stack.Screen name="Withdrawals" component={WithdrawalsScreen} />
            <Stack.Screen name="Settings" component={AdminSettingsScreen} />
        </Stack.Navigator>
    );
};

export default AdminStackNavigator;
