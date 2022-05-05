function Login() {
    return (
        <>
            <div class="logo text-center">
                <h1 >Pizzaria ON</h1>
            </div>

            <div class="container mt-1 mb-5 p-5 bg-transparent">
                <div class="row">
                    <h1 class="titulo">Login</h1>
                </div>
                <form>
                    <div class="row mb-2">
                        <input type="text" name="campoEmailLog" placeholder="Email" class="form-control" autocomplete="off"
                            required>
                        </input>
                    </div>
                    <div class="row mb-2">
                        <input type="password" name="campoSenhaLog" placeholder="Senha" class="form-control" required>
                        </input>
                    </div>
                    <div class="row mb-5">
                        <a href="/menu" class="btn btn-primary btn-block ">Logar</a>
                    </div>
                    <div class="row mb-2">
                        <p>Não possui conta? Cadastre-se</p>
                        <a href='Cliente Novo.html' class="btn btn-primary btn-block ">Criar conta</a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
