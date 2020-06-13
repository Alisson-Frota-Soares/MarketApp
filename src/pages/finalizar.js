import React, { Component } from 'react';
import { View, Text } from 'react-native';


import Barcode from 'react-native-barcode-builder'

export default class finalizar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Barcode value="8717644799512" format="CODE128" />
      </View>
    );
  }
}
