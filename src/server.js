import data from './produtos'
import carrinhos from './carrinhos'
import crypto from 'crypto-js'

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
    constructor(carrinho){
        this.itens = this.gerarItens(carrinho)
        this.id = this.gerarId()
    }

    gerarItens(carrinho){
        let itens = [];
        carrinho.forEach((element) => {
            itens.push({id: element.id, quantidade: element.quantidade})
        })

        return itens;

    }

    gerarId(){
        let id = crypto.SHA1(user.id).toString()
        id = id.slice(0,13)
        console.warn(id)
        return id
    }
}


export default class server {
    constructor() {
        
    }


    finalizarCompra(carrinho, length) {
        
        if (length) {
            let newCarrinho = new gerarCarrinho(carrinho)

            let index = carrinhos.push(newCarrinho)
        
            return ({sucess:true, id:newCarrinho.id, index: index-1})
            
        } else {
            return ({sucess:false,msg:"carrinho vazio"})
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




}