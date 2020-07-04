import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity

} from 'react-native';

import { Header, Left, Title, Body } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

export default class produtoInfo extends Component {
    constructor(props) {
        super(props);

        const { params } = this.props.route

        this.state = {
            item: params.item
        };
    }

    componentDidMount() {
        if (!this.state.item) {
            this.props.navigation.goBack()
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header androidStatusBarColor="#0088a9" style={{ backgroundColor: "#eee" }}>
                    <Left>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.goBack()} >
                            <Icon name="md-arrow-back" size={30} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ color: "#000" }} >informações do produto</Title>
                    </Body>

                </Header>

                <Image source={this.state.item.image} style={{ width: 200, height: 200, alignSelf: "center", margin: 10 }} />

                <View style={{ flex: 1, padding: 10, alignItems: "center" }}>
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ width: "70%", fontWeight: "bold" }} >Produto</Text>
                            <Text>{this.state.item.produto}</Text>

                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ width: "70%", fontWeight: "bold" }} >Marca</Text>
                            <Text>{this.state.item.marca}</Text>
                        </View>


                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ width: "70%", fontWeight: "bold" }} >Caracteristicas</Text>
                            <Text>{this.state.item.caracteristicas}</Text>
                        </View>


                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ width: "70%", fontWeight: "bold" }} >Preço</Text>
                            <Text>{this.state.item.preco}€</Text>
                        </View>


                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ width: "70%", fontWeight: "bold" }} >Quantidade</Text>
                            <Text>{this.state.item.quantidade}</Text>
                        </View>
                    </View>
                </View>


            </View>
        );
    }
}
