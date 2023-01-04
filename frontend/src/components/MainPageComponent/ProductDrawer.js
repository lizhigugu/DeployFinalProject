// mui import
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';

// react import
import {useState} from "react";
import useBackend from "../../containers/hooks/useBackend";
import { useWebsite } from "../../containers/hooks/WebsiteContext";
import { useNavigate } from "react-router-dom";

// functional component
const ProductDrawer = ({item, handleClose}) => {
    // set state
    // const [option, setOption] = useState("");
    const [number, setNumber] = useState(1);
    const [optionChosed, setOptionChosed] = useState("");
    const [note, setNote]     = useState("");

    //import backend functions
    const {AddItemToTBill} = useBackend();
    const {iflog, setUserBill, userLineId} = useWebsite();

    //useNavigate
    const navigate = useNavigate();

    // handle add item to bill
    // suppose global state known. default: userLineId:ming
    // currentBillId: ming_2022-12-30T09:14:22.000Z
    const onAddItemToBill = (name, price, option, number, note, product_type, category)=>{
        const item = {name, price, option, number, note, product_type, category}
        // const BillId = 'ming_2022-12-30T09:14:22.000Z'
        // console.log("adding item to bill", item, currentBillId);
        AddItemToTBill(userLineId, item);
        setUserBill([]);
    }

    // function

    return(
        <div>
        <Box
          sx={{backgroundColor: "background.default",
          display:"flex",
          flexDirection:"row",
          justifyContent:"center"
          }}
        >
            <Box sx={{
                width: 300,
                height:300,
                margin:"20px",
                backgroundColor: 'background.default',
            }}>
                <img src={item.URL} width="300px" height="300px"></img>
            </Box>
            <Box sx={{flexDirection:"column",
                    display:"flex",
                    backgroundColor:'background.default',
                    justifyContent:"space-between",
                    justifyItems:"center",
                    paddingBottom:"10px"}}>
                <Box sx={{flexDirection:"display",
                          alignContent:"center",
                          margin:"10px"}}>
                    <ListItemText primary={item.name} secondary={item.category}/>
                </Box>
                <TextField label="數量"
                    helperText="請輸入數量"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                    type:"number",
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                    onChange={(e)=>{
                        if (e.target.value <= 0 && !isNaN(e.target.value)){
                            if(isNaN(e.target.value)){
                                setNumber(0);
                            }
                            else{
                                if(e.target.value >= 0){
                                    setNumber(e.target.value);
                                }
                                //else{
                                  //  setNumber(0);
                                //}
                            }
                        }
                        else if(isNaN(e.target.value)){
                            setNumber(0);
                        }
                        else{
                            setNumber(e.target.value);
                        }
                            }}
                    value={number}
                />
                {!(item.options.length <= 1)? 
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">選項</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="選項"
                    value={optionChosed}
                    onChange={(e)=>{setOptionChosed(e.target.value)}}>
                        {item.options.map((e)=>(<MenuItem value={e.option}>{e.option}</MenuItem>))}
                    </Select>
                </FormControl>:<></>}
                <TextField 
                    id="standard-basic" 
                    label="備註" 
                    variant="standard" 
                    size="small"
                    onChange={(e)=>{setNote(e.target.value)}}
                />
                <Button 
                    sx={{width:"50%",alignSelf:"flex-end",m: 1, width: '15ch'}}
                    variant="contained"
                    disabled={(number < 1) || (!optionChosed && !(item.options.length <= 1))}
                    onClick={()=>{
                        handleClose(false);
                        if(!iflog){
                            navigate("/login")
                            return
                        }
                        onAddItemToBill(item.name, item.price, optionChosed, number, note, item.product_type, item.category);
                    }}
                >
                    加入購物車
                </Button>
            </Box>
        </Box>
        </div>
    )
}

//export
export default ProductDrawer;
