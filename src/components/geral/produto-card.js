import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adicionarAoCarrinho } from '../../features/carrinhoSlice';
import { useSelector } from "react-redux";

const ProdutoCard = (props) => {
    const produtoData = {
        nome: props.nome,
        descricao: props.descricao,
        imagem: props.imagem,
        preco: props.preco,
        id: props.id,
        tipo: props.tipo,
        quantidade: 1,
    };

    const [produto] = useState(produtoData);
    const dispatch = useDispatch();

    const adicionar = (produto) => {
        dispatch(adicionarAoCarrinho(produto));
    };

    return (
        <div className="col">
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