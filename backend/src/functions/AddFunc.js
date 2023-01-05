import BillModel from '../models/Bill'
import UserModel from '../models/User'
import CategoryModel from '../models/Category'
import ProductModel from '../models/Product'
import TemporaryBillModel from '../models/TemporaryBill'
import SequenceListModel from '../models/SequenceList'

import { GetCategories, GetProductsByCategory } from './GetFunc'

//notice frontend 
const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
}

//helper functions
const appendProduct = (category, product) => {
    CategoryModel.find({name:category}, async function(err, obj){
        if(obj.length){
            obj[0].products = [...obj[0].products,product]
            await obj[0].save();
        }
        else{
            const model = new CategoryModel({name:category});
            model.products = [product];
            await model.save();
        }
    })
}

const AddUser = (User, ws)=>{
    UserModel.find({lineId:User.lineId}, async function(err, obj){
        if(obj.length){
        }
        else{
            await new UserModel({
                name:       User.name,
                lineId:     User.lineId,
                address:    "",
                phoneNumber:"",
            }).save();
            const newuser={
                name: User.name,
                lineId: User.lineId,
                address: "",
                phoneNumber: ""
            }
            sendData(["userData", newuser], ws);
        }
    })
}

const AddBillToUser = async(userLineId, BillId,ws)=>{
    const bill = await new BillModel({
        userLineId: userLineId,
        billId:     BillId,
        items:      [],
        total:      0,
        package:    '',
        payment:    '',
        address:    '',
    });
  
    bill.save();
}

const AddCategory = async(Category,ws)=>{
    CategoryModel.find({name:Category.cat_name}, async function(err, obj){
        if(obj.length){
        }
        else{
            await new CategoryModel({name:Category.cat_name, deadline:Category.deadLine,products:[], status: 0}).save();
            await GetCategories(ws);
        }
    })
    
}

const AddProductToCategory = (Product,ws)=>{
    ProductModel.find({name:Product.name, category:Product.category}, async function(err, obj){
        if(obj.length){
        }
        else{
            await new ProductModel(Product).save();
            appendProduct(Product.category, Product.name);
            GetProductsByCategory(Product.category,ws);
        }
    })
}

const AddItemToBill = (BillId, item) => {
    BillModel.find({billId:BillId}, async function(err, obj){
        if(obj.length){
            obj[0].items = [...obj[0].items, item]
            await obj[0].save();
        }
        else{
        }
    })
}

const ConfirmBill = async (BillInfo, lineId, ws)=>{
    let Tempo = await TemporaryBillModel.findOne({userLineId: lineId});
    const newB = await new BillModel(BillInfo).save();
}

const AddSequenceList=async(SequenceList)=>{
    const newSequenceList = await new SequenceListModel(SequenceList);
    newSequenceList.save()
}

export {AddUser ,AddBillToUser, AddCategory, AddProductToCategory, AddItemToBill, ConfirmBill, AddSequenceList}