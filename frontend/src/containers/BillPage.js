//react import

//mui import
import { Box } from "@mui/material";

//component import
import Bill from "../components/PersonalComponent/Bill";

//hooks import
import { useEffect } from 'react';
import { useWebsite } from "./hooks/WebsiteContext";
import useBackend from "./hooks/useBackend";


//functional component
const BillPage = () => {
    
    //set state

    //function define
    const { userBill, userLineId } = useWebsite();
    const { GetUserBill } = useBackend();

    useEffect(()=>{
        GetUserBill(userLineId);
    },[])
    useEffect(()=>{
        console.log('user bill',userLineId,userBill);
    },[userBill])
    
    //return
    return(
        <Box sx={{
            width: 1,
            display: "grid",
            gap: 2
            }}>
            {userBill.map((value, index) => (
                <Bill item={value} key={index}/>
            ))}
        </Box>
    )
}

//export
export default BillPage;