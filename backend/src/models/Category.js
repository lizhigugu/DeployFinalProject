import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CategorySchema = Schema({
    name:       { type: String, required: true },
    status:     {type: Number, required: true},
    deadline:   { type: Date },
    products:   [{type: String}],
}, {
    collection: 'Category',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}) 

const CategoryModel = mongoose.model('Category', CategorySchema)

export default CategoryModel