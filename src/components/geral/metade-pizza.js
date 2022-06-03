import React from "react";
import { useState } from "react";
import { ingredientes as ingredientesBD } from "../store";
import {
        setMetades,
        getMetades,
} from "../../features/ingredientes-metadeSlice";
import { useDispatch } from "react-redux";

/* 
Componente: Metade
Descrição:  Componente que renderiza a metade de um pizza personalizada
*/
const Metade = (props) => {
        const dispatch = useDispatch();

        // Variáveis que controlam se a metade esta ative e quanta metades existem.
        const [id] = useState(props.id);
        const [active, setActive] = useState(props.active);
        const max_ingredientes = props.max_ingredientes
                ? props.max_ingredientes
                : 7;

        // Função que controla se a metade esta ativa ou não.
        const handleClick = () => {
                setActive(!active);
                document.getElementById(`SCROLLMENU${id - 1}`).scrollIntoView({
                        behavior: "smooth",
                });
        };

        // Variáveis que controlam os ingredientes selecionados.
        const [ingredientes, setIngredientes] = useState([]);

        // Função que adiciona um ingrediente ao array de ingredientes quando o checkbox esta marcado.
        const handleCheckbox = (e) => {
                let payload = {
                        ingredientes: [],
                        id: id,
                };
                // Se o checkbox estiver marcado, e o numero de ingredientes selecionados for menor que o máximo, adiciona o ingrediente.
                if (
                        e.target.checked &&
                        ingredientes.length <= max_ingredientes
                ) {
                        setIngredientes([...ingredientes, e.target.value]);
                        payload.ingredientes = [
                                ...ingredientes,
                                e.target.value,
                        ];
                        console.log(
                                "Adicionando ingrediente: " + e.target.value
                        );
                }
                // Se o checkbox estiver desmarcado, remove o ingrediente.
                else if (!e.target.checked) {
                        setIngredientes(
                                ingredientes.filter(
                                        (ingrediente) =>
                                                ingrediente !== e.target.value
                                )
                        );
                        payload.ingredientes = ingredientes.filter(
                                (ingrediente) => ingrediente !== e.target.value
                        );
                        console.log("Removendo ingrediente: " + e.target.value);
                } else {
                        console.log(
                                "Não é possível adicionar mais ingredientes"
                        );
                        e.target.checked = false;
                }
                dispatch(setMetades(payload));
        };

        // Renderiza o componente.
        return (
                <>
                        {active === true ? (
                                <>
                                        <div className="row section">
                                                <div className="col">
                                                        <p>
                                                                <b>
                                                                        Metade{" "}
                                                                        {id}
                                                                </b>
                                                        </p>
                                                        <div
                                                                className="scrollmenu"
                                                                id={`SCROLLMENU${id}`}
                                                        >
                                                                {ingredientesBD.map(
                                                                        (
                                                                                ingrediente
                                                                        ) => (
                                                                                <div
                                                                                        className="ingrediente"
                                                                                        key={
                                                                                                ingrediente.id
                                                                                        }
                                                                                >
                                                                                        <p
                                                                                                className="form-check-label"
                                                                                                htmlFor={ingrediente.id.toString()}
                                                                                        >
                                                                                                {
                                                                                                        ingrediente.nome
                                                                                                }
                                                                                        </p>
                                                                                        <img
                                                                                                src={
                                                                                                        ingrediente.imagem
                                                                                                }
                                                                                                alt="Pizza"
                                                                                                style={{
                                                                                                        width: "100px",
                                                                                                        borderRadius:
                                                                                                                "10px",
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
                                                                                                onChange={
                                                                                                        handleCheckbox
                                                                                                }
                                                                                        />
                                                                                        <p>
                                                                                                R${" "}
                                                                                                {
                                                                                                        ingrediente.preco
                                                                                                }
                                                                                        </p>
                                                                                </div>
                                                                        )
                                                                )}
                                                        </div>
                                                </div>
                                        </div>
                                        {id === 4 ? null : <hr />}
                                        <Metade
                                                key={(id + 1).toString()}
                                                id={id + 1}
                                                active={false}
                                                max_ingredientes={
                                                        max_ingredientes
                                                }
                                        />
                                </>
                        ) : id > 4 ? null : (
                                <>
                                        <div className="row section">
                                                <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        data-toggle="modal"
                                                        data-target="#exampleModal"
                                                        onClick={handleClick}
                                                >
                                                        {" "}
                                                        Adicionar Nova Metade{" "}
                                                </button>
                                        </div>
                                </>
                        )}
                </>
        );
};

export default Metade;
