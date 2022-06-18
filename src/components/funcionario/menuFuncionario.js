import { useSelector, useDispatch } from "react-redux";
import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FuncionarioNav from "./funcionarioNav";

/* 
Componente: MenuFuncionario
Descrição: Componente que renderiza a página principal do Funcionário
*/
const MenuFuncionario = () => {
    return (
        <>
            <FuncionarioNav Atual="menu" />
        </>
    );
};

export default MenuFuncionario;
