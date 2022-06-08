var express = require("express");
var passport = require("passport");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var User = require("../../models/user");

var router = express.Router();


router.get("/", function (req, res) {
    res.render("home/");
});

router.get("/home", function (req, res) {
    res.render("home/home");
});

router.get("/about", function (req, res) {
    res.render("home/about");
});

router.get("/login", function (req, res) {
    res.render("home/login")
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home");
});

router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/signup", function (req, res) {
    res.render("home/signup")
});

router.post("/signup", function (req, res, next) {

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var phonenumber = req.body.phonenumber;
    var email = req.body.email;
    var password = req.body.password;

    console.log(firstname);
    console.log(lastname);
    console.log(address);
    console.log(phonenumber);
    console.log(email);
    console.log(password);

    User.findOne({ email: email }, function (err, user) {
        if (err) { return next(err); }
        if (user) {
            req.flash("error", "There's already an account with this email");
            return res.redirect("/signup");
        }

        // var newUser = new User({
        //     firstname: firstname,
        //     lastname: lastname,
        //     address: address,
        //     phonenumber: phonenumber,
        //     password: password,
        //     email: email
        User.findOne({ phonenumber: phonenumber }, function (err, user) {
            if (err) { return next(err); }
            if (user) {
                req.flash("error", "There's already an account with this email");
                return res.redirect("/signup");
            }
            var newUser = new User({
                firstname: firstname,
                lastname: lastname,
                address: address,
                phonenumber: phonenumber,
                password: password,
                email: email
        });

        newUser.save(next);


    });});

}, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));

module.exports = router;
