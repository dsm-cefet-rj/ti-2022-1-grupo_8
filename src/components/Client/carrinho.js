import MenuNav from "./menu-nav";
import { useSelector, useDispatch } from "react-redux";
import { setCarrinho, getFromLocalStorage } from "../../features/carrinhoSlice";
import { useState } from "react";

/* 
Componente: Carrinho
Descrição: Componente que renderiza a página de carrinho
*/
const Carrinho = () => {
    const itens = getFromLocalStorage();

    const dispatch = useDispatch();

    const [itensCarrinho, setItensCarrinho] = useState(itens);


    const [total, setTotal] = useState(
        itensCarrinho.reduce((total, item) => {
            return total + item.preco * item.quantidade;
        }, 0)
    );


    const recalcularTotal = (novoCarrinho) => {
        setTotal(0);
        let total = itensCarrinho.reduce((total, item) => {
            return total + item.preco * item.quantidade;
        }, 0)
        setTotal(total);
    }

    // Manuseio da quantidade de um item
    const mudarQuantidade = (id, quantidade) => {
        const novoCarrinho = itensCarrinho.map((item) => {
            if (item.id === id) {
                if (quantidade > 0) 
                    item.quantidade = quantidade;                            
            }
            return item;
        });
        setItensCarrinho(novoCarrinho);
        recalcularTotal(novoCarrinho);
        setCarrinho(novoCarrinho);
    };

    // manuseio da remoção de um item
    const remover = (produto) => {
        let novoCarrinho = itensCarrinho.filter((item) => {
            return item.id !== produto.id;
        });

        setItensCarrinho(novoCarrinho);

        

        setCarrinho(novoCarrinho);

        if (novoCarrinho.length === 0) {
            dispatch(setCarrinho([]));
            setTotal(0);
        } else {
            dispatch(setCarrinho(novoCarrinho));
            recalcularTotal(novoCarrinho);
        }
    };

    // Limpa o carrinho
    const limpar = () => {
        setItensCarrinho([]);
        setTotal(0);
        dispatch(setCarrinho([]));
    };

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
                                    <tr key={item.id}>
                                        <td>{item.nome}</td>
                                        <td>{item.preco}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => mudarQuantidade(item.id, item.quantidade + 1)}>+</button>
                                            {item.quantidade}
                                            <button className="btn btn-danger" onClick={() => mudarQuantidade(item.id, item.quantidade - 1)}>-</button>
                                        </td>
                                        <td>
                                            {item.preco * item.quantidade}
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                onClick={() => remover(item)}>Remover</button>
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
                                total.toFixed(2)
                            }
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm mb-4" style={{ 'textAlign': 'center', }}>
                        <button href="#" className="btn btn-success  btn-lg">Finalizar Compra</button>
                    </div>
                    <div className="col-sm mb-4" style={{ 'textAlign': 'center', }}>
                        <button href="#" className="btn btn-danger  btn-lg" onClick={limpar}>Limpar Carrinho</button>
                    </div>
                    <div className="col-sm mb-4" style={{ 'textAlign': 'center', }}>
                        <a href="/menu" className="btn btn-warning  btn-lg">Voltar</a>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Carrinho;