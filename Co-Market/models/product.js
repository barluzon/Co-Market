const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    title: {type: String, required: true},
    imageSrc: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    highPrice: {type: String, required: true},
    lowPrice: {type: String, required: true},
    comparing: {type: Array, required: true},
    createdAt: {type: Date, default: Date.now}
});

async function saveProduct(title, imageSrc, id, highPrice, lowPrice,comparing) {
    console.log(title, imageSrc, id, highPrice, lowPrice,comparing)
    const product = new Product({title, imageSrc, id, highPrice, lowPrice, comparing});
    try {
        const result = await product.save()
        console.log("Inserted productId: "+result.id+" successfully")
    } catch (err) {
        console.error("could not insert product successfully, check logs")
        console.error(err)
    }

}

async function getAll() {
    try {
        return Product.find({})
    } catch (err) {
        console.error("could not get products successfully, check logs")
        console.error(err)
    }
}

var Product = mongoose.model('Product', productSchema);

module.exports = {
    Product,
    saveProduct,
    getAll
};