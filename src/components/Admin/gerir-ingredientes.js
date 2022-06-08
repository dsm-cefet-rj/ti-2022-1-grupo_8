import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setIdSelecinado,
    selectId,
} from "../../features/gerir-ingredientesSlice";
import { ingredientes, ingredientes as ingredientesDB } from "../store";
import AdminNav from "./admin-nav";
import styles from "./gerir-ingredientes.module.scss";
/* 
Componente: Ingrediente
Descrição: Componente que renderiza um ingrediente na pagina de gerir ingredientes
*/
const Ingrediente = (props) => {
    // Dados do ingrediente
    const { id, imagem, nome, preco } = props.data;
    // Controle se o ingrediente está selecionado
    const [selecionado, setSelecionado] = useState(false);

    // Dispatch do Redux
    const dispatch = useDispatch();

    // Função que seleciona um ingrediente
    const selecionar = () => {
        setSelecionado(!selecionado);
        if (!selecionado) {
            dispatch(
                setIdSelecinado({
                    id: id,
                })
            );
            document.getElementById("form-ingrediente").scrollIntoView({
                behavior: "instant",
                block: "center",
            });
            //descelecionar todos oo outros
            ingredientes.forEach((ingrediente) => {
                if (ingrediente.id !== id) {
                    let elem = document.getElementById(
                        `ingrediente-${ingrediente.id}`
                    );
                    elem.innerHTML = "Selecionar";
                }
            });
        } else {
            dispatch(
                setIdSelecinado({
                    id: 0,
                })
            );
        }
    };
    // Renderização do componente
    return (
        <>
            <div className="ingrediente">
                <img src={imagem} alt="Pizza" style={{ width: "100px" }} />
                <br />
                <p>{nome}</p>
                <p>R$ {preco}</p>
                <button
                    className="btn btn-primary"
                    onClick={selecionar}
                    id={`ingrediente-${id}`}
                >
                    {selecionado ? "Desselecionar" : "Selecionar"}
                </button>
            </div>
        </>
    );
};

/* 
Componente: GerirIngredientes
Descrição: Componente que renderiza a página de gerenciamento de ingredientes
*/
const GerirIngredientes = () => {
    const idSelecinado = useSelector(selectId);
    useEffect(() => {
        if (idSelecinado !== 0) {
            let ingrediente = ingredientesDB.find(
                (ingrediente) => ingrediente.id === idSelecinado
            );
            document.getElementById("nome").value = ingrediente.nome;
            document.getElementById("nome").readOnly = false;
            document.getElementById("preco").value = ingrediente.preco;
            document.getElementById("descricao").value = ingrediente.descricao;
            document.getElementById("PesoPorcao").value =
                ingrediente.pesoPorcao;
            document.getElementById("imagem-field").hidden = true;
        } else {
            document.getElementById("nome").value = "";
            document.getElementById("nome").readOnly = false;
            document.getElementById("preco").value = "";
            document.getElementById("descricao").value = "";
            document.getElementById("PesoPorcao").value = "";
            document.getElementById("imagem-field").hidden = false;
        }
    }, [idSelecinado]);

    const handleButton = (e) => {
        let nome = document.getElementById("nome").value;
        let preco = document.getElementById("preco").value;
        let descricao = document.getElementById("descricao").value;
        let pesoPorcao = document.getElementById("PesoPorcao").value;
        let imagem = document.getElementById("imagem").value;
        const ingrediente = {
            nome: nome,
            preco: preco,
            descricao: descricao,
            pesoPorcao: pesoPorcao,
            imagem: imagem,
        };
        console.log(ingrediente);
    };

    // Renderização do componente
    return (
        <>
            <AdminNav Atual="ingredientes" />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row section">
                    <div className="col">
                        <p>
                            <b>Ingredientes Cadastrados</b>
                        </p>
                        <div className="row section">
                            <div className="col">
                                <div className="scrollmenu">
                                    {ingredientes.map((ingrediente) => (
                                        <Ingrediente
                                            key={ingrediente.id}
                                            data={ingrediente}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-5 section">
                    <div className="card-header mb-3">
                        <h4>Adicionar Ingrediente</h4>
                    </div>
                    <form
                        action="Administrador Gerir Ingredientes.html"
                        method="post"
                        id="form-ingrediente"
                    >
                        <div className="form-group mb-2">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="preco">Preço</label>
                            <input
                                type="number"
                                className="form-control"
                                id="preco"
                                name="preco"
                                placeholder="Preço"
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="descricao">Descrição</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descricao"
                                name="descricao"
                                placeholder="Descrição"
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="PesoPorcao">
                                Peso Porção em gramas
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="PesoPorcao"
                                name="descricao"
                                placeholder="Peso Porção"
                                min="1"
                                max="100"
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group mb-2" id="imagem-field">
                            <label htmlFor="imagem">Imagem</label>
                            <input
                                type="file"
                                className="form-control"
                                id="imagem"
                                name="imagem"
                                placeholder="Imagem"
                            />
                        </div>
                    </form>
                    <button
                        className="btn btn-outline-success mb-3 mt-3"
                        onClick={handleButton}
                    >
                        {idSelecinado !== 0 ? "Salvar 💿" : "Adicionar ✅"}
                    </button>
                    <button className="btn btn-outline-danger">
                        {idSelecinado !== 0 ? "Deletar 🗑️" : "Cancelar ❌"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default () => {
    return (
        <div className={styles.body}>
            <GerirIngredientes />
        </div>
    );
};
