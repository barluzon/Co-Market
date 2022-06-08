const chherio = require('cheerio');
const axios = require('axios');


let url = encodeURI(`https://www.zapmarket.co.il/?query=חומוס`);
//https://www.zapmarket.co.il/?query=%D7%97%D7%95%D7%9E%D7%95%D7%A1
console.log(url);

axios.get(url).then(
    (resp) => {
        console.log("check 1");
        getData(resp.data);
    }
).catch(
    (err) => { console.log(err); }
)

let getData = (html) => {
    // initial array for information
    data = [];
    // initailize chherio to search elements in html code
    const $ = chherio.load(html);

    $("ul.ULProductList>li.NgMspProductCell").each((i, elem) => {
        data.push({
            "title": $(elem).find(".Prefix").text(),
            "subTitle": $(elem).find(".Suffix").text(),
            "price": $(elem).find(".Price").text(),
            "imageLink": $(elem).find(".ProductImage").attr('src'),
            "company": "ויקטורי"
        });

    });

    console.log(data);
}