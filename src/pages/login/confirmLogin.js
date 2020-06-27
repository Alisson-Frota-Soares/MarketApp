import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Button
} from 'react-native';

import { View, Input, Text, Form, Header, Left, Item, Label, Body, Title} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

export default class confirmLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    Confirmar(){
        this.props.navigation.replace("homeDrawer")
    }

    render() {
        return (
            <View>
                <Header style={{ flexDirection: "row", justifyContent: "flex-start", backgroundColor: "#eee" }} androidStatusBarColor="#aaa">
                    <Left>
                        <TouchableOpacity style={{padding:10}} onPress={() => this.props.navigation.goBack()} >
                            <Icon name="md-arrow-back" size={30} />
                        </TouchableOpacity>
                    </Left>
                    
                </Header>

                <View >
                    
                    <Text style={styles.Title}>
                        Insira o código enviado por sms
                    </Text>

                    <Text style={[styles.Title, {fontSize:16, marginTop:0, marginBottom:10, fontWeight:"bold"}]}>
                        vamos lhe enviar uma mensagem de texto{"\n"}
                        com o código de verificação
                    </Text>

                    <Form style={{marginBottom:20}} >

                        <Item stackedLabel>
                            <Label>Código</Label>
                            <Input style={styles.Input} keyboardType="numeric" />
                        </Item>


                    </Form>

                    <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={() => {this.Confirmar()}} >
                        <Text style={{color:"#fff", fontWeight:"bold"}}>Confirmar codigo</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent:"center",
        flex:1,
        paddingVertical: 10,
    },
    Title: {
        fontSize: 20,
        textAlign: "left",
        margin: 10,
        width: "100%",
        paddingHorizontal:5,
        marginBottom:20,
        marginTop:50

    },
    btn: {
        backgroundColor: "#0088a9",
        alignSelf:"center",
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:5
    }
})