import SequenceListModel from "../models/SequenceList";

const AddSequenceList = async (payload, ws) => {
    const newSeq = await new SequenceListModel(payload);
    await newSeq.save();

}

export {AddSequenceList}