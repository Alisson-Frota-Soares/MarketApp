import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    ToastAndroid,
} from 'react-native';

import { View, Input, Text, Form, Header, Left, Title, Item, Label } from 'native-base'
import AppIntroSlider from 'react-native-app-intro-slider';
import { LoadingAlert } from '../../components/components'


import Server from '../../server'

const servidor = new Server();

const slides = [
    {
        key: 1,
        title: 'Bem-vindo a nossa app',
        text: 'um novo jeito de se fazer compras',
        image: require("../../images/sua-logo.png"),
        backgroundColor: '#2e86c1',
    },
    {
        key: 2,
        title: 'Não perca mais tempo no caixa',
        text: 'escaneie os produtos antes de os colocar\nno carrinho de compras ',
        image: null,
        backgroundColor: '#8cc63e',
    },
    {
        key: 3,
        title: 'finalizando a compra',
        text: 'Depois de ter escaneado tudo\nbasta ir até o caixa, mostrar o código\n de barras gerado na app, pagar, e pronto\ncompra concluida!!!',
        image: null,
        backgroundColor: '#ec001c',
    }
];

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRealApp: true,
            Input: null,
            isLoading: false
        };
    }

    Login = async () => {

        this.setState({isLoading: true})

        if (this.state.Input === null || this.state.Input === "") {
            this.setState({isLoading: false})
            ToastAndroid.show("Preencha com seu numero de telemovel", 1)
            return null
        }

        const response = await servidor.signIn(this.state.Input)

        if (response.sucess) {
            this.setState({isLoading: false})
            this.props.navigation.navigate("confirmar", { confirm: response.sucess })
        } else {
            this.setState({isLoading: false})

            if (response.error.code === "auth/invalid-phone-number") {
                ToastAndroid.show("Numero inválido", 1)
            } else if (response.error.code === "auth/network-request-failed") {
                ToastAndroid.show("Falha na conexão de internet", 1)
            } else {
                ToastAndroid.show("erro desconhecido", 1)
            }
        }

        this.setState({isLoading: false})



    }

    _renderItem = ({ item }) => {
        return (
            <View style={[styles.slide, { backgroundColor: item.backgroundColor, }]}>
                <StatusBar hidden />
                <Text style={styles.title}>{item.title}</Text>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }

    render() {
        if (this.state.showRealApp) {
            return (
                <View>
                    <Header style={{ flexDirection: "row", justifyContent: "flex-start", backgroundColor: "#eee" }} androidStatusBarColor="#aaa">
                        <Left>
                            <Title style={{ color: "#0088a9" }} >Login</Title>
                        </Left>
                    </Header>

                    
                    

                    <View  >
                        <Text style={styles.Title}>Sua Marca</Text>

                        <Text style={[styles.Title, { fontSize: 16, marginBottom: 10, marginTop: 10, fontWeight: "bold" }]}>
                            Insira seu numero de telemovel{"\n"}para aceder a app
                    </Text>

                        <Form style={{ marginBottom: 20 }} >

                            <Item stackedLabel>
                                <Label>Numero de telemóvel</Label>
                                <Input style={styles.Input} keyboardType="phone-pad" onSubmitEditing={() => this.Login()} onChangeText={(e) => this.setState({ Input: e })} />
                            </Item>


                        </Form>

                        <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={() => { this.Login() }} >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Continuar</Text>
                        </TouchableOpacity>

                    </View>


                    <LoadingAlert isVisible={this.state.isLoading} />

                </View>
            )
        } else {
            return (
                <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone}
                    showSkipButton
                    skipLabel="Saltar"
                    nextLabel="Proximo"
                    doneLabel="Pronto"

                />
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        paddingVertical: 10,
    },
    Title: {
        fontSize: 25,
        textAlign: "left",
        margin: 10,
        width: "100%",
        paddingHorizontal: 5,
        marginBottom: 50,
        marginTop: 30

    },
    btn: {
        backgroundColor: "#0088a9",
        alignSelf: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0088a9",
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        color: "#fff",
        marginBottom: 30
    },
    text: {
        textAlign: "center",
        color: "#fff"
    },
    image: {
        width: 200,
        height: 150,
        marginBottom: 30
    }
})