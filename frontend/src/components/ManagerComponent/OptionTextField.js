// mui import
import { TextField } from "@mui/material";

//react import
import {useEffect} from "react";

const OptionTextField = ({setOptions, num, options}) => {
    //set state
    
    //function define
    const handleSetOptionName = (value) => {
        //handleSetOptions(value,'name');
        let newArr = [...options];
        newArr[num]['option']=value;
        setOptions(newArr);
    }
    const handleSetOptionNum = (value) => {
        //handleSetOptions(value,'num');
        let newArr = [...options];
        newArr[num]['bought']=value;
        setOptions(newArr);
    }
    useEffect(()=>{
        console.log('options',options)
    },[options])

    //return
    return(
        <>
        <TextField
        autoFocus
        required
        margin="dense"
        id={num.toString()+"name"}
        label={"選項"+(num+1)+" 名稱"}
        type="text"
        fullWidth
        variant="outlined"
        value={options[num].option}
        onChange={(e)=>{handleSetOptionName(e.target.value.replace("[object Object]",""))}}
        />
        <TextField
        autoFocus
        required
        margin="dense"
        id={num.toString()+"count"}
        label={"選項"+(num+1)+" 數量"}
        type="text"
        fullWidth
        variant="outlined"
        value={options[num].bought}
        onChange={(e)=>{handleSetOptionNum(e.target.value.replace("[object Object]",""))}}
        />
        </>
    )
}

//export
export default OptionTextField;