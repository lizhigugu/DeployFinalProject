import React from 'react'
import {Typography} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {CardContent} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import { useWebsite } from '../containers/hooks/WebsiteContext'; 
import useBackend from '../containers/hooks/useBackend';

const ChangeAddress=({setOpen, receiver, phone, address})=>{

    const [Phone, setPhone] = React.useState('');
    const [value, setValue] = React.useState("");
    const [Name, setName] = React.useState("");
    const [inputValue, setInputValue] = React.useState("");
    const [county, setCounty] = React.useState("");

    const CountyOption=["台北市","新北市","基隆市","宜蘭縣",
    "桃園市","新竹市","新竹縣","苗栗縣","台中市","彰化縣",
    "南投縣","雲林縣","嘉義市","嘉義縣","台南市","高雄市",
    "屏東縣","花蓮縣","台東縣","澎湖縣","金門縣","連江縣","海南諸島"
    ]

    const {bill, total, currentBillId, userData, stores} = useWebsite();
    const {UpdateBillAddress, GetStores} = useBackend();

    React.useEffect(()=>{
        console.log('use effect called.');
        setPhone(userData.phoneNumber);
        setName(userData.name);
        setValue(userData.address);
    },[])

    const onHandleChangeAddr=()=>{
        const BillInfo = {
            billId  : currentBillId,
            address : value.substring(0,6)
        }
        UpdateBillAddress(BillInfo);
        console.log("BillInfo", BillInfo)
        //navigate("/personal/bills")
    }

    var a=[]

    stores.map((option)=>(
        a.push(option.name)
    ))

  const list = () => {
    return(
        <CardContent sx={{
            display: "grid",
            gap: 1.5
        }}>
            <Typography variant="body1" sx={{gridColumnStart:1}}>收件人資訊</Typography>
            <TextField
                    id="outlined-select-category"
                    select
                    required
                    margin="dense"
                    label="縣市"
                    value={county}
                    onChange={(e)=>{setCounty(e.target.value);GetStores(e.target.value)}}
                    sx={{gridColumnStart:1,gridColumnEnd:2}}
                    helperText="輸入縣市所在門市"
                >
                    {CountyOption.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
            <Autocomplete
                disablePortal
                id="ReceiverAddress"
                margin="dense"
                options={a}
                //defaultValue={"小名"}
                sx={{gridColumnStart:2,gridColumnEnd:3,marginTop:"7.5px"}}
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="門市" 
                helperText="輸入 店號/門市名稱/道路名稱 查找" required/>}
            >
            </Autocomplete>
            <TextField
                id="ReceiverName"
                margin="dense"
                disabled
                defaultValue={receiver}
                label="姓名"
                sx={{gridColumnStart:1,gridColumnEnd:3}}
            >
            </TextField>
            <TextField
                id="ReceiverPhone"
                margin="dense"
                label="手機"
                disabled
                defaultValue={phone}
                inputMode="tel"
                sx={{gridColumnStart:1,gridColumnEnd:3}}
            >
            </TextField>
        </CardContent>
    )};

  return (
    <Box sx={{width:"100%",display:"grid"}}>
        {list()}
        <Button 
            variant="contained"
            disabled={!value}
            onClick={()=>{setOpen(false);onHandleChangeAddr()}}
        >確認</Button>
    </Box>
  );
}

export default ChangeAddress;