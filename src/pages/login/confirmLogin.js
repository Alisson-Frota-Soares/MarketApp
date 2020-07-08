import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
    ToastAndroid,
    Alert
} from 'react-native';

import { View, Input, Text, Form, Header, Left, Item, Label, Body, Title } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import { LoadingAlert } from '../../components/components'

import auth from '@react-native-firebase/auth'

export default class confirmLogin extends Component {
    constructor(props) {

        super(props);
        const { params } = this.props.route
        this.state = {
            Input: null,
            confirm: params.confirm,
            isLoading: false
        };
    }


    Confirmar = async () => {

        this.setState({isLoading: true})

        if (this.state.Input === null || this.state.Input === "") {
            this.setState({isLoading: false})
            ToastAndroid.show("codigo vazio, preencha o campo", 1)
            return null
        }


        try {
            const confirm = await this.state.confirm.confirm(this.state.Input)

            if (confirm) {
                this.setState({isLoading: false})

                auth().onAuthStateChanged((user) => {
                    console.warn(user)
                    this.props.navigation.replace("homeDrawer")
                })



            }


        } catch (error) {
            this.setState({isLoading: false})

            if (error.code === "auth/invalid-verification-code") {
                ToastAndroid.show("Código invalido",1)    
            } else if (error.code === "auth/network-request-failed") {
                ToastAndroid.show("Falha na conexão de internet",1)
            }else {
                ToastAndroid.show("erro desconhecido",1)
            }

            
        }

        this.setState({isLoading: false})




    }

    render() {
        return (
            <View>
                <Header style={{ flexDirection: "row", justifyContent: "flex-start", backgroundColor: "#eee" }} androidStatusBarColor="#aaa">
                    <Left>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.goBack()} >
                            <Icon name="md-arrow-back" size={30} />
                        </TouchableOpacity>
                    </Left>

                </Header>

                <View >

                    <Text style={styles.Title}>
                        Insira o código enviado por sms
                    </Text>

                    <Text style={[styles.Title, { fontSize: 16, marginTop: 0, marginBottom: 10, fontWeight: "bold" }]}>
                        vamos lhe enviar uma mensagem de texto{"\n"}
                        com o código de verificação
                    </Text>

                    <Form style={{ marginBottom: 20 }} >

                        <Item stackedLabel>
                            <Label>Código</Label>
                            <Input style={styles.Input} keyboardType="numeric" onChangeText={(e) => { this.setState({ Input: e }) }} onSubmitEditing={() => { this.Confirmar() }} />
                        </Item>


                    </Form>

                    <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={() => { this.Confirmar() }} >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Confirmar codigo</Text>
                    </TouchableOpacity>

                </View>

                <LoadingAlert isVisible={this.state.isLoading} />

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        paddingVertical: 10,
    },
    Title: {
        fontSize: 20,
        textAlign: "left",
        margin: 10,
        width: "100%",
        paddingHorizontal: 5,
        marginBottom: 20,
        marginTop: 50

    },
    btn: {
        backgroundColor: "#0088a9",
        alignSelf: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    }
})