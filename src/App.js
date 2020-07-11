import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

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



import { LoadingAlert } from './components/components'

import auth from '@react-native-firebase/auth'
import server from './server'

const servidor = new server()



import {
  Drawer,
} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Stack = createStackNavigator();
const DrawerComp = createDrawerNavigator();
const SwitchComp = createStackNavigator();


let isLoading = false
let loadMsg = "A carregar"
















////////////////////////////////////


function homeRoute({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="home" screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
      <Stack.Screen name="home" component={home} options={{ headerShown: false, }} />
      <Stack.Screen name="scanear" component={scanCode} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }} />
      <Stack.Screen name="finalizar" component={finalizar} options={{ headerShown: false }} />
      <Stack.Screen name="produtoInfo" component={produtoInfo} options={{ headerShown: false }} />

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
    <View style={{ flex: 1 }}>

      <View style={styles.drawerHeader}>
        <Image source={require("./images/sua-logo.png")} style={{ width: 100, height: 100 }} />
      </View>
      <DrawerContentScrollView {...props} >
        <View
          style={
            styles.drawerContent
          }
        >




          <Drawer.Section style={styles.drawerSection}>



            <DrawerItemList {...props} />

          </Drawer.Section>
          <Drawer.Section title="outras coisas">
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="logout"
                  color="#0088a9"
                  size={size}
                />
              )}
              label="Encerrar sessão"
              onPress={async () => {
                isLoading = true

                
                //const response = await servidor.signOut(this.props)
                //isLoading= false

/*
                if (response.sucess) {
                  console.warn("sucess")

                  //this.props.navigation.replace("login")


                } else {
                  console.warn("erro")
                  //alert(response.error)

                }*/

              }}

            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}





function DrawerNav({ navigation }) {



  return (
    <DrawerComp.Navigator drawerType="back" drawerContent={(props) => <DrawerContent {...props} />} drawerContentOptions={{ activeBackgroundColor: "rgba(0, 135, 169, 0.5)", activeTintColor: "#fff", inactiveTintColor: "#0088a9", }} >
      <DrawerComp.Screen
        name="home"
        component={homeRoute}
        options={{
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="home" size={30} color={color} />,

        }}
      />



    </DrawerComp.Navigator>


  )

}

function switchApp({ navigation }) {
  return (
    <NavigationContainer>
      <SwitchComp.Navigator initialRouteName={auth().currentUser ? "homeDrawer" : "login"} screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
        <SwitchComp.Screen name="login" component={InitialRouteApp} />
        <SwitchComp.Screen name="homeDrawer" component={DrawerNav} />
      </SwitchComp.Navigator>
      <LoadingAlert isVisible={isLoading} loadMsg={loadMsg} />
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
    justifyContent: "center",
    alignItems: "center"
  }
})


export default switchApp;