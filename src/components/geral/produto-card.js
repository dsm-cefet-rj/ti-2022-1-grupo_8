const ProdutoCard = (props) => {
    let nome = props.nome;
    let descricao = props.descricao;
    let imagem = props.imagem;
    let preco = props.preco;
    let id = props.id;
    return (
        <div className="col">
            <div className="card">
                <img className="card-img-top" src={imagem} alt={nome}/>
                    <div className="card-body">
                        <h5 className="card-title">{nome}</h5>
                        <p className="card-text">{descricao}</p>
                        <p className="card-text">R$ {preco}</p>
                        <a href="#" className="btn btn-success">Adicionar ao Carinho</a>
                    </div>
            </div>
        </div>
    );
}

export default ProdutoCard;