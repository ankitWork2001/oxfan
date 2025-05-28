import React from 'react'
import { View } from 'react-native'
import LandingScreen from './src/screens/landingScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import { Text } from 'react-native'
import LoginScreen from './src/screens/LoginScreen'
import SignInScreen from './src/screens/SignInScreen'
import { NavigationContainer } from '@react-navigation/native'
// import TabNavigator from './src/navigations/TabNavigator' 
import AppNavigator from './src/navigations/AppNavigator'
import Spinwheele from './src/screens/spinwheele'
import { Provider } from 'react-redux'
import store from './src/store/store'


const App = () => {
  return (
    <AppNavigator />

    // <View>
    //   {/* <Spinwheele /> */}

    //   {/* <LandingScreen /> */}
    //   {/* <WelcomeScreen /> */}
    //   {/* <LoginScreen /> */}
    //   <Provider store={store}>
    //     <NavigationContainer>
    //       <SignInScreen />
    //     </NavigationContainer>
    //   </Provider>

    // </View>
  )
}

export default App