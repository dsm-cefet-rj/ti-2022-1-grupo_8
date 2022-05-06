import AdminNav from "./admin-nav";
import { ingredientes } from "../store";


/* 
Componente: Ingrediente
Descrição: Componente que renderiza um ingrediente na pagina de gerir ingredientes
*/
const Ingrediente = (props) => {
    let { key, imagem, nome, preco } = props;
    return (<>
        <div className="ingrediente">
            <img src={imagem} alt="Pizza" style={{ "width": "100px", }} />
            <br />
            <p>{nome}</p>
            <p>R$ {preco}</p>
            <a href="#" className="btn btn-primary">Editar</a>
        </div>
    </>);
}

/* 
Componente: GerirIngredientes
Descrição: Componente que renderiza a página de gerenciamento de ingredientes
*/
const GerirIngredientes = () => {
    return (
        <>
            <AdminNav />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row section">
                    <div className="col">
                        <p><b>Ingredientes Cadastrados</b></p>
                        <div className="row section">
                            <div className="col">
                                <p><b>Metade 1</b></p>
                                <div className="scrollmenu">
                                    {ingredientes.map(ingrediente => (
                                        <Ingrediente key={ingrediente.id} imagem={ingrediente.imagem} nome={ingrediente.nome} preco={ingrediente.preco} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-5 section">
                    <div className="card-header mb-3">
                        <h4>Adicionar Ingrediente</h4>
                    </div>
                    <form action="Administrador Gerir Ingredientes.html" method="post">
                        <div className="form-group mb-2">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" name="nome" placeholder="Nome"/>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="preco">Preço</label>
                            <input type="text" className="form-control" id="preco" name="preco" placeholder="Preço"/>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="descricao">Descrição</label>
                            <input type="text" className="form-control" id="descricao" name="descricao" placeholder="Descrição"/>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="imagem">Imagem</label>
                            <input type="file" className="form-control" id="imagem" name="imagem" placeholder="Imagem"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Adicionar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default GerirIngredientes;
