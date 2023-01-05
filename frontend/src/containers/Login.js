//react import 
import {useEffect, useState} from "react";

//mui import
import {Box, Divider, TextField, Typography, Button, Alert, AlertTitle} from "@mui/material";

//hook import
import { useWebsite } from "./hooks/WebsiteContext";
import useBackend from "./hooks/useBackend";

//import navigate
import { useNavigate, useLocation } from "react-router-dom";

import axios from 'axios'
import qs from 'qs'

//functional component 
const Login = () => {
    //set state
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    // const [open, setOpen] = useState(false);
    // const [setUp, setSetUp] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    // const [alert, setAlert] = useState(false);
    const [iflinesend, setIflinesend] = useState(false);

    //hook import
    const { checkManager, iflog, ifsend, setifsend } = useWebsite();
    const { GetUserData, AddUser, getTBill, loginLine } = useBackend();

    //navigate define
    const navigate = useNavigate();

    const info = useLocation();

    //function define
    const handleLogin = () => {
        if(!id || !name){
            return
        }
        GetUserData(id);
        const ifM=checkManager(name, id);
        console.log("if manager: ", ifM);
        console.log("if login: ", iflog);
        if(iflog){
            navigate("/")
            getTBill(id);
        }
        else{
            AddUser(name, id);
            GetUserData(id);
            navigate("/");
            getTBill(id);
        }   

        
    }
    useEffect(()=>{
        if(iflog){
            navigate("/");
        }
    },[iflog]);


    const handleLine = async () => {
        console.log("handle Line");
        let URL = 'https://access.line.me/oauth2/v2.1/authorize?'
        // 必填
        URL += 'response_type=code' // 希望LINE回應什麼  但是目前只有code能選
        URL += `&client_id=${1657771320}` // 你的頻道ID
        URL += `&redirect_uri=http://localhost:3001/login` 
        URL += '&state=2361886424832' // 用來防止跨站請求的 之後回傳會傳回來給你驗證 通常設亂數 這邊就先放123456789
        URL += '&scope=openid%20profile' // 跟使用者要求的權限 目前就三個能選 openid profile email
        // 選填
        URL += '&nonce=helloWorld' // 順便將機器人也加好友
        URL += '&prompt=consent'
        URL += '&max_age=3600'
        URL += '&ui_locales=zh-TW'
        URL += '&bot_prompt=normal'
        window.open(URL, '_self') // 轉跳到該網址
        
    }

    useEffect(()=>{
        console.log(info)
        if(info.search && !ifsend){
            setTimeout(function(){
                console.log("e500");
            }, 1000);
            const value = qs.parse(info.search, { ignoreQueryPrefix: true });
            loginLine(value.code)
            setifsend(true);

        }
        else{
            setifsend(false);
        }
    },[])

    return(
        <Box sx={{
            display: "grid",
            gap: 1,
            width: "100%",
            justifyContent: "center"
        }}>
            <Typography variant="h5" component="div" justifySelf="center">買家登入</Typography>
            <Divider sx={{width: "100%"}}/>
            <TextField
                variant="outlined"
                label="使用者名稱"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />
            <TextField
                variant="outlined"
                label="使用者ID"
                value={id}
                onChange={(e)=>{setId(e.target.value)}}
            />
            {openAlert? 
            <Alert severity="error">
                <AlertTitle>{Alert}</AlertTitle>
            </Alert>:<></>}
            <Button 
                variant="contained" 
                sx={{backgroundColor: "green"}}
                onClick={()=>{handleLine()}}
                >
                使用Line登入
            </Button>
            <Button 
                variant="contained" 
                disabled={!id || !name}
                onClick={()=>{handleLogin()}}
                >
                登入 / 註冊
            </Button>
        </Box>
    )
}

//export 
export default Login;