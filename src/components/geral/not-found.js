import React from "react";
import style from "./not-found.module.scss";

const NotFound = () => {
    return (
        <div className={style.notFound}>
            <h1>NEM UMA PIZZA POR AQUI!</h1>
            <a href="/login">Voltar para o início 🍕 😋</a>
        </div>
    );
};

export default NotFound;
