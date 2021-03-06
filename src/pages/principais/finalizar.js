import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert
} from 'react-native';


import { Header, Left } from 'native-base'

import Barcode from 'react-native-barcode-builder'
import carrinhos from '../../carrinhos'



export default class finalizar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: null,
      index: null
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    this.cancel()
    return true;
  }

  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    
    const { params } = this.props.route

    //caso nao houver recebido o codigo, volta para tela home
    if (params.code) {

      
      this.setState({ index: params.index })

      //verificações para ver se o codigo é valido
      //e algumas formatações depenendo da condição
      if (typeof (params.code) == "number") {
        this.setState({ barcode: params.code.toString() }) //transforma em string se o cod for numeros
      } else if (typeof (params.code) == "string") {
        this.setState({ barcode: params.code })
      } else {
        this.props.navigation.goBack()
      }


    } else {
      this.props.navigation.goBack()
    }

  }


  cancel() {

    Alert.alert("cancelar")
    carrinhos.splice(this.state.index, 1)
    


    this.props.navigation.goBack()
  }

  render() {
    if (this.state.barcode) {

      return (
        <View style={{ flex: 1 }}>
          <Header androidStatusBarColor="#aaa" style={{ justifyContent: "flex-start", backgroundColor: "#eee", }}>

            <Left>
              <TouchableOpacity onPress={() => this.cancel()} >
                <Text style={styles.txt}>Cancelar</Text>
              </TouchableOpacity>
            </Left>

          </Header>


          <View style={{ flexGrow: 1, justifyContent: "center" }}>

            <Barcode value={this.state.barcode} format="CODE128" background="#fff" flat text={this.state.barcode} />

          </View>













        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <ActivityIndicator size={35} />
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  codeTxt: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#008800",
  },
  txt: {
    fontSize: 18,
    color: "#0088a9"
  }
})