import React, { useEffect } from "react";
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
    const max_ingredientes = props.max_ingredientes ? props.max_ingredientes : 7;
    
    // Variável que recebe a lista de ingredientes do componente pai.
    const ingredientes = props.ingredientes[id];

    // Passa a lista de ingredientes alterada para o componente pai.
    const handleChangeIngredientes = (ingredientes) => {
        this.props.onIngredientesChange(id, ingredientes);
    }

    // Função que adiciona um ingrediente ao array de ingredientes quando o checkbox esta marcado.
    const handleCheckbox = (e) => {
        if (ingredientes.length >= max_ingredientes) {
            handleChangeIngredientes([...ingredientes, e.target.value]);
            e.target.checked = false;
            return;
        }
        if( ingredientes.includes(e.target.value) ) {
            handleChangeIngredientes(ingredientes.filter(i => i !== e.target.value));
            e.target.checked = false;
            return;
        }
        handleChangeIngredientes([...ingredientes, e.target.value]);
        e.target.checked = true;
    }

    // Renderiza o componente.
    return (
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
                                    onClick={handleCheckbox}
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
        </>
    );
}

export default Metade;
