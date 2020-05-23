import React, { Component } from 'react';
import { View, Text } from 'react-native';

import RCTCamera, {RNCamera} from "react-native-camera";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <RNCamera style={{width:'100%', height: '100%'}}
          onBarCodeRead={(code) => alert(code.data)}
        
        />
      </View>
    );
  }
}
