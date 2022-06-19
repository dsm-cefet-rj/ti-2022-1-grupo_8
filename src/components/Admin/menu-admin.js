import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchIngredientes,
    fetchPizzas,
    fetchProdutos,
    selectIngredientes,
    selectPizzas,
    selectProdutos
} from "../../features/clienteDatabaseSlice";
import AdminNav from "./admin-nav";
import styles from "./menu-admin.module.scss";
/* 
Componente: MenuAdmin
Descrição: Componente que renderiza a página principal de administração
*/
const MenuAdmin = () => {
    const dispatch = useDispatch();

    const pizzasBD = useSelector(selectIngredientes);
    const ProdutosBD = useSelector(selectPizzas);
    const ingredientesBD = useSelector(selectProdutos);

    useEffect(() => {
        dispatch(fetchIngredientes);
        dispatch(fetchPizzas);
        dispatch(fetchProdutos);
    }, [pizzasBD, ProdutosBD, ingredientesBD, dispatch]);

    return (
        <>
            <AdminNav Atual="menu" />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row">
                    <h1 className="text-center">Relatórios</h1>
                </div>
                <div className="row">
                    <h1 className="text-center">Pizzas Mais Compradas 📈</h1>
                </div>
                <div className="row">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Lucro</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {pizzasBD.map((pizza) => (
                                <tr key={pizza.id}>
                                    <td>{pizza.nome}</td>
                                    <td>{pizza.quant_comprada}</td>
                                    <td>
                                        {(pizza.quant_comprada * 23.37).toFixed(
                                            2
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        Total: R$
                        {pizzasBD
                            .reduce((total, pizza) => {
                                return total + pizza.quant_comprada * 23.37;
                            }, 0)
                            .toFixed(2)}
                    </p>
                </div>

                <div className="row">
                    <h1 className="text-center">
                        {"Ingredientes Mais Utilizados 📈"}
                    </h1>
                </div>
                <div className="row">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Porções</th>
                                <th scope="col">Custo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredientesBD.map((ingrediente) => (
                                <tr key={ingrediente.id}>
                                    <td>{ingrediente.nome}</td>
                                    <td>{ingrediente.usados}</td>
                                    <td>
                                        {(
                                            ingrediente.usados *
                                            ingrediente.preco
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        Total: R${" "}
                        {ingredientesBD
                            .reduce((total, ingrediente) => {
                                return (
                                    total +
                                    ingrediente.usados * ingrediente.preco
                                );
                            }, 0)
                            .toFixed(2)}
                    </p>
                </div>
                <div className="row">
                    <h1 className="text-center">
                        {"Produtos Mais Comprados 📈"}
                    </h1>
                </div>
                <div className="row">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Lucro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProdutosBD.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.quant_comprada}</td>
                                    <td>
                                        {(
                                            produto.quant_comprada *
                                            produto.preco
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        Total: R$
                        {ProdutosBD.reduce((total, produto) => {
                            return (
                                total + produto.quant_comprada * produto.preco
                            );
                        }, 0).toFixed(2)}
                    </p>
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
