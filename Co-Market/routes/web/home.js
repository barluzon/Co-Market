var express = require("express");
var passport = require("passport");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var User = require("../../models/user");
var Product = require("../../models/product");


var router = express.Router();


router.get("/",  function (req, res) {
    res.render("home/");

});

router.get("/home", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)
        var temp =
            '<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            // '    <div class="modal-wrapper">\n' +
            // '        <div class="modal">\n' +
            // '            <div class="head">\n' +
            // '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            // '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            // '                </a>\n' +
            // '\n' +
            // '            </div>\n' +
            // '            <div class="content">\n' +
            // '                <div class="good-job">\n' +
            // '                    <h1>Good Job!\n ' +
            // '\n'  +
            // '                    </h1>\n' +
            // '                    </div>\n' +
            // '            </div>\n' +
            // '        </div>\n' +
            // '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="about#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })

    // console.log(ret)
    res.render('home/home', {data: {products: ret, productsFromDb: products,branches: bran }})
    //res.render("home/home");
});

router.get("/about", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function (key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle = products[key].title
        let img = "" + products[key].imageSrc + ""
        var prodID = "" + products[key].id + ""
        let prodHPrice = "" + products[key].highPrice + ""
        let prodLPrice = "" + products[key].lowPrice + ""
        let compBranches = products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        // bran = jsonb.replaceAll('{', '').replaceAll('}', '\n').replaceAll('"', '').replaceAll('[', '').replaceAll(']', '').replaceAll(',', '')
        bran = jsonb.replaceAll('[','').replaceAll(']','').replaceAll('"','').replaceAll(' , ',',\n').replaceAll('{','\n').replaceAll('}','\n')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE', 'אונליין').replaceAll('Be','בי').replaceAll('unknown','סניף לא ידוע').replaceAll(' ,','\n')
        // console.log(bran)

        var temp = '<div class="col4">' +
            '<img src=' + img + ' alt=""/>' + ' \n ' +
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n ' +
            '\n'  +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">' +
            '<h4 class="shop-item-title"> ' + prodTitle.split("").reverse().join("") + ' </h4>' +
            '</a>' + '<h5>'+bran+'</h5> '+
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪' + prodLPrice + ' - ₪' + prodHPrice + '</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'


            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/about", {data: {products: ret, productsFromDb: products, branches: bran}});
});

router.get("/login", function (req, res) {
    res.render("home/login")
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home");
});

router.post("/login", passport.authenticate("login", {
    successRedirect: "/home",
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
router.get("/baby", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/baby", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/bread", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/bread", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/clean", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/clean", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/cook", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/cook", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/diary", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/diary", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/drinks", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/drinks", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/frozen", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/frozen", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/fruits", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/fruits", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/health", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/health", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/forhome", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/forhome", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/meat", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/meat", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/pasta", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/pasta", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/salad", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/salad", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/sauce", async function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/sauce", {data: {products: ret, productsFromDb: products,branches: bran }});
});
router.get("/snacks", async  function (req, res) {
    var ret = ''
    const products = await Product.getAll()
    var bran = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        var prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        let compBranches =products[key].comparing
        const jsonb = JSON.stringify(compBranches);
        bran = jsonb.replaceAll('{','').replaceAll('}','\n').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',','')
        bran = bran.replaceAll('am:pm', 'אמפם').replaceAll('ONLINE','אונליין')
        // console.log(bran)

        var temp ='<div class="col4">' +
            '<img src='+img+' alt=""/>' +' \n '+
            '    <div class="modal-wrapper">\n' +
            '        <div class="modal">\n' +
            '            <div class="head">\n' +
            '                <a class="btn-close compare-title" href="#"> יציאה\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </a>\n' +
            '\n' +
            '            </div>\n' +
            '            <div class="content">\n' +
            '                <div class="good-job">\n' +
            '                    <h1>Good Job!\n' + bran +
            '\n' +
            '                    </h1>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '<a onclick="location.href=this.href;return false;" class="compare-title" href="#' + prodID + '">'+
            '<h4 class="shop-item-title"> '+prodTitle.split("").reverse().join("")+' </h4>' +
            '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
            '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
            // '<div class="wrapper">' +
            // '    <a href="#demo-modal">Open Demo Modal</a>\n' +
            // '</div>\n' +
            // '<div id="demo-modal" class="modal">' +
            // '    <div class="modal__content">' +
            // '        <h1>מחירים לפי רשת</h1>\n' +
            // '        <P id="comparator">' + bran + "ansadklnaklnsdklnasdn" +
            // '        </P>' +
            // '        <a href="#" class="modal__close">&times;</a>' +
            // '    </div>' +
            // '</div>' +
            // '</div>'



            '</div>'
        ret = ret.concat(temp)
    })
    res.render("home/categories/snacks", {data: {products: ret, productsFromDb: products,branches: bran }});
});

router.get("/checkout",  function (req, res) {
    res.render("home/checkout");

});

module.exports = router;
