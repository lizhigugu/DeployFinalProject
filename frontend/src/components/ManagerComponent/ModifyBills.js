//react import

//mui import
import {Grid, Typography, Box, Divider, List, IconButton, Stack, Chip, Card, CardContent, CardHeader} from "@mui/material"
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

//component import 
import ManageBill from "./ManageBill";
import ListBills from "./listBills";
import TimeLine from "../PersonalComponent/TimeLine";

//test data import 
// import Bills from "../../test datas/Bills";

//hooks import
import { useEffect, useState } from 'react';
import useBackend from "../../containers/hooks/useBackend";
import { useWebsite } from "../../containers/hooks/WebsiteContext";

//functional component
const ModifyBills = () => {

    // set state
    const {userBill, categories, catStatus} = useWebsite();
    const [renderBill, setRenderBill] = useState([]);
    const [viewbill, setViewBill] = useState(true);
    const [listBill, setListBill] = useState(false);
    const [whichCat, setWhichCat] = useState(categories[0]);

    //import hook
    const {GetCatBill, UpdateCategoryStatus} = useBackend();


    useEffect(()=>{
        let newUserBill = [...userBill];
        newUserBill.sort(function(a,b){
            let a_value = parseInt(a.billId.split("_")[1]);
            let b_value = parseInt(b.billId.split("_")[1]);
            return (a_value - b_value)*(-1);
        })
        console.log("renderBill: ", newUserBill);
        setRenderBill(newUserBill);
    },[])

    useEffect(()=>{
        console.log('userBill modified.',userBill);
        let newUserBill = [...userBill];
        newUserBill.sort(function(a,b){
            let a_value = parseInt(a.billId.split("_")[1]);
            let b_value = parseInt(b.billId.split("_")[1]);
            return (a_value - b_value)*(-1);
        })
        console.log("renderBill: ", newUserBill);
        setRenderBill(newUserBill);
    },[userBill])

    useEffect(()=>{
        console.log("rerender")
    }, [catStatus])

    //function
    const handleView = () =>{
        setViewBill(true);
        setListBill(false)
    }

    const handleList = () =>{
        setViewBill(false);
        setListBill(true);
    }

    const handleClick = (which) => {
        setWhichCat(categories[which]);
        GetCatBill(categories[which]);
        setWhichCat(categories[which]);
    }   

    const handleStateBackward = () => {
        console.log("handle backward");
        UpdateCategoryStatus({
            category: whichCat,
            action: -1
        })
    }

    const handleStateForward = () => {
        console.log("handle forward");
        UpdateCategoryStatus({
            category: whichCat,
            action: 1
        })
    }



    



    return(
        <Box>
            <Box sx={{
                display: "grid",
                gap: 1
            }}>
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" component="div">
                            訂單管理
                        </Typography>
                    </Grid> 
                    <Grid item>
                        <IconButton
                            onClick={()=>{handleView()}}
                        >
                            <ViewAgendaIcon />
                        </IconButton>
                        <IconButton
                            onClick={()=>{handleList()}}
                        >
                            <ListAltIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Divider />
                <Stack direction="row" spacing={1}>
                    {categories.map((value,index)=>(
                        <Chip label={value} variant="outlined" onClick={()=>{handleClick(index)}} key={index} />
                    ))}
                </Stack>

                <Card>
                    <CardHeader
                        title={whichCat}
                        action={
                            <>
                                <IconButton
                                    disabled={catStatus<=0}
                                    onClick={()=>{handleStateBackward()}}>
                                    <ArrowLeftIcon />
                                </IconButton>
                                <IconButton
                                    disabled={catStatus>=5}
                                    onClick={()=>{handleStateForward()}}>
                                    <ArrowRightIcon />
                                </IconButton>
                            </>
                        }
                        />
                    <Divider />
                    <CardContent sx={{
                        display: "grid",
                        gap: 1
                    }}>
                        <TimeLine status={catStatus} payment="manager" />
                        {viewbill?
                            <List sx={{
                                display: "grid",
                                gap: 1
                            }}>
                                {renderBill.map((value, index)=>(
                                    <ManageBill item={value} key={index} />
                                ))}
                            </List>
                            :<></>}
                        {
                            listBill?
                            <ListBills items={renderBill}/>:<></>
                        }
                    </CardContent>
                </Card>
            </Box>

        </Box>
    )
}

export default ModifyBills;