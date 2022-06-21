const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
    addIngrediente,
    editIngrediente,
    removeIngrediente,
    addPizza,
    editPizza,
    removePizza,
    addProduto,
    editProduto,
    removeProduto,
    editUsuario,
    removeUsuario } = require("../data/DAO")

// Rota para adicionar ou editar um ingrediente
router.post("/editar-ingrediente", (req, res) => {


});

// Rota para adicionar ou editar uma pizza
router.post("/editar-pizza", (req, res) => {


});

// Rota para adicionar ou editar um produto
router.post("/editar-produto", (req, res) => {


});

// Rota para editar um usuário
router.post("/editar-usuario", (req, res) => {


});

// Rota para excluir um funcionário
router.post("/excluir-ingrediente", (req, res) => {


});

// Rota para excluir um funcionário
router.post("/excluir-pizza", (req, res) => {


});

// Rota para excluir um funcionário
router.post("/excluir-produto", (req, res) => {


});

// Rota para excluir um funcionário
router.post("/excluir-usuario", (req, res) => {


});

module.exports = router;
