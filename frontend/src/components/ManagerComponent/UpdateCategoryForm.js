//react import 
import {useState} from "react";

//mui import 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { Alert, AlertTitle, IconButton, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

//component import
import BasicDateTimePicker from "./DateTimePicker";

//hook import 
import useBackend from "../../containers/hooks/useBackend";

//functional component
const UpdateCategoryForm = ({oldData}) => {
    //call hook
    const {UpdateCategory} = useBackend();

    //set state
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(dayjs(""));
    const [name, setName] = useState("");
    const [alert, setAlert] = useState(false);

    //function define
    const Cancel = () => {
        setDate(dayjs(""));
        setName("");
        setOpen(false);
        setAlert(false);
    }

    const HandleTextChange = (event) => {
        setName(event.target.value);
    }

    const onUpdateCategory = ()=>{
        if((!name) || (!date)){
            setAlert(true);
            return
        }
        setAlert(false);
        const newCategory = {cat_name: name, deadLine: date};
        UpdateCategory(newCategory);
        setName("");
        setDate(dayjs(""));
        setOpen(false);
    }

    //return
    return(
        <Box sx={{
            display: "flex"
        }}>
        <IconButton 
            color="primary"
             aria-label="upload picture"
            component="label"
            onClick={()=>{setOpen(true);setName(oldData.name);setDate(oldData.deadline);}}
            >
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
                    onChange={(e)=>{HandleTextChange(e)}}
                />
                <BasicDateTimePicker date={date} setDate={setDate} />
                {alert? 
                <Alert severity="error">
                    <AlertTitle>錯誤</AlertTitle>
                    請填完所有資訊
                </Alert>:<></>}
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{Cancel()}}>取消</Button>
            <Button 
                disabled={!name || !date}
                onClick={()=>{onUpdateCategory()}}>更新</Button>
            </DialogActions>
        </Dialog>
        </Box>
    )
}

export default UpdateCategoryForm;