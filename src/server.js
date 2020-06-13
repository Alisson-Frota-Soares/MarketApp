import data from './produtos'

class gerarProduto {
    constructor(produto) {
        this.produto = produto.produto
        this.marca = produto.marca
        this.id = produto.id
        this.caracteristicas = produto.caracteristicas
        this.preco = produto.preco
        this.quantidade = produto.quantidade
        this.image = produto.image
        this.selected = false
    }
}


export default class server {
    constructor() {
        this.procurarProduto()
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