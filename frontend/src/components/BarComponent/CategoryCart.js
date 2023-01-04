// react import 
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

// mui import
import {Card, CardContent, Box, Typography, Divider, Button} from "@mui/material"

//hook import
import useBackend from "../../containers/hooks/useBackend";
import { useWebsite } from "../../containers/hooks/WebsiteContext";

// functional component
const CategoryCart = ({items, category, ind, setOpen}) => {
    //set state
    const [total, setTotal1] = useState(0);

    //hook import
    const {DeleteItemFromTBill} = useBackend();
    const {userLineId, setPaywhich, setTotal} = useWebsite()

    //navigate
    const navigate = useNavigate();

    //useEffect
    useEffect(()=>{
        let tot = 0;
        items.map((value,index)=>(tot+=value.price*value.number))
        setTotal1(tot);
    },[items])

    //function define
    const onDeleteItemFromBill = (input) => {
        console.log("DeleteBill: ", input);
        DeleteItemFromTBill(userLineId, category, input);
    }

    const handlePay = () => {
        setPaywhich(ind);
        navigate("/check");
        setTotal(total);
        setOpen(false);
        console.log("handle pay");
    }
    return(
        <Box sx={{
            display: "grid",
            gap: 1
        }}>
        {items.map((value, index)=>(
            <Card key={index}>
            <CardContent>
                <Box sx={{
                display: "grid",
                gap: 1
                }}>
                <Box>
                    <Typography variant="h6" component="div">{value.name}</Typography>
                    <Typography variant="caption" component="div">{value.note}</Typography>
                </Box>
                <Divider />
                <Box sx={{
                display: "grid",
                }}>
                    {value.option? <Typography variant="body2" component="div">選項：{value.option}</Typography>:<></>}
                    <Typography variant="body2" component="div">數量：{value.number}</Typography>
                    <Typography variant="body2" component="div">金額：{value.price*value.number}</Typography>
                </Box>
                <Box sx={{
                display: "flex",
                justifyContent: "center",
                }}>
                <Button sx={{width:"50%",alignSelf:"flex-end"}}
                variant="outlined"
                color='error'
                value={index}
                //delete function
                onClick={(e)=>{onDeleteItemFromBill(e.target.value)}}
                >刪除此商品</Button>
                </Box>
                </Box>
            </CardContent>
            </Card>
        ))}
        <Typography variant="body1" component="div">總金額：{total}</Typography>
        <Button 
            sx={{width:"50%",alignSelf:"flex-end"}}
            disabled={!(items.length)}
            variant="contained"
            onClick={()=>{handlePay()}}>
            結帳
        </Button>
        </Box>
    )
}
//export
export default CategoryCart; 
