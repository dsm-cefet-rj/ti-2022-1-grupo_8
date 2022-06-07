import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./login.module.scss";
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
    useEffect(() => {
        document.title = "Pizzaria ON - Login";
    }, []);

    return (
        <>
            <div className="logo text-center">
                <h1>Pizzaria ON</h1>
            </div>

            <div className="container mt-1 mb-5 p-5 section">
                <div className="row">
                    <h1 className="titulo">Login</h1>
                </div>
                <form>
                    <div className="row mb-2">
                        <input
                            id="email"
                            type="email"
                            name="campoEmailLog"
                            placeholder="Email"
                            className="form-control"
                            autoComplete="email"
                            required
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
                        />
                    </div>
                    <div className="row mb-5 ">
                        <Link to="/menu" className="btn btn-primary btn-block ">
                            Logar
                        </Link>
                    </div>
                    <div className="row mb-2 ">
                        <p>Não possui conta? Cadastre-se</p>
                        <Link
                            to="/criar-usuario"
                            className="btn btn-primary btn-block"
                        >
                            Criar conta
                        </Link>
                    </div>
                </form>
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
    return (
        <div className={style.body}>
            <LoginPage />
        </div>
    );
};
