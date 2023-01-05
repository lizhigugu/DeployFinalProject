import TemporaryBillModel from "../models/TemporaryBill";

const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
}

const renewTBill = (payload, ws) => {
    TemporaryBillModel.find({userLineId: payload.lineId}, async function(err, obj){
        if(obj.length){
            const index_cat = obj[0].ItemList.findIndex(function (element) {
                return element.category === payload.category
            })
            obj[0].ItemList.splice(index_cat,1);
            sendData(["bill", obj[0]], ws);
            obj[0].save();
        }
        else{
        }
    })
}

const AddItemToTBill = (lineId, item ,ws) => {
    TemporaryBillModel.find({userLineId: lineId}, async function(err, obj){
        if(obj.length){
            const item_cat = item.category;
            const index_cat = obj[0].ItemList.findIndex(function (element) {
                return element.category === item_cat
            })
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
            sendData(["bill", obj[0]], ws);
            await obj[0].save();
            
            
        }
        else{
        }
        
    })
}

const getTBill = (lineId, ws) => {
    TemporaryBillModel.find({userLineId: lineId}, async function(err, obj){
        if(obj.length){
            sendData(["bill", obj[0]], ws);
        }
        else{
            const newTBill = await new TemporaryBillModel({
                userLineId: lineId,
                items: []
            });
            newTBill.save();
            sendData(["bill", newTBill], ws);
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
            sendData(["bill",obj[0]],ws);
        }
        else{
        }
    })
}

export {renewTBill, AddItemToTBill, getTBill, DeleteItemFromTBill}
