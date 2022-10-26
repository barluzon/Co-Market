const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const {saveProduct, getAll} = require('./models/product')
const mongoose = require("mongoose");
const params = require("./params/params");
async function connectToMongo() {
    try {
        await mongoose.connect(params.DATABASECONNECTION);
        console.log("Connected to DB successfully")
    } catch (err) {
        console.log("Could not established connection to mongodb")
    }
}


async function scrapeBranchesFile(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const branches = await page.evaluate(() => {
        //return Array.from(document.querySelectorAll("product-branches:nth-child(1)"
        return Array.from(document.querySelectorAll("#branchesListContainer > product-branches > div > div.overview-section-new-branchData-right > div.overview-section-branch-name.ng-binding.ng-scope," +
            "  #branchesListContainer > product-branches > div > div > div.overview-section-branch-full-price.ng-binding"
        )).map(x => x.textContent)

    })

    // var JsonToDB =[]
    //
    // for (let i = 0;i<branches.length-1;i++) {
    //     let temp = {}
    //     // let temp = ''+[branches[i]] + ' : ' + branches[i + 1].trim().replace('₪','')
    //     temp[branches[i].trim()] = branches[i + 1].trim().replace('₪','').replace('\n','').trim()
    //     JsonToDB.push(temp)
    //     i++
    //
    // }
    console.log(branches.join(''))

 await fs.writeFile("branches.txt", branches.join(''));
//     await fs.writeFile("branches.txt", JsonToDB);


}


async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // const [el] = await page.$x('//*[@id="17170"]/div[3]/a');
    // var prodName = await (await el.getProperty('innerText')).jsonValue();
    // prodName = reverseString(prodName);
    //
    // const [el2] = await page.$x('//*[@id="17170"]/div[5]/span[1]');
    // var lowPrice = await (await el2.getProperty('innerText')).jsonValue();
    //
    // const [el3] = await page.$x('//*[@id="17170"]/div[5]/span[3]');
    // var highPrice = await (await el3.getProperty('innerText')).jsonValue();
    //

    // const [products] = await page.$x('//*[@class="productItem"]')
    // //console.log(products)
    // const properties = (await products.getProperty('id')).asElement()
    // console.log(properties)
    // for (const property of properties.values()) {
    //     const element = property.asElement();
    //     if (element)
    //         console.log(element)
    // }
    //var productArray = await (await products.getProperty('id')).jsonValue();
    // const productArray = await page.evaluate(() => {
    //     const productsList = Array.from(document.querySelector("#productsList > div"));
    //     const arrayOfProducts = []
    //     for(let i = 0; i< productsList.length; i++) {
    //         let currProduct = productsList[i];
    //         let id = currProduct.id;
    //         arrayOfProducts.push({id})
    //     }
    //     return arrayOfProducts
    //     // const description = document.querySelector(
    //     //     "#mw-content-text .mw-parser-output p"
    //     // );
    //     // const descriptionText = description.innerText;
    // });
    //console.log(productArray)

    //from here *****************
    async function scrapeBranches(url) {
        await page.goto(url);
        const branches = await page.evaluate(() => {
            //return Array.from(document.querySelectorAll("product-branches:nth-child(1)"
            return Array.from(document.querySelectorAll("#branchesListContainer > product-branches > div > div.overview-section-new-branchData-right > div.overview-section-branch-name.ng-binding.ng-scope," +
                "  #branchesListContainer > product-branches > div > div > div.overview-section-branch-full-price.ng-binding"
            )).map(x => x.textContent)


        })
        var JsonToDB = []

        for (let i = 0; i < branches.length - 1; i++) {
            let temp = {}
            // let temp = ''+[branches[i]] + ' : ' + branches[i + 1].trim().replace('₪','')
            temp[branches[i].trim()] = branches[i + 1].trim().replace('₪', '').replace('\n', '').trim()
            JsonToDB.push(temp)
            i++

        }
        return JsonToDB
    }
    //to here *******************

    const products = await page.evaluate( () => {
        let results = []
        console.log("Trying fetch urls")
        let urls = document.querySelectorAll('div.productName > a')
        urls.forEach((element) =>
            results.push(
                {
                    url: element.toString()
                }
            )
        )
        console.log("urls fetched successfully, trying data")
        let data = document.querySelectorAll("div.productName")
        data.forEach((element, index) => {
            if (results[index]) {
                let elementNameAttribute = element.getElementsByClassName("ng-binding ng-scope").item(0).textContent
                results[index] = {
                    name: elementNameAttribute.replaceAll("\n", "").trim().split("").reverse().join(""),
                    id: results[index].url.split("/")[results[index].url.split("/").length - 1]
                }
            }
        })
        console.log("data fetched successfully, trying images")

        let images = document.querySelectorAll("div.productImg")
        images.forEach((element, index) => {
            if (results[index]) {
                let elementNameAttribute = element.getAttribute("style").toString().split('url("')[1].split('")')[0]
                results[index] = {
                    name: results[index].name,
                    id: results[index].id,
                    imageSrc: elementNameAttribute
                }
            }
        })
        console.log("images fetched successfully, trying prices")

        let prices = document.querySelectorAll("div.productPriceRange")
        for (let i = 0; i < prices.length; i++) {
            let element = prices[i]
            if (results[i]) {
                let elementNameAttribute = element.getElementsByClassName("ng-binding")
                let lowPrice = elementNameAttribute.item(0).textContent
                let highPrice = elementNameAttribute.item(1).textContent
                results[i] = {
                    name: results[i].name,
                    id: results[i].id,
                    highPrice,
                    lowPrice,
                    imageSrc: results[i].imageSrc,
                }
            }
        }
        console.log("prices fetched successfully")
        // prices.forEach(async (element, index) => {
        //     if (results[index]) {
        //         let elementNameAttribute = element.getElementsByClassName("ng-binding")
        //         let lowPrice = elementNameAttribute.item(0).textContent
        //         let highPrice = elementNameAttribute.item(1).textContent
        //         let productUrlToCompare = 'https://www.zapmarket.co.il/model/' + results[index].id
        //         let branchesCompare = await scrapeBranches(productUrlToCompare)
        //         results[index] = {
        //             name: results[index].name,
        //             id: results[index].id,
        //             highPrice,
        //             lowPrice,
        //             imageSrc: results[index].imageSrc,
        //             comparing: branchesCompare
        //         }
        //     }
        // })
        return results
    })
    console.log("trying to fetch comparing prices")

    for (let i=0;i< products.length;i++) {
        if(products[i].id) {
            let productUrlToCompare = 'https://www.zapmarket.co.il/model/' + products[i].id
            let branchesCompare = await scrapeBranches(productUrlToCompare)
            products[i] = {
                name: products[i].name,
                id: products[i].id,
                highPrice: products[i].highPrice,
                lowPrice: products[i].lowPrice,
                imageSrc: products[i].imageSrc,
                comparing: branchesCompare
            }
        }
    }
    console.log("prices fetched successfully")
    console.log("filtering elements, all data should be declared")
    console.log("elements length: "+products.length)

    const filteredProducts = products.filter(product => {
        return product.name && product.imageSrc && product.id && product.highPrice && product.lowPrice && product.comparing
    })
    console.log("elements length after filtering : "+filteredProducts.length)
    console.log(filteredProducts.length)
    for (let i = 0; i < filteredProducts.length - 1; i++) {
        let productI = filteredProducts[i]
        console.log(productI.name)
        console.log(productI.comparing)
        if(productI.comparing.length !== 0)
            await saveProduct(productI.name, productI.imageSrc, productI.id, productI.highPrice, productI.lowPrice, productI.comparing)

    }
    // for (let i = 0; i < products.length - 1; i++) {
    //     let productI = products[i]
    //     console.log(productI.name)
    //     console.log(productI.comparing)
    //     // await saveProduct(productI.name, productI.imageSrc, productI.id, productI.highPrice, productI.lowPrice, productI.comparing)
    // }

    // await fs.writeFile("names.txt", products.join('\n'));


    //Working
    // const names = await page.evaluate(() => {
    //     return Array.from(document.querySelectorAll("div.productName > a," +
    //         " div.productPriceRange > span:nth-child(1),div.productPriceRange > span:nth-child(3)"
    //     )).map(x => x.textContent)
    // })
    // await fs.writeFile("names.txt", names.join('\n'));

    // console.log({prodName, lowPrice,highPrice});
    await browser.close();

}


