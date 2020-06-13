import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native';


import { Header, Left } from 'native-base'

import Barcode from 'react-native-barcode-builder'
import carrinhos from '../carrinhos'



export default class finalizar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: null
    };
  }

  barcode(){
    return <Barcode value={this.state.barcode} format="CODE128" background="#fff" flat text={this.state.barcode} />
  }

  componentDidMount() {
    console.warn(carrinhos)

    const { params } = this.props.route

    if (params.code) {

      if (typeof (params.code) == "number") {
        this.setState({ barcode: params.code.toString() })
      } else if (typeof (params.code) == "string") {
        this.setState({ barcode: params.code })
      } else {
        this.props.navigation.goBack()
      }


    } else {
      this.props.navigation.goBack()
    }

  }

  render() {
    if (this.state.barcode) {

      return (
        <View>
          <Header androidStatusBarColor="#aaa" style={{ justifyContent: "flex-start", backgroundColor: "#eee", }}>

            <Left>
              <TouchableOpacity >
                <Text style={styles.txt}>Cancelar</Text>
              </TouchableOpacity>
            </Left>

          </Header>

          
          <View style={{flex:1, justifyContent:"center"}}>
              
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