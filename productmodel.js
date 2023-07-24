const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required:true
    },
    img_url:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Product', ProductSchema)