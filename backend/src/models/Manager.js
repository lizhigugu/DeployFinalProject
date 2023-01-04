import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ManagerSchema = Schema({
    name:           { type: String, required: true },
    password:         { type: String, required: true },  
}) 

const ManagerModel = mongoose.model('Manager', ManagerSchema)

export default UserModel