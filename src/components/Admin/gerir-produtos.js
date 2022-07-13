import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProdutos,
    selectProdutos,
} from "../../features/clienteDatabaseSlice";
import {
    setIdSelecinado,
    setNome,
    setPreco,
    setDescricao,
    selectIdSelecinado,
    selectNome,
    selectPreco,
    selectDescricao,
} from "../../features/gerir-produtosSlice";
import AdminNav from "./admin-nav";
import styles from "./gerir-produtos.module.scss";
import { getSessionFromLocalStorage } from "../../features/sessionSlice";
import axios from "axios";
/* 
Componente: GerirPizzas
Descrição: Componente que renderiza a página de gerenciamento de pizzas
*/
const GerirProdutos = () => {
    const dispatch = useDispatch();

    const ProdutosBD = useSelector(selectProdutos);

    const [erro, setErro] = useState("");
    const idSelecinado = useSelector(selectIdSelecinado);
    const nome = useSelector(selectNome);
    const [imagem, setImagem] = useState("");
    const preco = useSelector(selectPreco);
    const descricao = useSelector(selectDescricao);

    useEffect(() => {
        dispatch(fetchProdutos());
    }, []);

    const handleButton = async (e) => {
        e.preventDefault();
        let produto = {
            _id: idSelecinado,
            nome: nome,
            imagem: imagem,
            preco: preco,
            descricao: descricao,
        };
        const form = new FormData();
        for (let key in produto) {
            form.append(key, produto[key]);
        }

        const token = getSessionFromLocalStorage();
        const request = {
            method: "POST",
            url: "http://localhost:3001/admin/editar-produto",
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": `Bearer ${token}`,
            },
            data: form,
        };

        const response = await axios(request);
        if (response.status === 200) {
            // reload window
            window.location.reload();
        } else {
            setErro(response.data.message);
        }
    };

    useEffect(() => {
        dispatch(fetchProdutos);
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
                        {ProdutosBD.map((produtos) => (
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
                                key={produtos.id}
                            >
                                <img
                                    className="card-img-top"
                                    src={produtos.imagem}
                                    alt={produtos.nome}
                                    style={{
                                        width: "12rem",
                                        height: "12rem",
                                        objectFit: "cover",
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {produtos.nome}
                                    </h5>
                                    <button
                                        className="btn btn-lg btn-primary btn-success"
                                        id={`pizza-${produtos.id}`}
                                        onClick={(e) => {
                                            if (idSelecinado === produtos.id) {
                                                // desselecionar
                                                dispatch(setIdSelecinado(""));
                                                dispatch(setNome(""));
                                                dispatch(setPreco(""));
                                                dispatch(setDescricao(""));
                                            } else {
                                                dispatch(
                                                    setIdSelecinado(produtos.id)
                                                );
                                                dispatch(
                                                    setNome(produtos.nome)
                                                );
                                                dispatch(
                                                    setPreco(produtos.preco)
                                                );
                                                dispatch(
                                                    setDescricao(
                                                        produtos.descricao
                                                    )
                                                );
                                            }
                                        }}
                                    >
                                        {idSelecinado === produtos.id
                                            ? "Desselecionar"
                                            : "Selecionar"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row section">
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

                        <div className="col-md-6">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                value={nome}
                                onChange={(e) => {
                                    dispatch(setNome(e.target.value));
                                }}
                            />

                            <label htmlFor="imagem">Imagem</label>
                            <input
                                type="file"
                                className="form-control"
                                id="imagem"
                                onChange={(e) => {
                                    let [file] = e.target.files;
                                    setImagem(file);
                                }}
                            />

                            <label htmlFor="preco">Preço</label>
                            <input
                                type="number"
                                className="form-control"
                                id="preco"
                                value={preco}
                                onChange={(e) => {
                                    dispatch(setPreco(e.target.value));
                                }}
                            />

                            <label htmlFor="descricao">Descrição</label>
                            <textarea
                                className="form-control"
                                id="descricao"
                                value={descricao}
                                onChange={(e) => {
                                    dispatch(setDescricao(e.target.value));
                                }}
                            />
                        </div>

                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "2rem",
                            }}
                        >
                            <button className="btn btn-outline-success btn-lg">
                                {idSelecinado !== 0
                                    ? "Salvar 💿"
                                    : "Adicionar ✅"}
                            </button>
                            <button
                                style={{
                                    margin: " 0 5px",
                                }}
                                className="btn btn-outline-danger btn-lg"
                                onClick={(e) => {
                                    if (idSelecinado !== 0) {
                                        const token =
                                            getSessionFromLocalStorage();
                                        // Excluir produto
                                        axios({
                                            method: "DELETE",
                                            url: `http://localhost:3001/admin/excluir-produto/${idSelecinado}`,
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        });
                                    } else {
                                        //voltar para pagina anterior
                                        window.history.back();
                                    }
                                }}
                            >
                                {idSelecinado !== 0
                                    ? "Deletar 🗑️"
                                    : "Cancelar ❌"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

const page = () => {
    return (
        <div className={styles.body}>
            <GerirProdutos />
        </div>
    );
};

export default page;
