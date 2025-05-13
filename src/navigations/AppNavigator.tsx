import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import MainStackNavigator from './MainStackNavigator';
import DrawerNavigator from './DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
      {/* <MainStackNavigator /> */}
    </NavigationContainer>
  );
}
