import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from "./login.module.scss";
import axios from "axios";
/*
Componente: Login
Descrição: Componente que renderiza a página de login
*/

const Cloud = (props) => {
    let cloudOptions = ["nuvem1.png", "nuvem2.png", "nuvem3.png"];
    const selectedCloud =
        cloudOptions[Math.floor(Math.random() * cloudOptions.length)];
    const x = -1000 + Math.random() * 100;
    const y = -1000 + Math.random() * 1000;
    const scale = Math.random();

    return (
        <div
            style={{
                width: `${Math.random() * 50 + 20}px`,
                zIndex: -2,
                transform: `scale(${scale})`,
                transform: `translate(${x}px, ${y}px)`,
            }}
        >
            <img src={`imgs/decorações/${selectedCloud}`} alt="Nuvem" />
        </div>
    );
};

const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const loginData = {
            login: login,
            senha: senha,
        };
        const response = axios({
            method: "POST",
            url: "http://localhost:3001/login",
            headers: {
                "Content-Type": "application/json",
            },
            params: JSON.stringify(loginData),
        });
        response.then((res) => {
            if (res.status === 200) {
                console.log("Usuário logado com sucesso");
                // save token in local storage
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("usuario", res.data.usuario);
                // redirect to home page
                window.location.href = "/";
                return;
            }
            if (res.status === 400) {
                setErro(res.body.erro);
            }
        });
    };
    return (
        <>
            <div className={style.formLogo}>
                <h1>Pizzaria ON</h1>
            </div>

            <div className="container mt-1 mb-5 p-5 section">
                <div className="row">
                    <h1 className="titulo">Login</h1>
                </div>
                <form>
                    <div>
                        {erro && (
                            <div className="alert alert-danger">{erro}</div>
                        )}
                    </div>
                    <div className="row mb-2">
                        <input
                            id="email"
                            type="email"
                            name="campoEmailLog"
                            placeholder="Email"
                            className="form-control"
                            autoComplete="email"
                            required
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="row mb-2">
                        <input
                            type="password"
                            name="campoSenhaLog"
                            placeholder="Senha"
                            className="form-control"
                            autoComplete="password"
                            required
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                </form>
                <div className="row mb-5 ">
                    <button
                        to="/menu"
                        className="btn btn-primary btn-block"
                        onClick={handleLogin}
                    >
                        Logar
                    </button>
                </div>
                <div className="row mb-2 ">
                    <p>Não possui conta? Cadastre-se</p>
                    <Link
                        to="/criar-usuario"
                        className="btn btn-warning btn-block"
                    >
                        Criar conta
                    </Link>
                </div>
            </div>
        </>
    );
};

const LoginPage = () => {
    const ref = useRef();
    return (
        <>
            <Parallax pages={2} ref={ref}>
                <ParallaxLayer offset={0} speed={0.1}>
                    <h1
                        style={{
                            color: "white",
                            fontSize: "5rem",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Pizzaria ON
                    </h1>
                    {/*Down Arrow */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "2rem",
                        }}
                    >
                        <button
                            onClick={() => {
                                document
                                    .getElementById("email")
                                    .scrollIntoView({
                                        block: "center",
                                    });
                            }}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                fontSize: "5rem",
                                textAlign: "center",
                                position: "absolute",
                                top: "50%",
                            }}
                        >
                            👇
                        </button>
                        {/* Generate 5 random clouds */}
                        {Array.from(Array(3)).map((_, i) => {
                            return <Cloud key={i} />;
                        })}
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={2}>
                    <LoginForm />
                    <div
                        style={{
                            bottom: "0",
                        }}
                    >
                        <img
                            src="imgs/parallax1.png"
                            alt="Pizzaria ON"
                            style={{
                                position: "absolute",
                                bottom: "0",
                                width: "100%",
                                zIndex: -1,
                                marginBottom: "-10px",
                            }}
                        />
                    </div>
                </ParallaxLayer>
            </Parallax>
        </>
    );
};

export default () => {
    useEffect(() => {
        document.title = "Pizzaria ON - Login";
    }, []);
    return (
        <div className={style.body}>
            <LoginPage />
        </div>
    );
};
