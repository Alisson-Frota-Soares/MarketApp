import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Alert
} from 'react-native';

import { Header, Left, Right, Body, Title, Radio } from "native-base";

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { LoadingAlert } from '../../components/components'





import Server from '../../server'

const servidor = new Server();

export default class home extends Component {
    constructor(props) {
        super(props);
        this.addProduto.bind(this)
        this.state = {
            carrinho: [],
            isSelecting: false,
            isLoading: false,
            loadMsg: "A carregar"
        };
    }

    componentDidMount() {

        servidor.iscurrentUser(this.props)//desloga o app se nao houver usuario

    }
    addProduto = (id) => {
        this.setState({ isLoading: true, loadMsg: "Procurando o produto" })


        //request ao servidor        
        let response = servidor.procurarProduto(id, this.state.carrinho)

        //verifica se encontrou o produto com sucesso
        if (response.sucess) {

            this.setState({ isLoading: false })
            //se o produto ja estiver no carrinho aumenta a quantidade
            if (response.isOnList) {

                this.state.carrinho[response.indexOnLIST].quantidade++
                this.forceUpdate()
            } else if (response.produto) {

                //se o produto nao estiver no carrinho ele adiciona o produto no carrinho

                this.state.carrinho.push(response.produto)
                this.forceUpdate()
            }


        } else {
            this.setState({ isLoading: false })
            Alert.alert("erro", response.msg)
        }





    }

    finalizarCompra() {
        this.setState({ isLoading: true, loadMsg: "A finalizar a sua compra" })

        //request a uma função no servidor, que tenta finalizar a compra
        let response = servidor.finalizarCompra(this.state.carrinho, this.state.carrinho.length)


        //verificação se o servidor conseguiu finalizar a compra ou não
        if (response.sucess) {
            this.setState({ isLoading: false })
            //caso tudo tenha ocorrido com sucesso, vai para tela "finalizar"
            //e mostra o cod de barras da compra, para ser escaneado no caixa do supermercado
            this.props.navigation.navigate("finalizar", { code: response.id, index: response.index })
        } else {
            this.setState({ isLoading: false })
            Alert.alert("erro", response.msg)
        }


    }



