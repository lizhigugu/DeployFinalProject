//react import
import {useEffect} from "react";

//mui import
import {Box, Typography, Divider, Grid} from "@mui/material"

//component import 
import AddCategoryForm from "./AddCategoryForm";
// import AddProductForm from "./AddProductForm";
import CategoryList from "./CategoryList";

//hooks import
import useBackend from "../../containers/hooks/useBackend";

//functional component
const ModifyProduct = () => {
    //set state
    const {GetCategories} = useBackend();
    useEffect(()=>{
        GetCategories();
    },[])

    //function define


    return(
        <Box>
            <Box sx={{
                display: "grid",
                gap: 1
            }}>
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" component="div">
                            商品管理
                        </Typography>
                    </Grid>
                    <Grid item>
                        <AddCategoryForm />
                    </Grid>
                    
                </Grid>
                <Divider />
                <CategoryList />
            </Box>

        </Box>
    )
}

//export 
export default ModifyProduct;