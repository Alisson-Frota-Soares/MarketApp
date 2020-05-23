import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header, Left, Right } from "native-base";

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produtos: []
        };
    }

    render() {
        return (
            <View>
                <Header androidStatusBarColor="#aaa" style={styles.Header}></Header>
                <Text> home </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    Header:{
        backgroundColor:"#e0e0e0"
    }

});

