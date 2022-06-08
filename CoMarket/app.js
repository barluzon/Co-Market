var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var params = require("./params/params");
var chherio = require('cheerio');
var axios = require('axios');


var setUpPassport = require("./setuppassport");

var app = express();
mongoose.connect(params.DATABASECONNECTION);
setUpPassport();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"1barssecret01230124",
    resave:false,
    saveUninitialized:false
}));
app.use(express.static('assets'));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));


// shufersal search

app.get('/zap/:word', (req, res) => {

    // initial url - use parameter to change search
    console.log("search word: ", req.params.word);

    // if we use hebrew we must encode url befor use it
    let url = encodeURI(`https://www.zapmarket.co.il/?query=${req.params.word}`);

    // get request to url
    axios.get(url).then(
        (resp) => {
            // resp.data = all html page code
            getData(resp.data)
        }
    ).catch(
        (err) => { console.log(err); }
    )

    // send only the information we need
    let getData = (html) => {
        // initial array for information
        data = [];
        // initail chherio to search elements in html code
        const $ = chherio.load(html);


        $('section.tileSection3 > ul > li ').each((i, elem) => {
            data.push({
                "title": $(elem).find('div.text > strong').text(),
                "subTitle": $(elem).find('div.smallText > span').text(),
                "price": $(elem).find('div.line>span.price>span.number').text().trim(' '),
                "imageLink": $(elem).find('img.pic').attr('src'),
                "company": "שופרסל"

            })
        });

        res.send(data);
        console.log("**** data "+data);
    }

});


app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})