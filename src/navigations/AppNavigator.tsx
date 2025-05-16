import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import MainStackNavigator from './MainStackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminStackNavigator from './AdminStackNavigator';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
      {/* <AdminStackNavigator/> */}
    </NavigationContainer>
  );
}