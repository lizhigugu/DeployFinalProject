//test datas for frontend testing//
//////////////////////////////////
import client from './wsConnect'


const sendData =  async(data) =>{
    if(client.readyState===client.OPEN){
        await client.send(JSON.stringify(data));
        //console.log('data send. data:', JSON.stringify(data));
    }
};

const useBackend = () => {

    //--User handling functions--//
    const AddUser = (name, lineId) => {
        // console.log("Adding User...");
        const User = {
            name: name, 
            lineId: lineId};
        sendData(["AddUser",User]);
    }
    const UpdateUser = (user) => {
        // console.log('updating user...')
        // console.log("before updateing: ", user)
        sendData(["UpdateUser", user])
    }
    const GetUserData = (userLineId) => {
        // console.log('fetching user data...');
        sendData(["GetUserData", userLineId]);
    }
    //return a list of user's bill
    const GetUserBill = (userLineId)=>{
        // console.log("Getting UserBill...");
        sendData(["GetUserBill",userLineId]);
    }

    //--Category handling functions--//
    const AddCategory = (category) => {
        // console.log("Adding category...");
        sendData(["AddCategory",category]);
    }
    const UpdateCategory = (Category) => {
        // console.log("Updating category...");
        sendData(["UpdateCategory",Category]);
    }
    const GetCategories = () => {
        // console.log("fetching categories...");
        sendData(["GetCategories","/"]);
    }
    const GetProductsByCategory = (name) => {
        // console.log("getting products by category "+name+" ...");
        sendData(["GetProductsByCategory",name]);
    }

    //--Product handling functions--//
    const AddProductToCategory = (Product) => {
        // console.log("Adding product to category...");
        sendData(["AddProductToCategory",Product]);
    }

    const UpdateProduct = (newProduct)=>{
        // console.log("Updating Product...");
        sendData(["UpdateProduct",newProduct]);
    }

    const GetProductById = (ProductId) =>{
        // console.log("getting product by id...");
        sendData(["GetProductById", ProductId]);
    }


    //--Bill handling functions--//
    const AddItemToBill = (BillId,item)=>{ //need frontend ;_;
        // console.log("adding item to bill...");
        sendData(["AddItemToBill",{BillId,item}]);
    }
    const GetBill = (BillId)=>{
        // console.log('fetching bill by bill id...');
        sendData(["GetBill",BillId]);
    }

    //userLineId, items(list of items), packing(包裝), payment(付款方式), address(地址)
    const AddBillToUser = (lineId, billId)=>{
        // console.log("Adding Bill to User..."); 
        sendData(["AddBillToUser",{lineId, billId}])
    }

    const ConfirmBill = (BillInfo, lineId)=>{
        // console.log("confirming bill...")
        sendData(["ConfirmBill",{BillInfo, lineId}])
    }
    
    //return a list of bill based on input filters
    const FindBill = (filters)=>{
        // console.log("Finding Bill...");
        sendData(["FindBill",filters]);
    }

    //user updates address
    const UpdateBillAddress = (userLineId, billId, newAddr)=>{
        // console.log("Updating Bill Address...");
        sendData(["UpdateBillAddress",{billId, newAddr}]);
    }

    //manager update status
    const UpdateBillStatus = (task, billId, oldStatus)=>{
        // console.log("updating bill status...");
        sendData(["UpdateBillStatus",{task,billId,oldStatus}]);
    }

    const UpdateItem = (bill)=>{
        // console.log("Update Item Product_type...",bill);
        sendData(["UpdateItem", bill])
    }

    //---delete functions--//
    const DeleteBill = (billId)=>{
        // console.log('deleting bill...');
        sendData(["DeleteBill", billId]);
    }
    const DeleteCategory = (name)=>{
        // console.log('deleting category...');
        sendData(["DeleteCategory", name]);
    }
    const DeleteUser = (userLineId)=>{
        // console.log('deleting user...');
        sendData(["DeleteUser",userLineId]);
    }
    const DeleteProduct = (product)=>{
        // console.log('deleting product...');
        sendData(["DeleteProduct",product]);
    }
    const DeleteItemFromBill = (billId,i)=>{
        // console.log('deleting item from bill...');
        sendData(["DeleteItemFromBill",{billId,i}]);
    }

    // get stores
    const GetStores=(county)=>{
        // console.log('get county...');
        sendData(["GetStores",county]);
    }

    //Temporary function
    const getTBill=(lineId)=>{
        // console.log("at getTBill: ", lineId);
        sendData(["getTBill", lineId]);
    }
    const renewTBill=(lineId, category)=>{
        sendData(["renewTBill", {lineId, category}]);
    }

    const AddItemToTBill=(lineId, item)=>{
        // console.log("add item to tbill");
        // console.log(item)
        sendData(["AddItemToTBill", {lineId, item}]);
    }

    const DeleteItemFromTBill=(lineId, category, i)=>{
        // console.log("delete item from tbill");
        sendData(["DeleteItemFromTBill", {lineId, category, i}]);
    }

    //Sequence Func
    const AddSequenceList=(SequenceList)=>{
        // console.log("SequenceList Added...", SequenceList);
        sendData(["AddSequenceList", SequenceList])
    }

    //new function
    const GetCatBill = (category) => {
        // console.log("get category bill");
        sendData(["GetCatBill", category])
    }

    const UpdateCategoryStatus = (payload) => {
        // console.log("update cat status");
        sendData(["UpdateCategoryStatus", payload]);
    }

    const getCatStatus = (payload) => {
        // console.log("get cat status");
        sendData(["GetCatStatus", payload]);
    }

   

    return {
        AddUser, UpdateUser, GetUserData,
        AddCategory, UpdateCategory, GetProductsByCategory, GetCategories, AddProductToCategory, 
        UpdateProduct, GetProductById, GetBill, GetUserBill, UpdateBillStatus,
        AddItemToBill, AddBillToUser,  ConfirmBill , FindBill, UpdateBillAddress,
        DeleteBill, DeleteCategory, DeleteUser, DeleteProduct, DeleteItemFromBill, GetStores,
        getTBill, renewTBill, AddItemToTBill, DeleteItemFromTBill, AddSequenceList,UpdateItem, GetCatBill,
        UpdateCategoryStatus, getCatStatus
    };
};

export default useBackend;

//sendData(["AddUser",{name:name, address:address}]);