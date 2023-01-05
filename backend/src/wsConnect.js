import { AddUser ,AddBillToUser, AddCategory, AddProductToCategory, AddItemToBill, ConfirmBill } from './functions/AddFunc'
import { UpdateUser, UpdateBillStatus, UpdateCategory, UpdateProduct, UpdateItem, UpdateCategoryStatus } from './functions/UpdateFunc'
import { GetCategories, GetProductsByCategory, GetUserData, GetUserBill, GetBill, GetCatBill } from './functions/GetFunc';
import { DeleteBill, DeleteCategory, DeleteUser, DeleteProduct, DeleteItemFromBill } from './functions/DeleteFunc'
import { AddItemToTBill, renewTBill, getTBill, DeleteItemFromTBill } from './functions/TemporaryBillFunc';
import { getStores } from './functions/711Func';
import { AddSequenceList } from './functions/SequenceListFunc';
import { loginLine } from './functions/LineLogin';

//helper functions
// const sendData = (data, ws) =>{
//     ws.send(JSON.stringify(data));
//     console.log('send data called. (in wsConnect.js, line 5)');
// }

export default {
    initData: (ws) => {
        console.log('data initialization called.')
    },
    onMessage: async (wss, ws, e) => {
        const [task, payload] = JSON.parse(e.data);
        switch (task) {
            //Add functions
            case 'AddUser':{
                AddUser(payload, ws);
                break;
            }
            case 'AddCategory':{
                AddCategory(payload, ws);
                break;
            }
            case 'AddProductToCategory':{
                AddProductToCategory(payload,ws);
                break;
            }
            case 'AddBillToUser':{
                AddBillToUser(payload.lineId, payload.billId,ws);
                break;
            }
            case 'AddItemToBill':{
                const {BillId, item} = payload;
                AddItemToBill(BillId, item);
                break;
            }

            //Confirm functions
            case 'ConfirmBill':{
                ConfirmBill(payload.BillInfo, payload.lineId,ws);
                GetBill(payload.BillInfo.billId, ws);
                break;
            }

            //Get functions
            case 'GetCategories':{
                GetCategories(ws);
                break;
            }
            case 'GetProductsByCategory':{
                GetProductsByCategory(payload,ws);
                break;
            }
            case 'GetUserData':{
                GetUserData(payload,ws);
                break;
            }
            case 'GetUserBill':{
                GetUserBill(payload,ws);
                break;
            }
            case 'GetBill':{
                GetBill(payload,ws);
                break;
            }

            //Update functions
            case 'UpdateUser':{
                UpdateUser(payload, ws);
                break;
            }
            case 'UpdateCategory':{
                UpdateCategory(payload,ws);
                break;
            } 
            case 'UpdateProduct':{
                UpdateProduct(payload, ws);
                break;
            }
            case 'UpdateBillStatus':{
                UpdateBillStatus(payload,ws);
                GetUserBill('all',ws);
                break;
            }
            case "UpdateItem":{
                UpdateItem(payload,ws);
                GetBill(payload.id,ws);
                break;
            }

            //delete functions
            case 'DeleteUser':{
                DeleteUser(payload, ws);
                break;
            }
            case 'DeleteCategory':{
                DeleteCategory(payload,ws);
                break;
            } 
            case 'DeleteProduct':{
                DeleteProduct(payload.category,payload.name,ws);
                break;
            }
            case 'DeleteBill':{
                DeleteBill(payload.name, payload.category);
                break;
            }
            case 'DeleteItemFromBill':{
                DeleteItemFromBill(payload, ws);
                break;
            }
            case "GetStores":{
                getStores(payload,ws);
                break;
            }
            case "renewTBill":{
                renewTBill(payload, ws);
                break;
            }
            case "AddItemToTBill":{
                AddItemToTBill(payload.lineId, payload.item, ws);
                console.log("test",payload.item)
                break;
            }
            case "getTBill":{
                getTBill(payload, ws);
                console.log("test",payload)
                break;
            }
            
            case "DeleteItemFromTBill":{
                DeleteItemFromTBill(payload, ws);
                break;
            }
            //SequenceList
            case "AddSequenceList":{
                AddSequenceList(payload, ws);
                break;
            }

            case "GetCatBill": {
                GetCatBill(payload, ws);
                break;
            }

            case "UpdateCategoryStatus":{
                UpdateCategoryStatus(payload, ws);
                break;
            }

            case "loginLine":{
                console.log("here");
                loginLine(payload, ws);
                break;
            }

        }
    }
}


