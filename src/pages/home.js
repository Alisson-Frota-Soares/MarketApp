import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Header, Left, Right, Body } from "native-base";

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import IconIonicons from 'react-native-vector-icons/Ionicons'


export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produtos: []
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header androidStatusBarColor="#aaa" style={styles.Header}>
                    <Left>
                        <TouchableOpacity style={styles.Left} onPress={() => this.props.navigation.openDrawer()}>
                            <IconMaterial name="menu" size={30} />
                        </TouchableOpacity>

                    </Left>
                    <Body>
                        <Text style={styles.txtTotal}>00€</Text>
                    </Body>
                    <Right>
                        <TouchableOpacity style={styles.Left} >
                            <IconIonicons name="ios-more" size={30} />
                        </TouchableOpacity>


                    </Right>
                </Header>





                <TouchableOpacity activeOpacity={0.5} style={styles.floatButton}
                    onPress={() => this.props.navigation.navigate("scanear") }
                >
                    <IconIonicons name="ios-barcode" size={35} color="#fff" />
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    Header: {
        backgroundColor: "#e0e0e0"
    },
    left: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: "center"
    },
    floatButton: {
        width: 60,
        height: 60,
        borderRadius: 60,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: "#0088a9",
    },
    txtTotal: {

        textAlign: "center"
    }

});

