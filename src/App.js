import React, { Component } from 'react';
import { View, Text } from 'react-native';

import home from './pages/home'
import scanCode from './pages/scanCode'
import finalizar from './pages/finalizar'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer'


const stackOptions = {

}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function homeRoute({ navigation }) {
  return (

    <Stack.Navigator >
      <Stack.Screen name="home" component={home} options={{ headerShown: false,  }} />
      <Stack.Screen name="scanear" component={scanCode} options={{ headerShown: false, }} />
      <Stack.Screen name="finalizar" component={finalizar} options={{ headerShown: false }} />
      
    </Stack.Navigator>

  )
}



export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="home" component={homeRoute} />
        </Drawer.Navigator>

      </NavigationContainer>

    )
  };
}