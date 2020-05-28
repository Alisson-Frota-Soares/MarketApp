import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image
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
                    image: {uri:"https://www.recheio.pt/catalogo/media/catalog/product/cache/1/image/900x900/9df78eab33525d08d6e5fb8d27136e95/8/0/80908_4.png"},
                    selected: false
                },
                {
                    produto: "banana",
                    marca: "banana tem marca?",
                    id: "33223",
                    caracteristicas: [],
                    preco: 1,
                    quantidade: 1,
                    image: {uri:"https://oxfam.org.br/wp-content/uploads/2019/08/banana-terra-1024x1024.png"},
                    selected: false
                },
                {
                    produto: "biscoito",
                    marca: "passatempo",
                    id: "33",
                    caracteristicas: [],
                    preco: 1,
                    quantidade: 1,
                    image: {uri:"https://static.wixstatic.com/media/794a04_ceafc9aaabde400ea3e2a1826caba6be~mv2.png/v1/fill/w_238,h_238,al_c,q_85,usm_0.66_1.00_0.01/794a04_ceafc9aaabde400ea3e2a1826caba6be~mv2.webp"},
                    selected: false
                },
                {
                    produto: "choriço",
                    marca: "italac",
                    id: "223",
                    caracteristicas: [],
                    preco: 1,
                    quantidade: 1,
                    image: {uri:"https://7bellotas.com/426-large_default/longaniza-iberica.jpg"},
                    selected: false
                }
            ],
            isSelecting: false
        };
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
                <View style={{ flex: 1, justifyContent:"center", alignItems:"center" }} >
                    <Image source={ item.image} style={{height:50,width:50}}  />
                </View>
                <View style={{ flex: 2, justifyContent:"space-between" }}>
                    <Text>{item.produto}</Text>
                    <Text>{item.caracteristicas}</Text>
                    <View style={{ flexDirection: "row", justifyContent:"flex-start" }}>

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
        width:45,
        height:45,
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
        height:45,
        width:60,
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor:"#ccc",
        minHeight: 100,
        backgroundColor: "#f9f9f9",
    }

});

