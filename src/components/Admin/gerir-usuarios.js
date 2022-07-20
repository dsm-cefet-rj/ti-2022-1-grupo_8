import React, { useEffect, useState } from "react";
import AdminNav from "./admin-nav";
import styles from "./gerir-usuarios.module.scss";
import { getSessionFromLocalStorage } from "../../features/sessionSlice";
import axios from "axios";
import { PedidoCard } from "../geral/pedido-card";
/* 
Componente: GerirUsuário
Descrição:  Pagina capaz de pesquisar usuário pro email e exibir botoes para promover a administrador, funcionário, ou usuário normal, e excluir usuário
*/
const GerirUsuarios = () => {
    // Pegar email do url
    const queryParams = new URLSearchParams(window.location.search);
    const [email] = useState(
        queryParams.get("email")
    ); /* Email do usuário a ser editado */
    const [usuario, setUsuario] = useState({}); /* Usuário a ser editado */
    const [erro, setErro] = useState(""); /* Erro ao editar usuário */
    useEffect(() => {
        if (email != null) {
            const token = getSessionFromLocalStorage();
            axios({
                method: "GET",
                url: `http://localhost:3001/admin/usuario/${email}`,
                headers: {
                    "x-access-token": `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUsuario(response.data);
                    setErro("");
                })
                .catch((error) => {
                    setErro(error.message);
                    console.log(error);
                });
        }
    }, [email]);

    const AlteraButtonHandler = (e) => {
        e.preventDefault();
        const token = getSessionFromLocalStorage();
        console.log(token);
        const type = usuario.type;
        const email = usuario.email;
        const urls = {
            user: `http://localhost:3001/admin/promover-user/${email}`,
            admin: `http://localhost:3001/admin/promover-admin/${email}`,
            funcionário: `http://localhost:3001/admin/promover-funcionario/${email}`,
        };
        axios({
            method: "POST",
            url: urls[type],
            headers: {
                "x-access-token": `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response);
                setErro("");
            })
            .catch((error) => {
                console.log(error);
                setErro(error.message);
            });
    };
    const ExcluirButtonHandler = (e) => {
        e.preventDefault();
        const url = `http://localhost:3001/admin/usuario-excluir/${email}`;
        const token = getSessionFromLocalStorage();
        axios({
            method: "DELETE",
            url: url,
            headers: {
                "x-access-token": `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response);
                setErro("");
            })
            .catch((error) => {
                console.log(error);
                setErro(error.message);
            });
        window.location.href = "/gerir-usuarios";
    };

    return (
        <>
            <AdminNav Atual="gerir-usuarios" />
            <div
                className={styles.body}
                style={{
                    height: "100vh",
                }}
            >
                <div className="container mb-2 p-1 bg-transparent">
                    <h1 style={{ textAlign: "center", margin: "30px" }}>
                        Gerenciar Usuários 👥
                    </h1>
                    <div className="row ">{erro}</div>

                    {email && erro === "" ? (
                        <>
                            {/* Se email existir, renderiza o componente de edição */}
                            <div className="row section mt-2">
                                <h3>Nome:</h3>
                                <div>{usuario.nome}</div>
                            </div>

                            <div className="row section mt-2">
                                <h3>Email:</h3>
                                <div>{usuario.email}</div>
                            </div>

                            <div className="row section mt-2">
                                <h3>Tipo:</h3>
                                {/* tipos: user, admin, funcionário */}
                                <div
                                    style={{
                                        fontSize: "1.3em",
                                    }}
                                >
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="type"
                                            id="user"
                                            value="user"
                                            checked={usuario.type === "user"}
                                            onChange={() => {
                                                setUsuario({
                                                    ...usuario,
                                                    type: "user",
                                                });
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="user"
                                        >
                                            Usuário
                                        </label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="type"
                                            id="admin"
                                            value="admin"
                                            checked={usuario.type === "admin"}
                                            onChange={() => {
                                                setUsuario({
                                                    ...usuario,
                                                    type: "admin",
                                                });
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="admin"
                                        >
                                            Administrador
                                        </label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="type"
                                            id="funcionário"
                                            value="funcionário"
                                            checked={
                                                usuario.type === "funcionário"
                                            }
                                            onChange={() => {
                                                setUsuario({
                                                    ...usuario,
                                                    type: "funcionário",
                                                });
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="funcionário"
                                        >
                                            Funcionário
                                        </label>
                                        <div className="d-grid gap-2 col-2 mx-auto">
                                            <button
                                                className="btn btn-success"
                                                onClick={AlteraButtonHandler}
                                            >
                                                Confirmar
                                            </button>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => {
                                                    window.location.href =
                                                        "/gerir-usuarios";
                                                }}
                                            >
                                                Voltar
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={ExcluirButtonHandler}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row section mt-2">
                                <h3>Pedidos Registrados:</h3>
                            </div>
                            <div className="row section mt-2 mx-auto">
                                {usuario.pedidos ? (
                                    usuario.pedidos.map((pedido) => {
                                        return (
                                            <PedidoCard
                                                id={pedido.id}
                                                email={pedido.email}
                                                data={pedido.dataHora}
                                                endereco={pedido.endereco}
                                                itens={pedido.carrinho}
                                                status={pedido.status}
                                                key={pedido.id}
                                                context={"gerir-usuarios"}
                                            />
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="row section mt-2 mx-auto">
                            {/* Se email não existir, renderiza o formulário de pesquisa */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // reload da página com o email do usuário no url
                                    let url_params = `email=${e.target.email.value}`;
                                    window.location.href = `/gerir-usuarios?${url_params}`;
                                }}
                            >
                                <div
                                    className="form-group"
                                    style={{
                                        fontSize: "1.5em",
                                    }}
                                >
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        autoComplete="on"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg mt-2"
                                >
                                    Pesquisar
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default GerirUsuarios;
