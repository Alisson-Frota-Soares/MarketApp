import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import home from './pages/principais/home'
import scanCode from './pages/principais/scanCode'
import finalizar from './pages/principais/finalizar'
import produtoInfo from './pages/principais/produtoInfo'

import login from './pages/login/login'
import confirmLogin from './pages/login/confirmLogin'


import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'


import {
  Drawer,
} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();
const DrawerComp = createDrawerNavigator();
const SwitchComp = createStackNavigator();





function homeRoute({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="home" screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
      <Stack.Screen name="home" component={home} options={{ headerShown: false, }} />
      <Stack.Screen name="scanear" component={scanCode} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }} />
      <Stack.Screen name="finalizar" component={finalizar} options={{ headerShown: false }} />
      <Stack.Screen name="produtoInfo" component={produtoInfo} options={{ headerTitle: "informações do produto" }} />

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
    <View style={{flex:1}}>
      <View style={styles.drawerHeader}>
        <Image source={require("./images/sua-logo.png")} style={{width:100, height:100}} />
      </View>
      <DrawerContentScrollView {...props} >
        <View
          style={
            styles.drawerContent
          }
        >




          <Drawer.Section style={styles.drawerSection}>



            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home"
                  color="#0088a9"
                  size={size}
                />
              )}
              label="Inicio"
              onPress={() => { props.navigation.navigate("home") }}
            />

          </Drawer.Section>
          <Drawer.Section title="outras coisas">

          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}





function DrawerNav({ navigation, route }) {



  return (
    <DrawerComp.Navigator drawerType="back" drawerContent={(props) => <DrawerContent {...props} />}  >
      <DrawerComp.Screen name="home" component={homeRoute} />
    </DrawerComp.Navigator>


  )

}

function switchApp({ navigation }) {
  return (
    <NavigationContainer>
      <SwitchComp.Navigator initialRouteName="homeDrawer" screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
        <SwitchComp.Screen name="login" component={InitialRouteApp} />
        <SwitchComp.Screen name="homeDrawer" component={DrawerNav} />
      </SwitchComp.Navigator>
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

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerHeader: {
    width: "100%",
    height: 150,
    backgroundColor: "#0088a9",
    justifyContent:"center",
    alignItems:"center"
  }
})


export default switchApp;