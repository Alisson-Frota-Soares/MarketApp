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

import produtosData from '../produtos'


export default class home extends Component {
    constructor(props) {
        super(props);
        this.procurarProduto.bind(this)
        this.state = {
            produtos: [],
            isSelecting: false
        };
    }
    procurarProduto = (id) => {


        let produtoEncontrado = false

        produtosData.forEach((element, index) => {
            if (element.id == id) {
                produtoEncontrado = index
            }
        })

        
        if ( typeof(produtoEncontrado) === "number") {

            let isOnList = false

            this.state.produtos.forEach((element, index) => {
                if (element.id == id) {
                    isOnList = index
                }
            })

            

            if (typeof( isOnList) === "number" ) {
                this.state.produtos[isOnList].quantidade++

                this.forceUpdate()
            }else{
                this.state.produtos.push(produtosData[produtoEncontrado])
                this.forceUpdate()
            }


        } else {
            Alert.alert("produto nao encontrado", "produto nao encotrado, pode ser que este produto nao pertença a este estabelecimento")
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

    leftHeader() {

        if (this.state.isSelecting == true) {

            return (
                <TouchableOpacity onPress={() => {

                    this.removerProdutos();

                }}
                >
                    <IconIonicons name="md-trash" size={30} color="#0088a9" />
                </TouchableOpacity>
            )


        } else if (!this.state.produtos.length == 0) {
            return (
                <TouchableOpacity style={styles.Left} >
                    <Title style={[styles.txtHeader, { fontSize: 18 }]}>
                        FINALIZAR
                    </Title>
                </TouchableOpacity>)
        }


    }

    isSelecting() {

        let totalSelected = 0;

        this.state.produtos.forEach(element => {
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

        let array = this.state.produtos


        for (let index = array.length - 1; index >= 0; index--) {

            if (array[index].selected === true) {
                array.splice(index, 1)

            }

        }


        this.setState({ produtos: array })


        this.setState({ isSelecting: false })

    }


    calcularTotal() {

        let total = 0

        this.state.produtos.forEach(element => {

            total += element.preco * element.quantidade

        })

        return total.toFixed(2)



    }




    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header androidStatusBarColor="#aaa" style={styles.Header}>
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
                            this.leftHeader()
                        }


                    </Right>
                </Header>


                <FlatList
                    data={this.state.produtos}
                    renderItem={({ item, index }) => this.card(item, index)}
                    keyExtractor={(item) => item.id}
                />



                <TouchableOpacity activeOpacity={0.7} style={styles.floatButton}
                    onPress={() => this.props.navigation.navigate('scanear', { returnData: this.procurarProduto.bind(this) })}
                >
                    <IconIonicons name="ios-barcode" size={35} color="#fff" />
                </TouchableOpacity>
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

