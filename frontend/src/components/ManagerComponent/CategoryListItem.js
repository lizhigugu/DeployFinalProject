//react import
import {useState} from "react";

//mui import
import { IconButton, ListItem, ListItemText, Box, Divider, Card, List } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

//component import
import AddProductForm from "./AddProductForm";
import ProductinCat from "./ProductsinCategory";
import UpdateCategoryForm from "./UpdateCategoryForm";

//test data improt 
// import Products from "../../test datas/Products";

//import hooks
import { useEffect } from 'react'
import { useWebsite } from "../../containers/hooks/WebsiteContext";
import useBackend from "../../containers/hooks/useBackend";

//functional component
const CategoryListItem = ({item, ind, atwhich, setAtwhich}) =>{
    
    //set state
    const [open, setOpen] = useState(false)

    //fetch backend data
    const { products, deadlines, categories } = useWebsite();
    const { GetProductsByCategory, DeleteCategory } = useBackend();

    useEffect(()=>{
        GetProductsByCategory(item);
    },[open])
    useEffect(()=>{
        GetProductsByCategory(item);   
    },[categories])

    //function define

    const handleDelete = () => {
        console.log("handle Delete");
        DeleteCategory(item);
    }

    const handleExpand = () => {
        if(open){
            setOpen(!open);
            setAtwhich(-1);
        }
        if(atwhich===-1){
            setAtwhich(ind);
        }
        else if (!(atwhich===ind)){
            alert("請先關掉一個商品分類再開啟下一個")
            return
        }
        console.log("handle expand");
        setOpen(!open);
    }

    const convertDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toString();
    }

    //return
    return(
        <Card sx={{width: "100%"}}>
            <ListItem>
                <ListItemText primary={item} secondary={convertDate(deadlines[ind])} />
                <IconButton
                    onClick={()=>{handleExpand()}}
                >
                    {open? <ExpandLessIcon />:<ExpandMoreIcon />}
                </IconButton>
                <UpdateCategoryForm oldData={{name:item, deadline:deadlines[ind]}}/>
                <IconButton
                    onClick={()=>{handleDelete()}}
                >
                    <DeleteIcon/>
                </IconButton>
                {open? <AddProductForm category={item} />:<></>}
            </ListItem>
            {open? 
            <Box sx={{width: "100%"}}>
                <Divider />
                <List>
                {products.map((value, index)=>(
                    <ProductinCat item={value} key={index} ind={index} />
                ))}
                </List>
            </Box>
            :<></>}
        </Card>
    )
}

export default CategoryListItem;