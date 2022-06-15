var express = require("express");
var router = express.Router();
require("dotenv").config();

router.get("/pizza", (req, res) => {
    res.status(200).send("Pizza");

});

module.exports = router;