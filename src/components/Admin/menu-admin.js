import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatorio, selectRelatorio } from "../../features/relatorioSlice";
import AdminNav from "./admin-nav";
import styles from "./menu-admin.module.scss";
/* 
Componente: MenuAdmin
Descrição: Componente que renderiza a página principal de administração
*/
const MenuAdmin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRelatorio());
    }, []);

    const relatorio = useSelector(selectRelatorio);

    let pizzas, ingredientes, produtos;
    ({ pizzas, ingredientes, produtos } = relatorio);

    return (
        <>
            <AdminNav Atual="menu" />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row">
                    <h1 className="text-center">Relatórios</h1>
                </div>
                <div className="row">
                    <h2 className="text-center">Pizzas Mais Compradas 📈</h2>
                </div>
                <div className="row" style={{ width: "90%", margin: "auto" }}>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Lucro</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {pizzas.map((pizza) => (
                                <tr key={pizza.id}>
                                    <td>{pizza.nome}</td>
                                    <td>{pizza.quantidade}</td>
                                    <td>R$ {pizza.lucro.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 style={{ fontSize: "1.5rem", textAlign: "right" }}>
                        Total:{" "}
                        <span style={{ fontSize: "2.5rem" }}>
                            R$
                            {pizzas
                                .reduce((total, pizza) => {
                                    return total + pizza.lucro;
                                }, 0)
                                .toFixed(2)}
                        </span>
                    </h3>
                </div>

                <hr />

                <div className="row">
                    <h2 className="text-center">
                        {"Ingredientes Mais Utilizados 📈"}
                    </h2>
                </div>
                <div className="row" style={{ width: "90%", margin: "auto" }}>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Porções</th>
                                <th scope="col">Custo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredientes.map((ingrediente) => (
                                <tr key={ingrediente.id}>
                                    <td>{ingrediente.nome}</td>
                                    <td>{ingrediente.quantidade}</td>
                                    <td>R$ {ingrediente.lucro.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 style={{ fontSize: "1.5rem", textAlign: "right" }}>
                        Total:{" "}
                        <span style={{ fontSize: "2.5rem" }}>
                            R$
                            {ingredientes
                                .reduce((total, ingrediente) => {
                                    return total + ingrediente.lucro;
                                }, 0)
                                .toFixed(2)}
                        </span>
                    </h3>
                </div>

                <hr />

                <div className="row">
                    <h2 className="text-center">
                        {"Produtos Mais Comprados 📈"}
                    </h2>
                </div>
                <div className="row" style={{ width: "90%", margin: "auto" }}>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Lucro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.quantidade}</td>
                                    <td>R$ {produto.lucro.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 style={{ fontSize: "1.5rem", textAlign: "right" }}>
                        Total:{" "}
                        <span style={{ fontSize: "2.5rem" }}>
                            R$
                            {produtos
                                .reduce((total, produto) => {
                                    return total + produto.lucro;
                                }, 0)
                                .toFixed(2)}
                        </span>
                    </h3>
                </div>
            </div>
        </>
    );
};

export default () => {
    return (
        <div className={styles.body}>
            <MenuAdmin />
        </div>
    );
};
