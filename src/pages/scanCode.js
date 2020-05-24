import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal
} from 'react-native';

import { RNCamera } from 'react-native-camera'

export default class scanCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <RNCamera style={styles.cameraView}
                
                    onBarCodeRead={(code)=> alert(code.data) }
                />
                {/*
                <View style={styles.maskCam}>
                    <View></View>
                    <View></View>
                    <View></View>
                </View>*/}

            </View>
        );
    }
}




const styles = StyleSheet.create({
    cameraView: {
        flex: 1,
    },
    maskCam: {
        flex: 1,
        backgroundColor: "#ff0000",
        position: "absolute",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        opacity: 0.5,
    }
});