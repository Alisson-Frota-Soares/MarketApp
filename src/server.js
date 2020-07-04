import data from './produtos'
import carrinhos from './carrinhos'
import crypto from 'crypto-js'

import auth from '@react-native-firebase/auth'


const user = {
    id: "1234"
}


class gerarProduto {
    constructor(produto) {
        this.produto = produto.produto
        this.marca = produto.marca
        this.id = produto.id
        this.caracteristicas = produto.caracteristicas
        this.preco = produto.preco
        this.quantidade = 1
        this.image = produto.image
        this.selected = false
    }

}

class gerarCarrinho {
    constructor(carrinho) {
        this.itens = this.gerarItens(carrinho)
        this.id = this.gerarId()
    }

    gerarItens(carrinho) {
        let itens = [];
        carrinho.forEach((element) => {
            itens.push({ id: element.id, quantidade: element.quantidade })
        })

        return itens;

    }

    gerarId() {

        

        let user = auth().currentUser
        if (user) {

            let id = crypto.enc.Utf8.parse(user.uid).toString()
            
            
            

            //let id = crypto.SHA1(user.uid.slice(0,8)).toString()
            id = id.slice(0, 13)
            console.warn(id)
            return id
        } else {
            return ({ error: "sem usuario" })
        }


    }
}


export default class server {
    constructor() {

    }

    iscurrentUser = async (props) => {

        const user = auth().currentUser

        if (!user) {
            props.navigation.replace("login")
        } else {
            return user
        }

    }

    finalizarCompra(carrinho, length) {

        if (length) {
            let newCarrinho = new gerarCarrinho(carrinho)

            if (newCarrinho.id.error) {
                return ({ sucess: false, msg: "sem usuario" })
            } else {
                let index = carrinhos.push(newCarrinho)

                return ({ sucess: true, id: newCarrinho.id, index: index - 1 })
            }



        } else {
            return ({ sucess: false, msg: "carrinho vazio" })
        }





    }




    procurarProduto(id, carrinho) {


        //procura o produto no "servidor"
        let produtoEncontrado = false

        data.forEach((element, index) => {
            if (element.id == id) {
                produtoEncontrado = index
            }
        })

        //verifica se o produto ja foi encontrado
        if (typeof (produtoEncontrado) === "number") {

            //procuta o produto no carrinho
            let isOnList = false
            let indexOnLIST;
            carrinho.forEach((element, index) => {
                if (element.id == id) {
                    isOnList = true
                    indexOnLIST = index
                }
            })

            let produto = new gerarProduto(data[produtoEncontrado])

            return ({ sucess: true, isOnList: isOnList, produto: produto, indexOnLIST: indexOnLIST })



            //console.warn(produtosData)


        } else {
            return ({ sucess: false, msg: "produto nao encontrado" })
        }

    }



    signIn = async (phoneNumber) => {




        try {
            const sucess = await auth().signInWithPhoneNumber(phoneNumber, true)

            if (sucess) {
                console.warn(sucess)
                return ({ sucess })
            }

        } catch (error) {

            console.warn(error)
            return ({ error })
        }

    }


    signOut = async (props) => {


        try {

            const sucess = await auth().signOut()

            if (sucess) {

                auth().onAuthStateChanged((user) => {

                    if (!user) {
                        props.navigation.replace("login")
                    }
                })

                return ({ sucess })

            }

        } catch (error) {
            return ({ error })
        }
    }



}