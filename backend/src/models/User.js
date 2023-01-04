import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = Schema({
    name:           { type: String, required: true },
    lineId:         { type: String, required: true },  
    address:        { type: String },
    phoneNumber:    { type: String },
    bills:      [{ type: mongoose.Types.ObjectId }]
}, {
    collection: 'User',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}) 

const UserModel = mongoose.model('User', UserSchema)

export default UserModel