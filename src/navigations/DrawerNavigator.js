import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DashBoardScreen from '../adminTemplateScreens/DashBoardScreen';
import UsersScreen from '../adminTemplateScreens/UsersScreen';
import SpinLogsScreen from '../adminTemplateScreens/SpinLogsScreen';
import InvestmentsScreen from '../adminTemplateScreens/InvestmentsScreen';
import DepositsScreen from '../adminTemplateScreens/DepositsScreen';
import ReportingTransactionScreen from '../adminTemplateScreens/ReportingTransactionScreen';
import WithdrawalsScreen from '../adminTemplateScreens/WithdrawalsScreen';
import ReferralsScreen from '../adminTemplateScreens/ReferralsScreen';
import SettingsScreen from '../adminTemplateScreens/SettingsScreen';
import SupportTicketsScreen from '../adminTemplateScreens/SupportTicketsScreen';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: true }}>
            <Drawer.Screen
                name="Dashboard"
                component={DashBoardScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="dashboard" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Users"
                component={UsersScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="group" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Investments"
                component={InvestmentsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="business-center" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Spin Logs"
                component={SpinLogsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="motion-photos-on" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Deposits"
                component={DepositsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="file-upload" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Reporting & Transaction"
                component={ReportingTransactionScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="compare-arrows" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Withdrawals"
                component={WithdrawalsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="file-upload" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Referrals"
                component={ReferralsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="person-add" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="settings" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Support Tickets"
                component={SupportTicketsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="help-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
