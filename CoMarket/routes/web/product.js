var express = require("express");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var router = express.Router();

router.use(ensureAuthenticated);


router.get("/", function (req, res) {
    res.render("product/products");
});

module.exports = router;