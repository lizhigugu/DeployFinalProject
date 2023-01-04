//react import 
import {useState, useEffect} from "react";

//mui import 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

//component import
// import BasicDateTimePicker from "../ManagerComponent/DateTimePicker";

//hook import 
import useBackend from "../../containers/hooks/useBackend";
import { useWebsite } from "../../containers/hooks/WebsiteContext";

//functional component
const UpdateUserForm = () => {
    
    //call hook
    const { userLineId, userData } = useWebsite();
    const { GetUserData, UpdateUser } = useBackend();

    //set state
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(dayjs(""));
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(()=>{
        GetUserData(userLineId);
        setName(userData.name);
        setPhone(userData.phoneNumber);
        setAddress(userData.address);
    },[])
    
    //function define
    const Cancel = () => {
        setOpen(false);
    }

    const onUpdateUser = ()=>{
        const newUser = {lineId:userLineId, name, address, phoneNumber:phone};
        UpdateUser(newUser);
        setOpen(false);
    }

    //return
    return(
        <>
        <IconButton color="primary" aria-label="upload picture" 
            component="label" onClick={()=>{setOpen(true)}} sx={{height:30,width:30}}>
            <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={()=>{Cancel()}}>
            <DialogTitle>修改個人資料</DialogTitle>
            <DialogContent sx={{
                display: "grid",
                gap: 1.5
            }}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    label="姓名"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    label="地址"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={address}
                    onChange={(e)=>{setAddress(e.target.value)}}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    label="電話"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={phone}
                    onChange={(e)=>{setPhone(e.target.value)}}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{Cancel()}}>取消</Button>
            <Button onClick={()=>{onUpdateUser()}}>確認</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default UpdateUserForm;