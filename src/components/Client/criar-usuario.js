const CriarUsuario = () => {
    return (
        <>
            <div className="logo text-center">
                <h1 >Pizzaria ON</h1>
            </div>
            <div className="container mt-2 mb-5 p-5 bg-transparent">
                <div className="row mb-2">
                    <h1 className="titulo">Cadastro</h1>
                </div>

                <form>
                    <div className="row mb-1">
                        <input type="text" name="campoNome" className="form-control" placeholder="Nome" autoComplete="name" required />

                    </div>
                    <div className="row mb-1">
                        <input type="email" name="campoEmail" className="form-control" placeholder="E-mail" autoComplete="email" required />
                    </div>
                    <div className="row mb-1">
                        <input type="password" name="campoSenha" className="form-control" placeholder="Senha" autoComplete="new-password" required />
                    </div>
                    <div className="row mb-5">
                        <input type="password" name="campoConfirmaSenha" className="form-control" placeholder="Confirmar senha" autoComplete="new-password" required />
                    </div>
                    <div className="row mb-2">
                        <a href="/" className="btn btn-primary btn-block ">Cadastrar</a>
                    </div>
                </form>
                <div className="row mb-2">
                    <a href="/" className="btn btn-primary btn-block ">Voltar</a>
                </div>
            </div>
        </>
    );
}

export default CriarUsuario;
