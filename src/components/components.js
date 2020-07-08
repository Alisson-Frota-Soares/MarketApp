import React, { Component } from 'react';
import { View, Text, Modal, ActivityIndicator } from 'react-native';

export class LoadingAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <Modal visible={this.props.isVisible} transparent={true} statusBarTranslucent={true}  >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(000,000,000, 0.5)" }}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: "#fff", fontSize: 16 }}>{this.props.loadMsg ? this.props.loadMsg : "A carregar"}</Text>
                </View>
            </Modal>
        );
    }
}


