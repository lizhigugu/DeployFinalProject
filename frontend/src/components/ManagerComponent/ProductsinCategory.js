//react import 

//mui import 
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

//test data import 

//hooks import
import useBackend from "../../containers/hooks/useBackend";
import UpdateProductForm from "./UpdateProductForm";

//functional component
const ProductinCat = ({item,ind}) => {
    
    //set state

    //fetch backend data
    const {DeleteProduct} = useBackend();

    //function defince

    const handleDelete = () => {
        console.log("product handle delete");
        DeleteProduct({name:item.name,category:item.category});
    }

    //return
    return(
        <ListItem>
            <ListItemText primary={item.name}/>
            <UpdateProductForm ind={ind}/>
                <IconButton
                    onClick={()=>{handleDelete()}}
                >
                    <DeleteIcon />
                </IconButton>
        </ListItem>
    )

}

//export
export default ProductinCat;