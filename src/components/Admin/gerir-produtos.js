import AdminNav from "./admin-nav";
import { bebidas as produtosBD } from "../store";
import Metade from "../geral/metade-pizza";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMetades } from "../../features/ingredientes-metadeSlice";

/* 
Componente: GerirPizzas
Descrição: Componente que renderiza a página de gerenciamento de pizzas
*/
const GerirProdutos = () => {
    const produtos = produtosBD.sort((a, b) => {
        return b.quant_comprada - a.quant_comprada;
    });

    const dispatch = useDispatch();

    const [erro, setErro] = useState("");

    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [preco, setPreco] = useState(0);
    const [descricao, setDescricao] = useState("");

    const [editando, setEditando] = useState(false);


    const handleNome = (e) => {
        setNome(e.target.value);
    };
    const handleImagem = (e) => {
        setImagem(e.target.files[0]);
    };

    const handleButton = (e) => {
        e.preventDefault();
        if (nome === "") {
            setErro("Preencha o nome da pizza");
            return;
        }
        if (imagem === "") {
            setErro("Preencha a imagem da pizza");
            return;
        }

        let produto = {
            nome: nome,
            imagem: imagem,
            preco: preco,
            descricao: descricao,
        };
    };

    useEffect(() => {
        // atualiza o array de metades


    }, []);

    return (
        <>
            <AdminNav Atual="gerir-produtos" />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row">
                    <h1>Gerenciar Produtos 🍾</h1>
                    <div className="row section mb-3">
                        <h4> Adicionar Novo ou Editar Produto </h4>
                    </div>
                    <h3>
                        <b> Produtos Cadastrados 🍾</b>
                    </h3>
                </div>
                <div className="row section mb-1">
                    <div className="scrollmenu">
                        {produtos.map((pizza) => (
                            <div
                                style={{
                                    width: "18rem",
                                    margin: "0.5rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "0.25rem",
                                    padding: "1rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                key={pizza.id}
                            >
                                <img
                                    className="card-img-top"
                                    src={pizza.imagem}
                                    alt={pizza.nome}
                                    style={{
                                        width: "12rem",
                                        height: "12rem",
                                        objectFit: "cover",
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{pizza.nome}</h5>
                                    <button
                                        className="btn btn-lg btn-primary btn-success"
                                        id={`pizza-${pizza.id}`}
                                        onClick={() => {
                                            setEditando(true);
                                            setNome(pizza.nome);
                                            document.getElementById(
                                                `pizza-${pizza.id}`
                                            ).innerHTML = "Alterando...";
                                            produtosBD.map((pizzaOBJ) => {
                                                if (pizzaOBJ.id !== pizza.id) {
                                                    document.getElementById(
                                                        `pizza-${pizzaOBJ.id}`
                                                    ).innerHTML = "Alterar";
                                                }
                                            });
                                        }}
                                    >
                                        Alterar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleButton}>
                    <div className="row">
                        <h5
                            className="text-center"
                            style={{
                                color: "red",
                                textShadow: "0px 0px 10px black",
                            }}
                        >
                            {erro}
                        </h5>
                    </div>
                    <div className="row section">
                        <div className="col-md-6">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                value={nome}
                                onChange={(e) => {
                                    setNome(e.target.value);
                                }}
                            />

                            <label htmlFor="imagem">Imagem</label>
                            <input
                                type="file"
                                className="form-control"
                                id="imagem"
                                onChange={(e) => {
                                    setImagem(e.target.files[0]);
                                }}
                            />

                            <label htmlFor="preco">Preço</label>
                            <input
                                type="number"
                                className="form-control"
                                id="preco"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                            />

                            <label htmlFor="descricao">Descrição</label>
                            <textarea
                                className="form-control"
                                id="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button className="btn btn-primary btn-lg">
                            {editando ? "Salvar" : "Adicionar"}
                        </button>
                        <a
                            href="/menu-admin"
                            style={{
                                margin: " 0 5px",
                            }}
                            className="btn btn-danger btn-lg"
                        >
                            Cancelar
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default GerirProdutos;
