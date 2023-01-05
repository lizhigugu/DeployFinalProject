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