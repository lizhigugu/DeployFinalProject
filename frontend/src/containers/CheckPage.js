//react import 
import React from 'react'

//mui import 
import { Card, CardContent, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField'
import  Divider  from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';

//component import 
import Receipt from '../components/PersonalComponent/Receipt';

//navigate import
import { useNavigate } from 'react-router-dom';


//hooks import
import { useWebsite } from './hooks/WebsiteContext'; 
import useBackend from './hooks/useBackend';

//711
//import {getStories} from '../../../backend/src/711/711stores';

//functional component
const CheckPage = () => {
    //set state
    const [PackageOption, setPackageOption] = React.useState('');
    const [PaymentOption, setPaymentOption] = React.useState('');
    const [Phone, setPhone] = React.useState('');
    const [Infm, setInfm] = React.useState({btn:"修改",state:true,color:"error"});
    const [value, setValue] = React.useState("");
    const [name, setName] = React.useState('');
    const [inputValue, setInputValue] = React.useState("");
    const [address, setAddress] = React.useState('');
    const [county, setCounty] = React.useState("");
    const [bank, setBank] = React.useState("");
    const [Account, setAccount] = React.useState("")
    
    //hooks
    const {bill, total, userData, stores, userLineId, paywhich} = useWebsite();
    const {ConfirmBill, GetStores, AddBillToUser, renewTBill, GetUserBill} = useBackend();
    const navigate = useNavigate();

    React.useEffect(()=>{
        console.log('use effect called.');
        setPhone(userData.phoneNumber);
        setName(userData.name);
        setValue(userData.address);
    },[])

    //function define
    const handlePackage = (event) => {
        setPackageOption(event.target.value);
    };

    const handlePayment = (event) => {
        setPaymentOption(event.target.value);
    };

    const handlePhone = (e) => {
          setPhone(e.target.value);
    };
    const handleName = (e)=> {
        setName(e.target.value);  
    }

    const handleInfmChange=()=>{
        // setModified(true);
        if(Infm.state){
            setInfm({btn:"確認",state:false,color:"success"})
        }
        else{
            setInfm({btn:"修改",state:true,color:"error"})
        }
    }

    const onHandleCheckout=()=>{
        new Date();
        // const id = userLineId+"_"+JSON.stringify(bill._id.getTimestamp()).replace(/"/g, '')
        const id = userLineId+"_"+JSON.stringify(Date.now()).replace(/"/g, '')
        console.log("date now: ", id);
        // AddBillToUser(userLineId, id);
        // console.log("billid: ", currentBillId);
        const BillInfo = {
            userLineId: userLineId,
            billId  : id,
            package : PackageOption,
            payment : PaymentOption,
            phone   : Phone,
            receiver    : name,
            address : inputValue,
            total   :total,
            items   :[...bill.ItemList[paywhich].items],
            category: bill.ItemList[paywhich].category,
            caption: "匯款資訊："+Account+" 目的地："+bank
        }
        ConfirmBill(BillInfo, userLineId);
        renewTBill(userLineId, bill.ItemList[paywhich].category);
        // console.log("renewTBill");
        navigate("/personal/bills");
        GetUserBill(userLineId);
    }


    const CountyOption=["台北市","新北市","基隆市","宜蘭縣",
    "桃園市","新竹市","新竹縣","苗栗縣","台中市","彰化縣",
    "南投縣","雲林縣","嘉義市","嘉義縣","台南市","高雄市",
    "屏東縣","花蓮縣","台東縣","澎湖縣","金門縣","連江縣","海南諸島"
    ]

    const list=()=>{
        return(
            <Box sx={{display:"grid",gap:1.5,gridColumnStart:1,gridColumnEnd:3}}>
                <Typography variant='h5'>結帳</Typography>
                <Receipt item={bill.ItemList[paywhich].items||[]} />
                <Box>
                    <Typography variant='h6' sx={{display:"flex",flexDirection:"row"}}>總金額</Typography>
                    <Typography variant='body2' sx={{display:"flex",flexDirection:"row-reverse"}}>{total}</Typography>
                </Box>
                <Divider></Divider>
            </Box>
        )
    }

    var a=[]

    stores.map((option)=>(
        a.push(option.name)
    ))
        
    //return
    return(
        <Card sx={{width:"100%"}}>
            <CardContent sx={{
                display: "grid",
                gap: 1.5
            }}>
                {list()}
                <TextField
                    id="PaymentSelect"
                    select
                    margin="dense"
                    value={PaymentOption}
                    label="付款方式"
                    onChange={(e)=>{handlePayment(e)}}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}
                >
                        <MenuItem value={"貨到付款"}>貨到付款</MenuItem>
                        <MenuItem value={"匯款"}>匯款</MenuItem>
                </TextField>
                {(PaymentOption === "匯款")?
                <>
                <TextField
                    id="PaymentSelect"
                    select
                    margin="dense"
                    value={bank}
                    label="請選擇匯款目的地"
                    onChange={(e)=>{setBank(e.target.value)}}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}
                >
                        <MenuItem value={"街口支付"}>
                            <p>街口支付<br />
                            (396)907225040<br />
                            手機號碼：0976107375</p>
                        </MenuItem>
                        <MenuItem value={"郵局"}>
                            <p>郵局<br />
                            (700)00214110513197<br />
                            無摺戶名</p>
                        </MenuItem>
                        <MenuItem value={"彰化銀行"}>
                            <p>彰化銀行<br />
                            (009)40288604111000</p>
                        </MenuItem>
                        <MenuItem value={"台新銀行"}>
                            <p>台新銀行<br />
                            (812)20271000566759</p>
                        </MenuItem>
                        <MenuItem value={"LINE BANK"}>
                            <p>LINE BANK<br />
                            (824)111004639436</p>
                        </MenuItem>
                </TextField>
                <TextField
                    id="PaymentSelect"
                    margin="dense"
                    value={Account}
                    label="匯款帳號"
                    helperText="請提供匯款帳號後五碼／無摺局號"
                    onChange={(e)=>{setAccount(e.target.value)}}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}
                />
                </>
                :<></>}
                <TextField
                    id="PackageSelect"
                    select
                    margin="dense"
                    label="包材"
                    defaultValue={PackageOption}
                    onChange={(e)=>{handlePackage(e)}}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}
                >
                        <MenuItem value={"紙箱"}>紙箱</MenuItem>
                        <MenuItem value={"破壞袋"}>破壞袋</MenuItem>
                </TextField>
                <Divider sx={{gridColumnStart:1,gridColumnEnd:3}}></Divider>
                <Typography variant="body1" sx={{gridColumnStart:1}}>收件人資訊</Typography>
                <Button variant="contained" color={Infm.color} onClick={(e)=>handleInfmChange()} sx={{gridColumnStart:2}}>{Infm.btn}</Button>
                <TextField
                    required
                    id="ReceiverName"
                    margin="dense"
                    label="姓名"
                    disabled={Infm.state}
                    //defaultValue="小名"
                    onChange={(e)=>{handleName(e)}}
                    value={name}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}
                >
                </TextField>
                <TextField
                    required
                    id="ReceiverPhone"
                    margin="dense"
                    label="手機"
                    disabled={Infm.state}
                    defaultValue={Phone}
                    onChange={(e)=>{handlePhone(e)}}
                    inputMode="tel"
                    value={Phone}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}
                >
                </TextField>
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
                    disabled={Infm.state}
                >
                    {CountyOption.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Autocomplete
                    id="ReceiverAddress"
                    margin="dense"
                    disabled={Infm.state}
                    options={a}
                    sx={{gridColumnStart:2,gridColumnEnd:3,marginTop:"7.5px"}}
                    value={value}
                    onChange={(event, newValue) => {
                        console.log("newValue: ", newValue);
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        console.log("newInputValue: ", newInputValue);
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="門市" 
                    helperText="輸入 店號/門市名稱/道路名稱 查找" required/>}
                >
                </Autocomplete>
                <Button variant="contained" 
                    disabled={!Infm.state || !bill || !PackageOption || !PaymentOption || !value || !(Phone.match(/^(09)[0-9]{8}$/) ? true : false)} 
                    onClick={onHandleCheckout}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}>
                    結帳</Button>
            </CardContent>
        </Card>
    )

}


//export 
export default CheckPage;