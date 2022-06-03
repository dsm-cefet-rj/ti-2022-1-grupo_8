import React, { useEffect } from "react";
import { useState } from "react";
import { ingredientes as ingredientesBD } from "../store";

/* 
Componente: Metade
Descrição:  Componente que renderiza a metade de um pizza personalizada
*/
const Metade = (props) => {



    const dispatch = useDispatch();

    const type = props.type; // "Cliente" ou "Admin"

    const [id] = useState(props.id);
    const [adicaoBloqueada, setAdicaoBloqueada] = useState(false);
    const max_ingredientes = props.max_ingredientes ? props.max_ingredientes : 7;
    
    // Variável que recebe a lista de ingredientes do componente pai.
    let ingredientesSelecionados = props.ingredientes;

    // Passa a lista de ingredientes alterada para o componente pai.
    const handleChangeIngredientes = (ingredientes) => {
        props.onIngredientesChange(ingredientes);
    }

    // Função que adiciona um ingrediente ao array de ingredientes quando o checkbox esta marcado.
    const handleCheckbox = (e) => {
        const index = parseInt(e.target.value);
        const ativado = e.target.checked;
        
        if (ativado) {
            if (!ingredientesSelecionados.includes(index)) {
                ingredientesSelecionados.push(index);
            }
        } else {
            ingredientesSelecionados = ingredientesSelecionados.filter(item => item !== index);
        }

        handleChangeIngredientes(ingredientesSelecionados);

        // Bloquear ingredientes se a quantidade máxima for atingida
        setAdicaoBloqueada(ingredientesSelecionados.length >= max_ingredientes);
       
        //if (type === "Admin") {
        //    let metades = getMetades();
        //    metades[id] = ingredientes;
        //    dispatch(setMetades(metades));
        //}
    }

    // Renderiza o componente.
    return (
        <>
            <div className="row section">
                <div className="col">
                    <p><b>Metade {id + 1}</b></p>
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
                                    disabled={adicaoBloqueada && !ingredientesSelecionados.includes(ingrediente.id)}
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
