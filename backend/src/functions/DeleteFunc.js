import BillModel from '../models/Bill'
import UserModel from '../models/User'
import CategoryModel from '../models/Category'
import ProductModel from '../models/Product'
import { GetCategories, GetProductsByCategory } from './GetFunc'

const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
    //console.log('send data called in getFunc.');
}

const DeleteUser = (userLineId)=>{
    UserModel.deleteMany({userLineId})
}
const DeleteBill = (billId)=>{
    BillModel.deleteMany({billId})
}
const DeleteCategory = async(name,ws)=>{
    //console.log('deleting category with name',name);
    await CategoryModel.deleteMany({name});
    await ProductModel.deleteMany({category:name});
    GetCategories(ws);
}
const DeleteProduct = async(category, name, ws)=>{
    // console.log('deleting product...');
    await ProductModel.deleteMany({name, category});
    GetProductsByCategory(category,ws);
}
const DeleteItemFromBill = (payload, ws)=>{
    BillModel.find({billId:payload.billId}, async function(err, obj){
        if(obj.length){
            obj[0].items.splice(payload.i,1);
            await obj[0].save();
            // console.log(obj[0]);
            sendData(["bill",obj[0]],ws);
        }
        else{
            // console.log('bill not found. unable to delete item.')
        }
    })
}

export {DeleteBill, DeleteCategory, DeleteUser, DeleteProduct, DeleteItemFromBill}