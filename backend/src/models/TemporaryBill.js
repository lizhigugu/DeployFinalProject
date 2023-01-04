import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TemporaryBillSchema = Schema({
    userLineId: { type: String, required: true },
    ItemList: [{type: {category: String, items: [{ type: {name: String, price: Number, number: Number, option: String, note:String, product_type: Boolean}}]}}]
    // items:   [{ type: {name: String, price: Number, number: Number, option: String, note:String}}],
}, {
    collection: 'TemporaryBill',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}) 

const TemporaryBillModel = mongoose.model('TemporaryBill', TemporaryBillSchema)

export default TemporaryBillModel;