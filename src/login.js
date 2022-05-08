import { useEffect } from "react";
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
                        <a href="/menu" className="btn btn-primary btn-block ">Logar</a>
                    </div>
                    <div className="row mb-2">
                        <p>Não possui conta? Cadastre-se</p>
                        <a href='/criar-usuario' className="btn btn-primary btn-block ">Criar conta</a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
