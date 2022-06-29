import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    adicionarAoCarrinho,
    getFromLocalStorage,
} from "../../features/carrinhoSlice";

/* 
Componente: ProdutoCard
Descrição: Componente que renderiza um card de um produto
*/
const ProdutoCard = (props) => {
    const data = props.data; // Dados do produto
    const tipo = props.tipo; // Tipo do produto

    // Variável que controla se o produto ja esta no carrinho
    const [adicionado, setAdicionado] = useState(
        getFromLocalStorage().find((item) => item.id === data.id)
    ); // Retorna true se o produto ja esta no carrinho

    /* Dados básicos de um produto
    que serão enviados para o carrinho caso o produto seja selecionado */
    const produtoData = {
        nome: data.nome,
        descricao: data.descricao,
        imagem: props.imagem,
        preco: data.preco,
        id: data.id,
        tipo: props.tipo,
        quantidade: 1,
    };

    const [produto] = useState(produtoData);
    const dispatch = useDispatch();

    // Adiciona o produto selecionado ao carrinho
    const adicionar = (produto) => {
        dispatch(adicionarAoCarrinho(produto)); // Adiciona o produto ao carrinho
        setAdicionado(true); // Altera a variável para que o produto não seja adicionado novamente
    };

    let style =
        tipo === "produto"
            ? {
                  maxWidth: "540px",
                  minWidth: "540px",
              }
            : {
                  maxWidth: "540px",
                  height: "100%",
              };

    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="card mt-3 mb-3" style={style}>
                <div className="row g-1">
                    <div className="col-4 col-md-12">
                        <img
                            className="card-img-top"
                            src={produtoData.imagem}
                            alt={produtoData.nome}
                        />
                    </div>
                    <div className="col-8 col-md-12">
                        <div className="card-body">
                            <h5 className="card-title">{produtoData.nome}</h5>
                            <p className="card-text">{produtoData.descricao}</p>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <p
                                    className="card-text"
                                    style={{
                                        fontWeight: "bold",
                                        margin: "0",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    R$ {produtoData.preco.toFixed(2)}
                                </p>
                                {
                                    adicionado ? (
                                        <p
                                            className="card-text"
                                            style={{
                                                color: "green",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Produto no carrinho!
                                        </p> // Se o produto ja estiver no carrinho
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => adicionar(produto)}
                                        >
                                            Adicionar ao carrinho
                                        </button>
                                    ) // Se o produto nao estiver no carrinho
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdutoCard;