    card(item, index) {

        return (
            <TouchableOpacity style={!item.selected ? styles.card : [styles.card, { backgroundColor: "#abd4de" }]}
                onLongPress={() => {

                    item.selected = item.selected ? false : true
                    this.isSelecting()

                }}

                onPress={() => {
                    if (this.state.isSelecting) {
                        item.selected = item.selected ? false : true
                        this.isSelecting()
                    } else {
                        this.props.navigation.navigate("produtoInfo", { item: item })
                    }
                }}

                activeOpacity={0.7}
            >


                {this.state.isSelecting ?
                    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>



                        <Radio selected={item.selected}
                            onPress={() => {

                                item.selected = item.selected ? false : true
                                this.isSelecting()


                            }}
                            color="#0088a9"
                            selectedColor="#0088a9"
                        />


                    </View>
                    : null
                }


                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Image source={item.image} style={{ height: 50, width: 50 }} />
                </View>




                <View style={{ flex: 2, justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "#555", marginBottom: 3 }}>{item.produto}</Text>
                    <Text style={{ color: "#555", marginBottom: 3 }}>{item.marca}</Text>
                    <Text style={{ color: "#555", marginBottom: 3 }}>{item.caracteristicas[0] + item.caracteristicas[1]}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>

                        <TouchableOpacity
                            style={styles.btnsMoreLess}
                            onPress={() => { item.quantidade++; this.forceUpdate() }}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.TextMoreLess}>+</Text>
                        </TouchableOpacity>

                        <View style={styles.quantView}><Text>{item.quantidade}</Text></View>

                        <TouchableOpacity
                            style={styles.btnsMoreLess}
                            onPress={() => { if (item.quantidade > 1) { item.quantidade--; this.forceUpdate() } }}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.TextMoreLess}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 0.8 }}>
                    <Text style={[styles.txtHeader, { fontSize: 16, textAlign: "right", width: "100%" }]}>{(item.preco * item.quantidade).toFixed(2)}€</Text>
                    <Text style={[styles.txtHeader, { fontSize: 12.5, textAlign: "right", width: "100%" }]}>{item.quantidade > 1 ? item.quantidade + "X " + item.preco + "€" : null}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    rightHeader() {

        if (this.state.isSelecting == true) {

            return (
                <TouchableOpacity onPress={() => {

                    this.removerProdutos();

                }}
                >
                    <IconIonicons name="md-trash" size={30} color="#0088a9" />
                </TouchableOpacity>
            )


        } else if (!this.state.carrinho.length == 0) {
            return (
                <TouchableOpacity style={styles.Left}
                    onPress={() => this.finalizarCompra()}
                >
                    <Title style={[styles.txtHeader, { fontSize: 18 }]}>
                        FINALIZAR
                    </Title>
                </TouchableOpacity>)
        }


    }

    isSelecting() {

        //função que mostra um estado, se o usuario esta ou nao selecionando produtos
        //selecionar produto para apagar etc

        let totalSelected = 0;

        this.state.carrinho.forEach(element => {
            if (element.selected) {
                totalSelected++;

                return;
            }
        });

        if (totalSelected > 0) {
            this.setState({ isSelecting: true })
        } else {
            this.setState({ isSelecting: false })
        }

    }

    removerProdutos() {

        let array = this.state.carrinho


        for (let index = array.length - 1; index >= 0; index--) {

            if (array[index].selected === true) {
                array.splice(index, 1)

            }

        }


        this.setState({ produtos: array })


        this.setState({ isSelecting: false })

    }


    calcularTotal() {

        //calcula o preço total de todos os produtos bipados e
        //e a respectiva quantidade e mostra para o usuario na 
        //barra de cima "header"
        let total = 0

        this.state.carrinho.forEach(element => {

            total += element.preco * element.quantidade

        })

        return total.toFixed(2)



    }

    EmptyRender() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <IconIonicons name="ios-cart" size={50} />
                <Text style={{ textAlign: "center", fontSize: 16 }} >Clique no botão abaixo para{"\n"}começar sua compra!</Text>
            </View>

        )
    }




    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header androidStatusBarColor="#0088a9" style={styles.Header}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.Left} onPress={() => this.props.navigation.openDrawer()}>
                            <IconMaterial name="menu" size={30} />
                        </TouchableOpacity>

                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title style={styles.txtHeader}>
                            {this.calcularTotal()}€
                        </Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {
                            this.rightHeader()
                        }


                    </Right>
                </Header>



                <FlatList
                    contentContainerStyle={{ flex: 1 }}
                    data={this.state.carrinho}
                    renderItem={({ item, index }) => this.card(item, index)}
                    ListEmptyComponent={this.EmptyRender()}
                    keyExtractor={(item) => item.id}
                />



                <TouchableOpacity activeOpacity={0.7} style={styles.floatButton}
                    onPress={() => this.props.navigation.navigate('scanear', { returnData: this.addProduto.bind(this) })}
                >
                    <IconIonicons name="ios-barcode" size={35} color="#fff" />
                </TouchableOpacity>


                <LoadingAlert isVisible={this.state.isLoading} loadMsg={this.state.loadMsg} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    Header: {
        backgroundColor: "#eee",
        justifyContent: "space-between"
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
    txtHeader: {
        color: "#0088a9",
        fontWeight: "bold",
        alignSelf: "center"

    },
    btnsMoreLess: {
        backgroundColor: "#0088a9",
        //flex: 1,
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center"
    },
    TextMoreLess: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18
    },
    quantView: {
        borderWidth: 1,
        borderColor: "#ccc",
        height: 45,
        width: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        minHeight: 100,
        backgroundColor: "#f9f9f9",
    }

});

