import React from "react";
import { useState } from "react";
import MenuNav from "./menu-nav";
import { ingredientes as ingredientesBD } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { setQuantidadeDeQueijo, setQuantidadeDeMolho, setTamanho, setMetades } from "../../features/criar-pizzaSlice";
import { setCarrinho } from "../../features/carrinhoSlice";

/* 
Componente: Metade
Descrição:  Componente que renderiza a metade de um pizza personalizada
*/
const Metade = (props) => {
    // Variáveis que controlam se a metade esta ative e quanta metades existem.
    const [id] = useState(props.id);
    const [active, setActive] = useState(props.active);

    // Função que controla se a metade esta ativa ou não.
    const handleClick = () => setActive(!active);

    // Dispatch do Redux
    const dispatch = useDispatch();
    // Variáveis que controlam os ingredientes selecionados.
    const [ingredientes, setIngredientes] = useState([]);


    // Função que adiciona um ingrediente ao array de ingredientes quando o checkbox esta marcado.
    const adicionarIngrediente = (ingrediente) => {
        if (ingredientes.includes(ingrediente)) {
            setIngredientes(ingredientes.filter(item => item !== ingrediente));
        } else {
            setIngredientes([...ingredientes, ingrediente]);
        }
    }


    // Renderiza o componente.
    return (<>
        {active === true ? (
            <>
                <div className="row section">
                    <div className="col">
                        <p><b>Metade {id}</b></p>
                        <div className="scrollmenu">
                            {ingredientesBD.map(ingrediente => (
                                <div className="ingrediente" key={ingrediente.id}>
                                    <img src={ingrediente.imagem} alt="Pizza" style={{ "width": "100px", }} />
                                    <br />
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={ingrediente.id.toString()}
                                        id="ingrediente1"
                                        onChange={() => adicionarIngrediente(ingrediente)}
                                    />
                                    <label className="form-check-label" htmlFor="ingrediente1">
                                        {ingrediente.nome}
                                    </label>
                                    <p>R$ {ingrediente.preco}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <hr />
                <Metade key={(id + 1).toString()} id={id + 1} active={false} />
            </>
        ) : id > 4 ? null :
            (
                <>
                    <div className="row section">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={handleClick}> Adicionar Nova Metade </button>
                    </div>
                </>
            )
        }
    </>
    );
}

/* 
Componente: CriarPizza
Descrição:  Componente que renderiza a página de criação de pizza
*/
const CriarPizza = () => {
    // Dispatch do Redux
    const dispatch = useDispatch();
    
    // Variáveis que controlam estados do componente.
    const [queijo, setQueijo] = useState(1);
    const [molho, setMolho] = useState(1);
    const [tamanho, setTamanho] = useState("");
    const [precoTotal, setPrecoTotal] = useState(0);
    const [erro, setErro] = useState('');

    // função que manipula o evento slide de queijo
    const handleQuantidadeQueijo = (valor) => {
        setQueijo(valor);
        dispatch(setQuantidadeDeQueijo(valor));
        handlePrecoTotal();
    }

    // função que manipula o evento slide de molho
    const handleQuantidadeMolho = (valor) => {
        setMolho(valor);
        dispatch(setQuantidadeDeMolho(valor));
        handlePrecoTotal();
    }

    // função que manipula o radio button de tamanho
    const handleTamanho = (valor) => {
        setTamanho(valor);
        dispatch(setTamanho(valor));
        handlePrecoTotal();
    }

    // função que manipula o valor total da pizza
    const handlePrecoTotal = () => {
        if (erro) {
            setErro('');
        }
    }

    // função que adiciona a pizza customizada ao carrinho
    const adicionarAoCarrinho = () => {
        if (tamanho === "") {
            setErro("Selecione um tamanho");
        } else {

            alert("Pizza adicionada ao carrinho");
        }
    }


    // Renderiza a página de criação de pizza.
    return (
        <>
            <MenuNav />
            <form>
                <div className="container">
                    <div className="row">
                        <h1 className="text-center">Monte sua pizza</h1>
                    </div>
                    <div className="row">
                        <h5 className="text-center" style={{ "color": "red" }}>{erro}</h5>
                    </div>
                    <div className="row section">
                        <section style={{ "margin": "50px auto", "width": "80%", }}>
                            <label htmlFor="qtdQueijo" className="form-label">Quantidade de queijo</label>
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                step=".1"
                                max="2"
                                value={queijo}
                                onChange={(e) => { handleQuantidadeQueijo(e.target.value); }}
                                id="qtdQueijoRange" />
                            <label htmlFor="qtdMolho" className="form-label">Quantidade de molho</label>
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                step=".1"
                                max="2"
                                value={molho}
                                onChange={(e) => { handleQuantidadeMolho(e.target.value); }}
                                id="qtdMolhoRange" />
                        </section>
                    </div>
                    <div className="row section">
                        <div className="col">
                            <p><b>Tamanho</b></p>
                            <div className="scrollmenu">
                                <div className="tamanho">
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="" id="Pequena" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho1" onChange={() => { handleTamanho("Pequena"); }}>Pequena</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="" id="Media" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho2" onChange={() => { handleTamanho("Media"); }}>Media</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="" id="Grande" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho3" onChange={() => { handleTamanho("Grande"); }}>Grande</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="" id="Familia" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho4" onChange={() => { handleTamanho("Familia"); }}>Família</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h5>Ingredientes</h5>
                        <p>Escolha até 5 em cada metade</p>
                    </div>
                    <Metade key="1" id={1} active={true} />
                </div>
                <hr />
                <div className="row section">
                    <p><b>Preço total:</b></p>
                    <p>R$
                        {precoTotal.toFixed(2)}
                    </p>
                </div>
                <hr />
            </form>
            <div style={{ "textAlign": "center", }}>
                <a href="/menu" style={{ "margin": " 0 5px" }} className="btn btn-outline-danger">Cancelar</a>
                <button className="btn btn-primary" onClick={() => adicionarAoCarrinho()}>Adicionar ao carrinho</button>
            </div>
        </>
    );
}

export default CriarPizza;