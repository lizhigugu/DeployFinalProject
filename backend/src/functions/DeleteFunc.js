import BillModel from '../models/Bill'
import UserModel from '../models/User'
import CategoryModel from '../models/Category'
import ProductModel from '../models/Product'
import { GetCategories, GetProductsByCategory } from './GetFunc'

const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
}

const DeleteUser = (userLineId)=>{
    UserModel.deleteMany({userLineId})
}
const DeleteBill = (billId)=>{
    BillModel.deleteMany({billId})
}
const DeleteCategory = async(name,ws)=>{
    await CategoryModel.deleteMany({name});
    await ProductModel.deleteMany({category:name});
    GetCategories(ws);
}
const DeleteProduct = async(category, name, ws)=>{
    await ProductModel.deleteMany({name, category});
    GetProductsByCategory(category,ws);
}
const DeleteItemFromBill = (payload, ws)=>{
    BillModel.find({billId:payload.billId}, async function(err, obj){
        if(obj.length){
            obj[0].items.splice(payload.i,1);
            await obj[0].save();
            sendData(["bill",obj[0]],ws);
        }
        else{
        }
    })
}

export {DeleteBill, DeleteCategory, DeleteUser, DeleteProduct, DeleteItemFromBill}