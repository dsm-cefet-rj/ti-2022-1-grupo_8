import { React, useState } from "react";

const PedidoCard = (props) => {
    const numeroPedido = props.numeroPedido; // Numero do pedido
    const data = props.data; // Data do pedido
    const itens = props.itens; // Itens do pedido
    const entregue = props.entregue; // Se o pedido foi entregue

    return (
        <>
            <div className="row section">
                <h2 className="titulo">Pedido: #{numeroPedido}</h2>
                <h2 className="titulo">Feito em:{data}</h2>
                <h2 className="titulo">Itens:</h2>
                {itens.map((item) => (
                    <></>
                ))}
                <h2 className="titulo">Entregue: {entregue ? "Sim" : "Não"}</h2>
            </div>
        </>
    );
};
