import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "./admin-nav";
import styles from "./gerir-produtos.module.scss";
/* 
Componente: GerirUsuário
Descrição:  Pagina capaz de pesquisar usuário pro email e exibir botoes para promover a administrador, funcionário, ou usuário normal, e excluir usuário
*/
const GerirUsuarios = () => {
    const dispatch = useDispatch(); /* Disparador de ações */
    // Pegar email do url
    const { email } = useParams();

    return (
        <>
            <AdminNav Atual="gerir-usuarios" />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row section">
                    <div className="col">
                        <p>
                            <b>Gerir Usuários</b>
                        </p>
                    </div>
                </div>

                {
                    email ? (
                        <>
                            {/* Se email existir, renderiza o componente de edição */}
                            <div className="row section">
                                <div className="col">
                                    <p> Email: {email} </p>

                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Se email não existir, renderiza o formulário de pesquisa */}
                            <form onSubmit={
                                (e) => {
                                    e.preventDefault()
                                    // reload da página com o email do usuário no url
                                    let url_params = `email=${e.target.email.value}`
                                    window.location.href = `/gerir-usuarios?${url_params}`
                                }}>
                                <div className="form-group">
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
                                <button type="submit" className="btn btn-primary">
                                    Pesquisar
                                </button>
                            </form>
                        </>
                    )
                }
            </div>
        </>
    );
}


export default GerirUsuarios;
