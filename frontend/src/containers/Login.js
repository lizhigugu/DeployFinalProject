//react import 
import {useState} from "react";

//mui import
import {Box, Divider, TextField, Typography, Button, Alert, AlertTitle} from "@mui/material";

//hook import
import { useWebsite } from "./hooks/WebsiteContext";
import useBackend from "./hooks/useBackend";

//import navigate
import { useNavigate } from "react-router-dom";

// component import 
// import SetUpForm from "../components/LoginComponent/SetUpForm";

//functional component 
const Login = () => {
    //set state
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    // const [open, setOpen] = useState(false);
    // const [setUp, setSetUp] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    // const [alert, setAlert] = useState(false);

    //hook import
    const { checkManager, iflog } = useWebsite();
    const { GetUserData, AddUser, getTBill } = useBackend();

    //navigate define
    const navigate = useNavigate();

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


    const handleLine = () => {
        console.log("handle Line");
    }

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
                disabled={!id || !name}
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