// mui import 
import MuiAppBar from '@mui/material/AppBar';
import {styled} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { Dialog, Badge } from '@mui/material';
import theme1 from '../../theme';
import { ThemeProvider } from '@emotion/react';

// mui icon import
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

// react import
import {useState, Fragment, useEffect } from "react";

// Component Import 
import BarDrawer from './barDrawer';
import { drawerWidth } from './BarConstDef';
import CartInclude from './CartItem';

//hooks import
import { useWebsite } from '../../containers/hooks/WebsiteContext';
import useBackend from '../../containers/hooks/useBackend';
import { useNavigate } from 'react-router-dom';

// styled component
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

// functional component
const NavBar = ({open, setOpen}) => {
    // set state
    const [openCart, setOpenCart] = useState(false);
    const [badgeNum, setBadgeNum] = useState(0);
    
    //advoid undefined list of items rendered.
    const { bill, currentBillId, iflog, userLineId, setIflog, setIsManager } = useWebsite();
    const { GetBill, getTBill } = useBackend();

    // set theme

    //set navigate
    const navigate = useNavigate();

    useEffect(()=>{
      GetBill(currentBillId);
    },[])

    useEffect(()=>{
      if(iflog && bill.ItemList){
        setBadgeNum(bill.ItemList.length);
      }
      else{
        setBadgeNum(0);
      }
      // console.log("rerender");
      // console.log("bill length: ", bill.items.length);
    },[bill]);
    
    const handleCart = async() => {
      await getTBill(userLineId);
      setOpenCart(true);
      console.log("open cart", bill, bill.length);
    };
    
    const handleDrawer = () => {
        setOpen(!open);
    }
    
    const handleLogin = () => {
      if(!iflog){
        navigate("/login")
      }
      else{
        navigate("/personal")
      }
    }
    
    return (
      <ThemeProvider theme={theme1}>
      <Box sx={{ flexGrow: 0 }}>
        <AppBar position="static" theme={theme1} open={open}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={(e)=>{handleDrawer()}}
              disabled={!iflog}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GoMyWonJam
            </Typography>
            <Fragment>
              <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={()=>{handleCart()}}
                    color="inherit"
                    disabled={!iflog}
                  >
                    {/* {iflog?  */}
                    <Badge badgeContent={badgeNum} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                    {/* :<ShoppingCartIcon />} */}
              </IconButton>
              <Dialog 
                open={openCart} 
                onClose={()=>{setOpenCart(false)}} 
                fullWidth={true}
                >
                <CartInclude open={openCart} setOpen={setOpenCart} />
              </Dialog>
              <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={()=>{handleLogin()}}
                    color="inherit"
                  >
                    <AccountCircleIcon />
              </IconButton>
              {iflog? 
              <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={()=>{
                      setIflog(false);
                      setIsManager(false);
                      setBadgeNum(0);
                      navigate("/login");
                    }}
                    color="inherit"
                  >
                    <LogoutIcon />
              </IconButton>:<></>}
            </Fragment>
          </Toolbar>
        </AppBar>
      </Box>
      <BarDrawer open={open} setOpen={setOpen} theme={theme1} />
      </ThemeProvider>
    )
}

// export

export default NavBar;


