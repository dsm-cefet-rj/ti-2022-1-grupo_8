import AdminNav from "./admin-nav";
import { pizzas as pizzaBD } from "../store";

/* 
Componente: GerirPizzas
Descrição: Componente que renderiza a página de gerenciamento de pizzas
*/
const GerirPizzas = () => {
    const pizzas = pizzaBD.sort((a, b) => {
        return b.quant_comprada - a.quant_comprada;
    });

    return (
        <>
            <AdminNav Atual="pizzas" />
            <div class="container mb-2 p-1 bg-transparent">
                <div class="row section">
                    <p><b>Pizzas Cadastradas</b></p>
                    <div class="scrollmenu">
                        {pizzas.map(pizza => (
                            <div style={{
                                "width": "18rem",
                                "margin": "0.5rem",
                                "border": "1px solid #ccc",
                                "border-radius": "0.25rem",
                                "padding": "1rem",
                                "display": "flex",
                                "flex-direction": "column",
                                "justify-content": "space-between",
                                "align-items": "center",
                            }} key={pizza.id}>
                                <img class="card-img-top" src={pizza.imagem} alt={pizza.nome} style={{
                                    "width": "12rem",
                                    "height": "12rem",
                                    "object-fit": "cover",
                                }} />
                                <div class="card-body">
                                    <h5 class="card-title">{pizza.nome}</h5>
                                    <button class="btn btn-lg btn-primary btn-success">Alterar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default GerirPizzas;