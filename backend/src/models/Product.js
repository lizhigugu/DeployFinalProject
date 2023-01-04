import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name:       { type: String, required: true },
    category:   { type: String, required: true },
    URL:        { type: String, required: true },
    price:      { type: Number, required: true },
    note:       { type: String }, //如果截止日期有提早之類的
    option_type:  { type: String,  required: true },
    product_type: { type: Boolean, required: true }, 
    options:    [{ type: {option: String, bought: Number, sold: Number, buyers: [String]}}],
}, {
    collection: 'Product',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}) 

const ProductModel = mongoose.model('Product', ProductSchema)

export default ProductModel