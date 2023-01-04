import TemporaryBillModel from "../models/TemporaryBill";

const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
    // console.log('send data called in getFunc.');
}

const renewTBill = (payload, ws) => {
    // console.log("renew TBill");
    TemporaryBillModel.find({userLineId: payload.lineId}, async function(err, obj){
        if(obj.length){
            // console.log('Bill found. adding item to bill...');
            const index_cat = obj[0].ItemList.findIndex(function (element) {
                return element.category === payload.category
            })
            obj[0].ItemList.splice(index_cat,1);
            // console.log("renew obj[0]: ", obj[0]);
            sendData(["bill", obj[0]], ws);
            obj[0].save();
            // obj[0].items = []
            // await obj[0].save();
            

        }
        else{
            // console.log('Bill not found ;_;');
        }
    })
}

const AddItemToTBill = (lineId, item ,ws) => {
    // console.log('adding item to bill...', item, lineId);
    TemporaryBillModel.find({userLineId: lineId}, async function(err, obj){
        if(obj.length){
            // console.log("obj[0]: ", obj[0]);
            const item_cat = item.category;
            const index_cat = obj[0].ItemList.findIndex(function (element) {
                return element.category === item_cat
            })
            // console.log("index_cat: ", index_cat);
            if(index_cat === -1){
                obj[0].ItemList[obj[0].ItemList.length] = {
                    category: item_cat,
                    items: [item]
                }
            }
            else{
                const item_index = obj[0].ItemList[index_cat].items.findIndex(function (element) {
                    return (element.name === item.name && element.option === item.option)
                })
                if(item_index === -1){
                    obj[0].ItemList[index_cat].items.push(item);
                }
                else{
                    obj[0].ItemList[index_cat].items[item_index].number = parseInt(obj[0].ItemList[index_cat].items[item_index].number)+parseInt(item.number);
                }
            }
            // console.log('Bill found. adding item to bill...');
            sendData(["bill", obj[0]], ws);
            // console.log("new obj: ", obj[0].ItemList[index_cat]);
            await obj[0].save();
            
            
        }
        else{
            // console.log('Bill not found ;_;');
        }
        
    })
}

const getTBill = (lineId, ws) => {
    TemporaryBillModel.find({userLineId: lineId}, async function(err, obj){
        if(obj.length){
            
            // console.log(obj[0]);
            sendData(["bill", obj[0]], ws);
        }
        else{
            const newTBill = await new TemporaryBillModel({
                userLineId: lineId,
                items: []
            });
            newTBill.save();
            // console.log(newTBill);
            sendData(["bill", newTBill], ws);
            // console.log('Bill not found ;_;');
        }
        
    })
}

const DeleteItemFromTBill = (payload, ws)=>{
    TemporaryBillModel.find({userLineId:payload.lineId}, async function(err, obj){
        if(obj.length){
            const index_cat = obj[0].ItemList.findIndex(function (element) {
                return element.category === payload.category
            })
            obj[0].ItemList[index_cat].items.splice(payload.i,1);
            if(obj[0].ItemList[index_cat].items.length === 0){
                obj[0].ItemList.splice(index_cat,1);
            }
            await obj[0].save();
            // console.log(obj[0]);
            sendData(["bill",obj[0]],ws);
        }
        else{
            // console.log('bill not found. unable to delete item.')
        }
    })
}

export {renewTBill, AddItemToTBill, getTBill, DeleteItemFromTBill}
