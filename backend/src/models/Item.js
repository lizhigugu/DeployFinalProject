import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ItemSchema = Schema({
    name:       { type: String, required: true },
    price:      { type: Number, required: true },
    number:     { type: Number, required: true },
    option:     { type: String, required: true },
    note:       { type: String, required: true },
    product_type:{type: Boolean,required: true},
}, {
    collection: 'Item',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}) 

const ItemModel = mongoose.model('Item', ItemSchema)

export default ItemModel