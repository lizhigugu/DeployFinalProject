import SequenceListModel from "../models/SequenceList";


// const sendData = (data, ws) =>{
//     ws.send(JSON.stringify(data));
//     // console.log('send data called in getFunc.');
// }

const AddSequenceList = async (payload, ws) => {
    const newSeq = await new SequenceListModel(payload);
    // console.log("new Seq: ", newSeq);
    await newSeq.save();

}

export {AddSequenceList}