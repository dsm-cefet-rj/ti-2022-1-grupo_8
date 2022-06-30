import { getSessionFromLocalStorage } from "../../features/sessionSlice";
import { converterData } from "./util";

export const PedidoCard = (props) => {
    const idPedido = props.id;
    const email = props.email;
    const data = props.data;
    const endereco = props.endereco;
    const itens = props.itens;
    const status = props.status;
    const context = props.context;

    const avançarPedido = () => {
        const token = getSessionFromLocalStorage();
        let funções = {
            Feito: () => {
                const url = `http://localhost:3001/funcionario/iniciar-pedido/${idPedido}`;
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.status === 200) {
                        console.log("Pedido iniciado");
                    }
                });
            },
            "Em andamento": () => {
                const url = `http://localhost:3001/funcionario/finalizar-pedido/${idPedido}`;
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.status === 200) {
                        console.log("Pedido iniciado");
                    }
                });
            },
            Concluídos: () => {
                console.log(":) Pedido concluído");
            },
        };

        funções[status]();
        window.location.reload();
    };

    return (
        <>
            <div className="card" style={{ width: "18rem", lineHeight: "1" }}>
                <div className="card-header text-center">
                    <h5 className="card-title" style={{ fontSize: "1.15rem" }}>
                        Pedido #{idPedido}
                    </h5>
                    <p style={{ marginBottom: 0 }}>{converterData(data)}</p>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <strong>E-mail:</strong> {email}
                    </p>
                    <p className="card-text">
                        <strong>Endereço:</strong> {endereco}
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            {itens.map((item, index) => (
                                <li key={index} className="list-group-item">
                                    <strong key={index}>
                                        {item.quantidade}x{" "}
                                    </strong>
                                    {item.nome}
                                </li>
                            ))}
                        </ul>
                    </div>
                </ul>
                {"Concluído" === status && context !== "gerir-usuarios" ? (
                    <div className="card-footer">{"Concluído"}</div>
                ) : (
                    <div className="card-footer">
                        <button
                            className="btn btn-primary float-end"
                            onClick={avançarPedido}
                        >
                            {"Avançar >"}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
