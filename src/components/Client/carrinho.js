import MenuNav from "./menu-nav";
import { useSelector } from "react-redux";

const Carrinho = () => {
    // get form redux
    const itens = useSelector(state => state.carrinho.itens); 

    console.log(itens);

    let itensCarrinho = [];

    return (
        <>
            <MenuNav Atual="carrinho" />
            <div className="container mt-5 mb-2 p-5">
                <div className="row">
                    <h1 className="text-center">Carrinho</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Subtotal</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itensCarrinho.map(item => (
                                    <tr key={item.Produto}>
                                        <td>{item.Produto}</td>
                                        <td>{item.Preço}</td>
                                        <td>{item.Quantidade}</td>
                                        <td>{item.Preço * item.Quantidade}</td>
                                        <td>
                                            <button className="btn btn-danger">Remover</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Total:
                            {
                                itensCarrinho.reduce((total, item) => {
                                    return total + (item.Preço * item.Quantidade);
                                }, 0)
                            }
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm" style={{ 'textAlign': 'center', }}>
                        <button href="#" className="btn btn-success  btn-lg">Finalizar Compra</button>
                    </div>
                    <div className="col-sm" style={{ 'textAlign': 'center', }}>
                        <button href="Cliente Menu.html" className="btn btn-warning  btn-lg">Voltar</button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Carrinho;