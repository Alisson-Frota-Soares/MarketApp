import React, { Component } from 'react';
import { View, Text } from 'react-native';

import home from './pages/principais/home'
import scanCode from './pages/principais/scanCode'
import finalizar from './pages/principais/finalizar'

import login from './pages/login/login'
import confirmLogin from './pages/login/confirmLogin'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();





function homeRoute({ navigation }) {
  return (

    <Stack.Navigator initialRouteName="home" screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
      <Stack.Screen name="home" component={home} options={{ headerShown: false, }} />
      <Stack.Screen name="scanear" component={scanCode} options={{ headerShown: false }} />
      <Stack.Screen name="finalizar" component={finalizar} options={{ headerShown: false }} />

    </Stack.Navigator>


  )
}

function InitialRouteApp({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
        <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
        <Stack.Screen name="confirmar" component={confirmLogin} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}




function DrawerNav({ navigation }) {

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="home" component={homeRoute} />
      </Drawer.Navigator>

    </NavigationContainer>

  )

}


const switchApp = createSwitchNavigator({
  login: {
    screen: InitialRouteApp,
  },
  home: {
    screen: DrawerNav
  }
}, {
  initialRouteName: "login",

})


const App = createAppContainer(switchApp)

export default App;