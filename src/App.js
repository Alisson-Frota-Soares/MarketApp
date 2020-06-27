import React, { Component } from 'react';
import { View, Text, BackHandler, SafeAreaView, ScrollView } from 'react-native';

import home from './pages/principais/home'
import scanCode from './pages/principais/scanCode'
import finalizar from './pages/principais/finalizar'
import produtoInfo from './pages/principais/produtoInfo'

import login from './pages/login/login'
import confirmLogin from './pages/login/confirmLogin'


import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Switch = createStackNavigator();





function homeRoute({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="home" screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
      <Stack.Screen name="home" component={home} options={{ headerShown: false, }} />
      <Stack.Screen name="scanear" component={scanCode} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }} />
      <Stack.Screen name="finalizar" component={finalizar} options={{ headerShown: false }} />
      <Stack.Screen name="produtoInfo" component={produtoInfo} options={{headerTitle:"informações do produto" }} />

    </Stack.Navigator>


  )
}




function InitialRouteApp({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="login" screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
      <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
      <Stack.Screen name="confirmar" component={confirmLogin} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}




const DrawerContent = (props) => {

  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: "#0088a9",}}  >
      <DrawerItemList {...props} activeBackgroundColor="#007798" activeTintColor="#fff" itemStyle={{margin:0}} />
    </DrawerContentScrollView>
  )
}





function DrawerNav({ navigation, route }) {



  return (
    <Drawer.Navigator drawerType="back" drawerContent={(props) => <DrawerContent {...props} />}  >
      <Drawer.Screen name="home" component={homeRoute}/>
    </Drawer.Navigator>


  )

}

function switchApp({ navigation }) {
  return (
    <NavigationContainer>
      <Switch.Navigator initialRouteName="homeDrawer" screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
        <Switch.Screen name="login" component={InitialRouteApp} />
        <Switch.Screen name="homeDrawer" component={DrawerNav} />
      </Switch.Navigator>
    </NavigationContainer>
  )
}


/*
const switchApp = createSwitchNavigator({
  Login: {
    screen: InitialRouteApp,
  },
  Home: {
    screen: DrawerNav
  }
}, {
  initialRouteName: "Login",

})*/


//const App = createAppContainer(switchApp)



export default switchApp;