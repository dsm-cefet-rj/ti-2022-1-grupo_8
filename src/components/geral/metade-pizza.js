import React from "react";
import { useState } from "react";
import { ingredientes as ingredientesBD } from "../store";

/* 
Componente: Metade
Descrição:  Componente que renderiza a metade de um pizza personalizada
*/
const Metade = (props) => {

    // Variáveis que controlam se a metade esta ative e quanta metades existem.
    const [id] = useState(props.id);
    const [active, setActive] = useState(props.active);
    const max_ingredientes = props.max_ingredientes ? props.max_ingredientes : 5;

    // Função que controla se a metade esta ativa ou não.
    const handleClick = () => setActive(!active);
    // Variáveis que controlam os ingredientes selecionados.
    const [ingredientes, setIngredientes] = useState([]);

    // Função que adiciona um ingrediente ao array de ingredientes quando o checkbox esta marcado.
    const adicionarIngrediente = (ingrediente , id_metade, id_ingrediente ) => {
        // se tiver mais que max_ingredientes, não permite adicionar mais
        if (ingredientes.length < max_ingredientes) {
            // desmacar o checkbox
            return;
        }

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
                                        id={ingrediente.id.toString()}
                                        onChange={() => adicionarIngrediente(ingrediente , id, ingrediente.id)}
                                    />
                                    <label className="form-check-label" htmlFor={ingrediente.id.toString()}>
                                        {ingrediente.nome}
                                    </label>
                                    <p>R$ {ingrediente.preco}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {id === 4 ? (null) : (<hr />)}
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

export default Metade;
