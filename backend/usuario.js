const { getIngredientes, getPizzas, getProdutos } = require("./data/DAO");

const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/ingredientes", (req, res) => {
    res.status(200).json(getIngredientes());
});

module.exports = router;