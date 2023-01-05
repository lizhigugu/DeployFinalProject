import BillModel from '../models/Bill'
import UserModel from '../models/User'
import CategoryModel from '../models/Category'
import ProductModel from '../models/Product'

const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
}

const GetCategories = async(ws)=>{
    const categories = await CategoryModel.aggregate([
        { $group: { _id: null, category_names: { $push: "$name" } } }])
    if(categories){
        sendData(["categories",categories[0].category_names],ws);
    }

    //send category deadlines
    const deadlines = await CategoryModel.aggregate([
        { $group: { _id: null, category_dl:{ $push:"$deadline" }}}])
    if(categories){
        sendData(["deadlines",deadlines[0].category_dl],ws);
        }
    
}

const GetProductsByCategory = async(category, ws)=>{
    let query = category==='all'? {}:{category}
    ProductModel.find(query, async function(err, obj){
        if(obj.length){
            sendData(["products",obj],ws);
        }
        else{
            sendData(["products",[]],ws);
        }
    })
}

const GetUserData = async (userLineId, ws)=>{
    let ifin = false
    UserModel.find({lineId:userLineId}, async function(err, obj){
        if(obj.length){
            ifin = true;
            sendData(["userData",obj[0]], ws);
            sendData(["userAvaliable", true], ws);
            
        }
        else{
            sendData(["userAvaliable", false], ws);
        }
    })
    return ifin;
}

const GetUserBill = async(userLineId, ws)=>{
    let query = userLineId==='all'? {}:{userLineId}
    BillModel.find(query, async function(err, obj){
        if(obj.length){
            sendData(["userBill",obj],ws);
        }
        else{
            sendData(["userBill",[]],ws);
        }
    })
}

const GetBill = async(billId, ws)=>{
    BillModel.find({billId}, async function(err, obj){
        if(obj.length){
            sendData(["bill",obj[0]],ws);
        }
        else{
            sendData(["bill",[]],ws);
        }
    })
}

//new function

const GetCatBill = async (category, ws) => {
    BillModel.find({category: category}, async function(err, obj){
        sendData(["userBill", obj], ws)
    })

    CategoryModel.find({name: category}, async function (err, obj){
        sendData(["GetCatStatus", obj[0].status], ws);
    })
}

export {GetCategories, GetProductsByCategory, GetUserData, GetUserBill, GetBill, GetCatBill}