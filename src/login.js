import { useEffect } from "react";
import { Link } from "react-router-dom";
/*
Componente: Login
Descrição: Componente que renderiza a página de login
*/
const Login = () => {
    useEffect(() => {
        document.title = "Pizzaria ON - Login";
    }, []);

    return (
        <>
            <div className="logo text-center">
                <h1 >Pizzaria ON</h1>
            </div>

            <div className="container mt-1 mb-5 p-5 bg-transparent">
                <div className="row">
                    <h1 className="titulo">Login</h1>
                </div>
                <form>
                    <div className="row mb-2">
                        <input type="email" name="campoEmailLog" placeholder="Email" className="form-control" autoComplete="email" required />
                    </div>
                    <div className="row mb-2">
                        <input type="password" name="campoSenhaLog" placeholder="Senha" className="form-control" autoComplete="password" required />
                    </div>
                    <div className="row mb-5">
                        <Link to="/menu" className="btn btn-primary btn-block ">Logar</Link>
                    </div>
                    <div className="row mb-2">
                        <p>Não possui conta? Cadastre-se</p>
                        <Link to ='/criar-usuario' className="btn btn-primary btn-block ">Criar conta</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
