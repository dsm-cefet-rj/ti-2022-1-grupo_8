import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMetades } from "../../features/ingredientes-metadeSlice";
import {
    selectIngredientes,
    fetchIngredientes,
} from "../../features/clienteDatabaseSlice";
/* 
Componente: Metade
Descrição:  Componente que renderiza a metade de um pizza personalizada
*/
const Metade = (props) => {
    const dispatch = useDispatch();
    // Variavies que controlam os ingredientes do banco de dados.
    const ingredientesBD = useSelector(selectIngredientes);

    // Variáveis que controlam se a metade esta ative e quanta metades existem.
    const [id] = useState(props.id);
    const max_ingredientes = props.max_ingredientes
        ? props.max_ingredientes
        : 7;

    // Variáveis que controlam os ingredientes selecionados.
    const [ingredientes, setIngredientes] = useState([]);

    // Função que adiciona um ingrediente ao array de ingredientes quando o checkbox esta marcado.
    const handleCheckbox = (e) => {
        let payload = {
            ingredientes: [],
            id: id,
        };
        // Se o checkbox estiver marcado, e o numero de ingredientes selecionados for menor que o máximo, adiciona o ingrediente.
        if (e.target.checked && ingredientes.length < max_ingredientes) {
            setIngredientes([...ingredientes, e.target.value]);
            payload.ingredientes = [...ingredientes, e.target.value];
        }
        // Se o checkbox estiver desmarcado, remove o ingrediente.
        else if (!e.target.checked) {
            setIngredientes(
                ingredientes.filter(
                    (ingrediente) => ingrediente !== e.target.value
                )
            );
            payload.ingredientes = ingredientes.filter(
                (ingrediente) => ingrediente !== e.target.value
            );
        } else {
            e.target.checked = false;
            return;
        }
        dispatch(setMetades(payload));
    };

    useEffect(() => {
        dispatch(fetchIngredientes());
    }, [ingredientes,dispatch]);

    // Renderiza o componente.
    return (
        <>
            <div className="row section" style={{ marginBottom: "15px" }}>
                <div className="col">
                    <p>
                        <b>Metade {id + 1}</b>
                    </p>
                    <div className="scrollmenu" id={`SCROLLMENU${id}`}>
                        {ingredientesBD.map((ingrediente) => (
                            <div className="ingrediente" key={ingrediente.id}>
                                <p
                                    className="form-check-label"
                                    htmlFor={ingrediente.id.toString()}
                                >
                                    {ingrediente.nome}
                                </p>
                                <img
                                    src={ingrediente.imagem}
                                    alt="Pizza"
                                    style={{
                                        width: "100px",
                                        borderRadius: "10px",
                                    }}
                                />
                                <br />
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                    }}
                                    value={ingrediente.id.toString()}
                                    id={ingrediente.id.toString()}
                                    onChange={handleCheckbox}
                                />
                                <p>R$ {ingrediente.preco.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Metade;