async function getAllProducts(){
    return await getAll()
}


async function run() {
    await connectToMongo()
    const products = await getAllProducts()
    console.log(products)
    console.log("Start scrapping")
    // scrapeProduct('https://www.zapmarket.co.il/?query=חומוס');
    scrapeProduct('https://www.zapmarket.co.il/')
    //scrapeBranches('https://www.zapmarket.co.il/model/17170');
}

async function productsFromDBToHTML() {
    await connectToMongo()
    const products = await getAllProducts()
    var ret = ''
    Object.keys(products).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + products[key])
        let prodTitle =products[key].title
        let img = ""+products[key].imageSrc+""
        let prodID =""+products[key].id+""
        let prodHPrice =""+ products[key].highPrice+""
        let prodLPrice =""+ products[key].lowPrice+""
        var temp ='<div class="col4">' +
                        '<img src='+img+' alt=""/>' +
                        '<a class="compare-title" href="#">' +
                        '<h4 class="shop-item-title"> '+prodTitle+' </h4>' +
                        '</a>' +
            '<div class="center"> <div class="buttons d-flex flex-row"> <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button px-5"><span class="dot"></span>Add to cart </button> </div> </div>' +
                        '<P class="shop-item-price">₪'+ prodLPrice +' - ₪'+prodHPrice+'</P>' +
                        '</div>'
        ret = ret.concat(temp)


    })
    return ret
}

async function compareProductsPrices() {
await connectToMongo()
const products = await getAllProducts()
var ret = ''
Object.keys(products).forEach(function(key) {
    let prodID =""+products[key].id+""
    console.log('https://www.zapmarket.co.il/model/'+prodID)
    // scrapeBranches('https://www.zapmarket.co.il/model/'+prodID)

})
}
run()
// productsFromDBToHTML()
// compareProductsPrices()
// scrapeBranches("https://www.zapmarket.co.il/model/7333")
// scrapeBranchesFile("https://www.zapmarket.co.il/model/f7e0254c-53fd-41a2-bf28-f7ae8376b5ec")
// scrapeProduct('https://www.zapmarket.co.il/')