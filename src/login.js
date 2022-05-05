function Login() {
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
                        <input type="text" name="campoEmailLog" placeholder="Email" className="form-control" autocomplete="off"
                            required>
                        </input>
                    </div>
                    <div className="row mb-2">
                        <input type="password" name="campoSenhaLog" placeholder="Senha" className="form-control" required>
                        </input>
                    </div>
                    <div className="row mb-5">
                        <a href="/menu" className="btn btn-primary btn-block ">Logar</a>
                    </div>
                    <div className="row mb-2">
                        <p>Não possui conta? Cadastre-se</p>
                        <a href='Cliente Novo.html' className="btn btn-primary btn-block ">Criar conta</a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
