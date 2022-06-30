import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./criar-usuario.module.scss";
/* 
Componente: CriarUsuario
Descrição: Componente que renderiza a página de criação de usuário
*/
const CriarUsuario = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            nome === "" ||
            email === "" ||
            senha === "" ||
            confirmarSenha === ""
        ) {
            setErro("Preencha todos os campos");
            return;
        }
        if (senha !== confirmarSenha) {
            setErro("Senhas não conferem");
            return;
        }
        if (senha.length < 8) {
            setErro("Senha deve ter no mínimo 8 caracteres");
            return;
        }

        setErro("");
        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
        };
        const response = axios({
            method: "post",
            url: "http://localhost:3001/login/criar",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(usuario),
        });
        response
            .then((res) => {
                if (res.status === 201) {
                    console.log("Usuário cadastrado com sucesso");
                    window.location.href = "/login";
                    return;
                }
                if (res.status === 400) {
                    setErro(res.body.erro);
                }
            })
            .catch((err) => {
                console.log(err);
                setErro("Erro desconhecido");
            });
    };

    useEffect(() => {
        document.title = "Pizzaria ON - Criar Usuário";
    }, []);

    // Renderização do componente
    return (
        <>
            <div className="logo text-center">
                <h1>Pizzaria ON</h1>
            </div>
            <div className="container mt-2 mb-5 p-5 bg-transparent">
                <div className="row mb-2">
                    <h1 className="titulo">Cadastro ✍</h1>
                </div>
                <div className="row">
                    <h5
                        className="text-center"
                        id="erro_message"
                        style={{
                            color: "red",
                        }}
                    >
                        {erro}
                    </h5>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row mb-1">
                        <input
                            type="text"
                            name="campoNome"
                            className="form-control"
                            placeholder="Nome"
                            autoComplete="name"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="row mb-1">
                        <input
                            type="email"
                            name="campoEmail"
                            className="form-control"
                            placeholder="E-mail"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="row mb-1">
                        <input
                            type="password"
                            name="campoSenha"
                            className="form-control"
                            placeholder="Senha"
                            autoComplete="new-password"
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className="row mb-5">
                        <input
                            type="password"
                            name="campoConfirmaSenha"
                            className="form-control"
                            placeholder="Confirmar senha"
                            autoComplete="new-password"
                            required
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                    </div>
                    <div className="row mb-2">
                        <button className="btn btn-primary btn-block ">
                            Cadastrar ✍
                        </button>
                    </div>
                </form>
                <div className="row mb-2">
                    <Link to="/login" className="btn btn-primary btn-block ">
                        Voltar ↩
                    </Link>
                </div>
            </div>
        </>
    );
};

export default () => {
    return (
        <div className={styles.body}>
            <CriarUsuario />
        </div>
    );
};
