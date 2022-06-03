import React, { useEffect } from "react";
import { useState } from "react";
import { ingredientes as ingredientesBD } from "../store";
import { setMetades, getMetades } from '../../features/gerir-pizzaSlice';
import { useDispatch } from 'react-redux';

/* 
Componente: Metade
Descrição:  Componente que renderiza a metade de um pizza personalizada
*/
const Metade = (props) => {



    const dispatch = useDispatch();

    const type = props.type; // "Cliente" ou "Admin"

    // Variáveis que controlam se a metade esta ative e quanta metades existem.
    const [id] = useState(props.id);
    const [active, setActive] = useState(props.active);
    const max_ingredientes = props.max_ingredientes ? props.max_ingredientes : 7;

    // Função que controla se a metade esta ativa ou não.
    const handleClick = () => {
        setActive(!active);
        document.getElementById(
            `SCROLLMENU${id-1}`
        ).scrollIntoView({ behavior: "smooth" });
    }
    // Variáveis que controlam os ingredientes selecionados.
    const [ingredientes, setIngredientes] = useState([]);

    // Função que adiciona um ingrediente ao array de ingredientes quando o checkbox esta marcado.
    const handleCheckbox = (e) => {
        if (ingredientes.length >= max_ingredientes) {
            setIngredientes([...ingredientes, e.target.value]);
            e.target.checked = false;
            return;
        }
        if( ingredientes.includes(e.target.value) ) {
            setIngredientes(ingredientes.filter(i => i !== e.target.value));
            e.target.checked = false;
            return;
        }
        setIngredientes([...ingredientes, e.target.value]);
        e.target.checked = true;
        props.handleIngredientes(ingredientes, id);

        if (type === "Admin") {
            let metades = getMetades();
            metades[id] = ingredientes;
            dispatch(setMetades(metades));
        }
    }

    // Renderiza o componente.
    return (<>
        {active === true ? (
            <>
                <div className="row section">
                    <div className="col">
                        <p><b>Metade {id}</b></p>
                        <div className="scrollmenu" id = {`SCROLLMENU${id}`}>
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
