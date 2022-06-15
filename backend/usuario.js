const {
    getAllIngredientes,
    getAllPizzas,
    getAllProdutos,
} = require("./data/DAO");

const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/ingredientes", (req, res) => {
    res.status(200)
        .set("Access-Control-Allow-Origin", "*")
        .json(getAllIngredientes())
        .end();
});

router.get("/pizzas", (req, res) => {
    res.status(200)
        .set("Access-Control-Allow-Origin", "*")
        .json(getAllPizzas());
});

router.get("/produtos", (req, res) => {
    res.status(200)
        .set("Access-Control-Allow-Origin", "*")
        .json(getAllProdutos());
});

module.exports = router;
