// mui import 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Drawer from "@mui/material/Drawer";

// react import
import { useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";

// component import
import ProductPage from '../ProductPage'; 
import ProductsTabs from './productsTabs';
import ProductDrawer from './ProductDrawer';

// functional component
const ProductCard = ({item}) => {

    // set state
    const [open, setOpen] = useState(false);
    const [Option, setOption] = useState('');

    // use Navigation   

    // navigate function

    // function define
    const handleClose = (value) => {
        setOpen(value);
    }


    // set const

    // return
    return(
    <div>
        <Fragment>
           <Card sx = {{ width: "90%"}} onClick={()=>{setOpen(true)}}>
               <CardActionArea>
                   <CardMedia
                        image ={item.URL}
                        height = "80%"
                        component = "img"
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            價格：{item.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Drawer
                anchor={"bottom"}
                open={open}
                onClose={()=>{setOpen(false)}}
            >
             <ProductDrawer item={item} handleClose={handleClose} />
            </Drawer>
        </Fragment>
    </div>
    )
}

//export 

export default ProductCard;