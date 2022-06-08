var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},
    image: {type: mongoose.Schema.Types.ObjectId, required: false, unique: false},
});

var Product = mongoose.model('Post', postSchema);
module.exports = Product;