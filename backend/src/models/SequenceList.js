import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SequenceListSchema = Schema({
    BillId: {type: String, required: true},
    Time: {type: String, required: true},
    Sequence: [{type: String}],
    category: {type: String, required: true}
}, {
    colloection: "SequenceList",
    timestamps: {
        createAt: "created_at",
        updateAt: "updated_at"
    }
}) 

const SequenceListModel = mongoose.model('SequenceList', SequenceListSchema)

export default SequenceListModel

// const BillSchema = Schema({
//     userLineId: { type: String, required: true },
//     category: {type: String, required: true},
//     billId:  { type:String },
//     items:   [{ type: {name: String, price: Number, number: Number, option: String, note:String, product_type:Boolean}}],
//     total:   { type: Number },
//     package: { type: String },
//     payment: { type: String },
//     address: { type: String },
//     receiver: { type:String },
//     phone:    { type:String },
//     status:  { type: Number, default:0},
// }, {
//     collection: 'Bill',
//     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
// }) 