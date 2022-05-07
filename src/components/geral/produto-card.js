import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adicionarAoCarrinho } from '../../features/carrinhoSlice';

/* 
Componente: ProdutoCard
Descrição: Componente que renderiza um card de um produto
*/
const ProdutoCard = (props) => {
    const data = props.data;

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
        dispatch(adicionarAoCarrinho(produto));
    };

    return (
        <div className="col-md-4">
            <div className="card">
                <img className="card-img-top" src={produtoData.imagem} alt={produtoData.nome} />
                <div className="card-body">
                    <h5 className="card-title">{produtoData.nome}</h5>
                    <p className="card-text">{produtoData.descricao}</p>
                    <p className="card-text">R$ {produtoData.preco}</p>
                    <button className="btn btn-success" onClick={() => adicionar(produto)}>Adicionar ao carrinho</button>
                </div>
            </div>
        </div>
    );
}

export default ProdutoCard;