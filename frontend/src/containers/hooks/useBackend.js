//test datas for frontend testing//
//////////////////////////////////
import client from './wsConnect'


const sendData =  async(data) =>{
    if(client.readyState===client.OPEN){
        await client.send(JSON.stringify(data));
    }
};

const useBackend = () => {

    //--User handling functions--//
    const AddUser = (name, lineId) => {
        const User = {
            name: name, 
            lineId: lineId};
        sendData(["AddUser",User]);
    }
    const UpdateUser = (user) => {
        sendData(["UpdateUser", user])
    }
    const GetUserData = (userLineId) => {
        sendData(["GetUserData", userLineId]);
    }

    //return a list of user's bill
    const GetUserBill = (userLineId)=>{
        sendData(["GetUserBill",userLineId]);
    }

    //--Category handling functions--//
    const AddCategory = (category) => {
        sendData(["AddCategory",category]);
    }
    const UpdateCategory = (Category) => {
        sendData(["UpdateCategory",Category]);
    }
    const GetCategories = () => {
        sendData(["GetCategories","/"]);
    }
    const GetProductsByCategory = (name) => {
        sendData(["GetProductsByCategory",name]);
    }

    //--Product handling functions--//
    const AddProductToCategory = (Product) => {
        sendData(["AddProductToCategory",Product]);
    }

    const UpdateProduct = (newProduct)=>{
        sendData(["UpdateProduct",newProduct]);
    }

    const GetProductById = (ProductId) =>{
        sendData(["GetProductById", ProductId]);
    }


    //--Bill handling functions--//
    const AddItemToBill = (BillId,item)=>{ //need frontend ;_;
        sendData(["AddItemToBill",{BillId,item}]);
    }
    const GetBill = (BillId)=>{
        sendData(["GetBill",BillId]);
    }

    //userLineId, items(list of items), packing(包裝), payment(付款方式), address(地址)
    const AddBillToUser = (lineId, billId)=>{
        sendData(["AddBillToUser",{lineId, billId}])
    }

    const ConfirmBill = (BillInfo, lineId)=>{
        sendData(["ConfirmBill",{BillInfo, lineId}])
    }
    
    //return a list of bill based on input filters
    const FindBill = (filters)=>{
        sendData(["FindBill",filters]);
    }

    //user updates address
    const UpdateBillAddress = (userLineId, billId, newAddr)=>{
        sendData(["UpdateBillAddress",{billId, newAddr}]);
    }

    //manager update status
    const UpdateBillStatus = (task, billId, oldStatus)=>{
        sendData(["UpdateBillStatus",{task,billId,oldStatus}]);
    }

    const UpdateItem = (bill)=>{
        sendData(["UpdateItem", bill])
    }

    //---delete functions--//
    const DeleteBill = (billId)=>{
        sendData(["DeleteBill", billId]);
    }
    const DeleteCategory = (name)=>{
        sendData(["DeleteCategory", name]);
    }
    const DeleteUser = (userLineId)=>{
        sendData(["DeleteUser",userLineId]);
    }
    const DeleteProduct = (product)=>{
        sendData(["DeleteProduct",product]);
    }
    const DeleteItemFromBill = (billId,i)=>{
        sendData(["DeleteItemFromBill",{billId,i}]);
    }

    // get stores
    const GetStores=(county)=>{
        sendData(["GetStores",county]);
    }

    //Temporary function
    const getTBill=(lineId)=>{
        sendData(["getTBill", lineId]);
    }
    const renewTBill=(lineId, category)=>{
        sendData(["renewTBill", {lineId, category}]);
    }

    const AddItemToTBill=(lineId, item)=>{
        sendData(["AddItemToTBill", {lineId, item}]);
    }

    const DeleteItemFromTBill=(lineId, category, i)=>{
        sendData(["DeleteItemFromTBill", {lineId, category, i}]);
    }

    //Sequence Func
    const AddSequenceList=(SequenceList)=>{
        sendData(["AddSequenceList", SequenceList])
    }

    //new function
    const GetCatBill = (category) => {
        sendData(["GetCatBill", category])
    }

    const UpdateCategoryStatus = (payload) => {
        sendData(["UpdateCategoryStatus", payload]);
    }

    const getCatStatus = (payload) => {
        sendData(["GetCatStatus", payload]);
    }
    const loginLine = (payload) =>{
        sendData(["loginLine", payload]);
    }

   

    return {
        AddUser, UpdateUser, GetUserData,
        AddCategory, UpdateCategory, GetProductsByCategory, GetCategories, AddProductToCategory, 
        UpdateProduct, GetProductById, GetBill, GetUserBill, UpdateBillStatus,
        AddItemToBill, AddBillToUser,  ConfirmBill , FindBill, UpdateBillAddress,
        DeleteBill, DeleteCategory, DeleteUser, DeleteProduct, DeleteItemFromBill, GetStores,
        getTBill, renewTBill, AddItemToTBill, DeleteItemFromTBill, AddSequenceList,UpdateItem, GetCatBill,
        UpdateCategoryStatus, getCatStatus, loginLine
    };
};

export default useBackend;

//sendData(["AddUser",{name:name, address:address}]);