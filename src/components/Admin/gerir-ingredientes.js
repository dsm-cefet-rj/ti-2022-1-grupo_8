import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchIngredientes,
    selectIngredientes,
} from "../../features/clienteDatabaseSlice";
import {
    setIdSelecinado,
    setnomeSelecinado,
    setprecoSelecinado,
    setdescricaoSelecinado,
    setpesoPorcaoSelecinado,
    selectId,
    selectNome,
    selectPreco,
    selectDescricao,
    selectPesoPorcao
} from "../../features/gerir-ingredientesSlice";
import AdminNav from "./admin-nav";
import styles from "./gerir-ingredientes.module.scss";
import { getSessionFromLocalStorage } from "../../features/sessionSlice";
import axios from "axios";
/* 
Componente: Ingrediente
Descrição: Componente que renderiza um ingrediente na pagina de gerir ingredientes
*/
const Ingrediente = (props) => {
    // Dispatch do Redux
    const dispatch = useDispatch();

    // Variavies que controlam os ingredientes do banco de dados.
    const ingredientesBD = useSelector(selectIngredientes);

    // Dados do ingrediente
    const { id, imagem, nome, preco, pesoPorcao, descricao } = props.data;
    // Controle se o ingrediente está selecionado
    const [selecionado, setSelecionado] = useState(false);

    // Função que seleciona um ingrediente
    const selecionar = () => {
        setSelecionado(!selecionado);
        if (!selecionado) {
            dispatch(
                setIdSelecinado({
                    id: id,
                })
            );
            dispatch(
                setnomeSelecinado({
                    nome: nome,
                })
            );
            dispatch(
                setprecoSelecinado({
                    preco: preco,
                })
            );
            dispatch(
                setdescricaoSelecinado({
                    descricao: descricao
                })
            );
            dispatch(
                setpesoPorcaoSelecinado({
                    pesoPorcao: pesoPorcao,
                })
            );
            document.getElementById("form-ingrediente").scrollIntoView({
                behavior: "instant",
                block: "center",
            });
            //descelecionar todos oo outros
            ingredientesBD.forEach((ingrediente) => {
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
            dispatch(
                setnomeSelecinado({
                    nome: "",
                })
            );
            dispatch(
                setprecoSelecinado({
                    preco: 0,
                })
            );
            dispatch(
                setdescricaoSelecinado({
                    descricao: "",
                })
            );
            dispatch(
                setpesoPorcaoSelecinado({
                    pesoPorcao: 0,
                })
            );
        }
    };

    useEffect(() => {
        dispatch(fetchIngredientes());
    }, [dispatch]);

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
    // Dispatch do Redux
    const dispatch = useDispatch();

    // Variavies que controlam os ingredientes do banco de dados.
    const ingredientesBD = useSelector(selectIngredientes);

    const idSelecinado = useSelector(selectId);
    const nome = useSelector(selectNome)
    const preco = useSelector(selectPreco)
    const descricao = useSelector(selectDescricao)
    const pesoPorcao = useSelector(selectPesoPorcao)
    const [imagem, setImagem] = useState("")

    useEffect(() => {
        if (idSelecinado !== 0) {
            let ingrediente = ingredientesBD.find(
                (ingrediente) => ingrediente.id === idSelecinado
            );

            document.getElementById("imagem-field").hidden = true;
        } else {
            document.getElementById("imagem-field").hidden = false;
        }
        dispatch(fetchIngredientes());
    }, [idSelecinado, dispatch, ingredientesBD]);

    const handleButton = async (e) => {
        e.preventDefault();
        let ingrediente = {
            nome: nome,
            preco: preco,
            descricao: descricao,
            pesoPorcao: pesoPorcao,
            imagem: imagem,
            _id: idSelecinado,
        };
        const form = new FormData();
        for (let key in ingrediente) {
            form.append(key, ingrediente[key]);
        }
        const token = getSessionFromLocalStorage();

        const request = {
            method: "POST",
            url: "http://localhost:3001/admin/editar-ingrediente",
            headers: {
                "x-access-token": `Bearer ${token}`,
            },
            data: form,
        };

        const response = await axios(request);
        if (response.status === 200) {
            // reload window
            window.location.reload();
        } else {
            console.log(response.data.error);
        }
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
                                    {ingredientesBD.map((ingrediente) => (
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
                                onChange={(e) => dispatch(
                                    setnomeSelecinado({
                                        nome: e.target.value,
                                    })
                                )}
                                value={nome}
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
                                step={0.01}
                                autoComplete="off"
                                onChange={(e) => dispatch(
                                    setprecoSelecinado({
                                        preco: e.target.value,
                                    })
                                )}
                                value={preco}
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
                                onChange={(e) => dispatch(
                                    setdescricaoSelecinado({
                                        descricao: e.target.value,
                                    })
                                )}
                                value={descricao}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="PesoPorcao">
                                Peso Porção em gramas
                            </label>
                            <input
                                type="number"
                                step={0.01}
                                className="form-control"
                                id="PesoPorcao"
                                name="descricao"
                                placeholder="Peso Porção"
                                min="1"
                                max="100"
                                autoComplete="off"
                                onChange={(e) => dispatch(
                                    setpesoPorcaoSelecinado({
                                        pesoPorcao: e.target.value,
                                    })
                                )}
                                value={pesoPorcao}
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
                                onChange={(e) => {
                                    // setImagem to the fist file uploaded
                                    let [file] = e.target.files;

                                    setImagem(file);
                                }}
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

const page = () => {
    return (
        <div className={styles.body}>
            <GerirIngredientes />
        </div>
    );
};

export default page;
