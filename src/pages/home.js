import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import { Header, Left, Right, Body, Title, Radio } from "native-base";

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import IconIonicons from 'react-native-vector-icons/Ionicons'


export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produtos: [
                {
                    produto: "leite",
                    marca: "italac",
                    id: "231434",
                    caracteristicas: [],
                    preco: 1,
                    quantidade: 1,
                    image: null,
                    selected: false
                },
                {
                    produto: "banana",
                    marca: "italac",
                    id: "33223",
                    caracteristicas: [],
                    preco: 1,
                    quantidade: 1,
                    image: null,
                    selected: false
                },
                {
                    produto: "biscoito",
                    marca: "italac",
                    id: "33",
                    caracteristicas: [],
                    preco: 1,
                    quantidade: 1,
                    image: null,
                    selected: false
                },
                {
                    produto: "choriço",
                    marca: "italac",
                    id: "223",
                    caracteristicas: [],
                    preco: 1,
                    quantidade: 1,
                    image: null,
                    selected: false
                }
            ],
            isSelecting: false
        };
    }

    card(item, index) {

        return (
            <TouchableOpacity style={!item.selected ? { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1 } : { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#abd4de", borderBottomWidth: 1 }}
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
            >


                {this.state.isSelecting ?
                    <View style={{flex: 0.5, justifyContent: "center", alignItems: "center" }}>



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
                <View style={{ flex: 1 }} >
                    {//imagem
                    }
                </View>
                <View style={{ flex: 2 }}>
                    <Text>{item.produto}</Text>
                    <Text>{item.caracteristicas}</Text>
                    <View style={{ flexDirection: "row" }}>

                        <TouchableOpacity
                            style={styles.btnsMoreLess}
                            onPress={() => { item.quantidade++; this.forceUpdate() }}
                        >
                            <Text style={styles.TextMoreLess}>+</Text>
                        </TouchableOpacity>

                        <View style={styles.quantView}><Text>{item.quantidade}</Text></View>

                        <TouchableOpacity
                            style={styles.btnsMoreLess}
                            onPress={() => { if(item.quantidade > 1){item.quantidade--; this.forceUpdate()} }}                            
                        >
                            <Text style={styles.TextMoreLess}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 0.5 }}>
                    <Text>{item.preco}€</Text>
                </View>
            </TouchableOpacity>
        )
    }

    leftHeader() {

        if (this.state.isSelecting == true) {

            return (
                <TouchableOpacity>
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
                            00€
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



                <TouchableOpacity activeOpacity={0.5} style={styles.floatButton}
                    onPress={() => this.props.navigation.navigate("scanear")}
                >
                    <IconIonicons name="ios-barcode" size={35} color="#fff" />
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    Header: {
        backgroundColor: "#e0e0e0",
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
        flex: 1,
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }

});

