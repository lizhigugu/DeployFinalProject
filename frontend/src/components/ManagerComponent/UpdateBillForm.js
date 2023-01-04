//react import
import {useState} from "react";

//mui import
import { IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

//functional component
const UpdateBillForm = ({item}) => {
    //set state
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    //function define
    const Cancel = () =>{
        setOpen(false);
    }
    const handleEdit = () => {
        setOpen(true);

    }
    const onUpdateBill = () => {
        console.log("update bill");
    }

    //return
    return(
        <>
            <IconButton
                onClick={()=>{handleEdit()}}>
                <EditIcon />
            </IconButton>
            <Dialog 
                open={open} 
                onClose={()=>{Cancel()}}
                fullWidth={true}>
                <DialogTitle>更新商品種類資訊</DialogTitle>
                <DialogContent sx={{
                    display: "grid",
                    gap: 1.5
                }}>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="category_name"
                        label="商品種類名稱"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        disabled={true}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{Cancel()}}>取消</Button>
                <Button onClick={()=>{onUpdateBill()}}>更新</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

//export
export default UpdateBillForm;