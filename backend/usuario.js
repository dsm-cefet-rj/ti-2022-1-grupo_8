const { getIngredientes, getPizzas, getProdutos } = require("./data/DAO");

const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/ingredientes", (req, res) => {
    res.status(200).json(getIngredientes()).end();
});

router.get("/pizzas", (req, res) => { 
    res.status(200).json(getPizzas());
});

router.get("/produtos", (req, res) => {
    res.status(200).json(getProdutos());
});

module.exports = router;