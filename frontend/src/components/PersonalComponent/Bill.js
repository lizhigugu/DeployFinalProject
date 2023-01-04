//react import 
import Box from "@mui/material/Box";
import {Card, CardContent, DialogContent, DialogTitle} from "@mui/material";
import { Typography, Button, Dialog } from "@mui/material";
import {useState} from "react";
import SortDialog from "./SortDialog";
import ChangeAddress from "../ChangeAddress";

//mui import 

//component import 
import Receipt from "./Receipt";
import TimeLine from "./TimeLine";
import useBackend from "../../containers/hooks/useBackend";
import { Divider } from "antd";

//import hooks

//functional component
const Bill = ({item, id}) => {
    //set state
    const [openCard, setOpenCard] = useState(false);
    const [Submit,setSubmit] = useState(false);
    const [ChangeAddressOpen,setChangeAddressOpen]=useState(false);
    const {UpdateItem} = useBackend()
    //fetch backend data
    //function define

    const handleSubmit=()=>{
        setSubmit(true)
        var a=[]
        console.log("item: ",item.items)
        item.items.map((item,index)=>{
            item.product_type?a.push({
                name: item.name,
                note: item.note,
                number: item.number,
                option: item.option,
                price: item.price,
                product_type: false,
                _id: item._id,
            }):a.push(item)
        })
        console.log("a: ", a)
        console.log("billID: ", item.billId)
        UpdateItem({
            id: item.billId,
            items: a})
    }

    //const define
    //console.log(Submit)
    console.log(item)
    let total_type=false
    item.items.map((item,index)=>{
        total_type|=item.product_type
    })

    //return 
    return(
        <Card sx={{
            justifyContent:"center",
        }}>
            <CardContent sx={{
                display: "grid",
                gap: 1.5
            }}>
            <Typography variant="h6" component="div">
                訂單編號：{item.billId}
            </Typography>
            <Box sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 3
            }}>
                <Box sx={{
                    display: "grid",
                    gap:1
                }}>
                    <Box>
                        <Receipt item={item.items} />
                    </Box>
                    <Typography variant="body1" component="div">
                        總價：{item.total}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "grid",
                    gap: 1
                }}>
                    <Box>
                        <TimeLine status={item.status} payment={item.payment} />
                    </Box>
                    <Box sx={{
                        display: "grid",
                        gap: 1,
                        width: "100%"
                    }}>
                        <Typography variant="body2" component="div">
                            付款方式：{item.payment}
                        </Typography>
                        <Typography variant="body2" component="div">
                            包裝方式：{item.package}
                        </Typography>
                        {item.caption?
                        <Typography variant="body2" component="div">
                            備註（匯款）：{item.caption}
                        </Typography>
                        :<></>}
                        <Typography variant="body2" component="div">
                            地址：{item.address}
                        </Typography>
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr"
                        }}>
                            {(total_type&&item.status === 3&&(!Submit))? <Button variant="contained" color="success" size="small" align="right" onClick={()=>{setOpenCard(true)}}>參與配卡</Button>:<Button disabled variant="outlined" size="small" align="right">參與配卡</Button>}
                            {(item.status <= 3)? <Button variant="outlined" size="small" align="right" onClick={()=>{setChangeAddressOpen(true)}}>地址修改</Button>:<Button disabled variant="outlined" size="small" align="right">地址修改</Button>}
                        </Box>
                        <Dialog
                            open={openCard}
                            fullWidth={true}
                            onClose={()=>{setOpenCard(false)}}
                        >
                            <DialogTitle>配卡志願序</DialogTitle>
                            <Divider />
                            <DialogContent sx={{
                                display: "grid",
                                gap: 1
                            }}>
                            <SortDialog item={item.items} handleSubmit={handleSubmit} setOpenCard={setOpenCard} BillId={item.billId} category={item.category} />
                            </DialogContent>
                        </Dialog>
                        <Dialog
                            open={ChangeAddressOpen}
                            fullWidth={true}
                            sx={{display:"grid"}}
                        >
                        <ChangeAddress setOpen={setChangeAddressOpen} receiver={item.receiver} phone={item.phone} address={item.address} />
                        </Dialog>
                    </Box>
                </Box>
            </Box>
            </CardContent>
        </Card>
    )
}

//export 
export default Bill;