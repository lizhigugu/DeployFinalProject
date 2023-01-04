// mui Import
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import { ThemeProvider } from '@emotion/react';


// navigation import 
import {useNavigate} from "react-router-dom";

// Component Import
import { drawerWidth } from './BarConstDef';

//hook import
import { useWebsite } from '../../containers/hooks/WebsiteContext';

// react import 
import {useState, useEffect} from "react";
import ManageAccounts from '@mui/icons-material/ManageAccounts';


// Styled Component
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

// function component
const BarDrawer = ({open, setOpen, theme}) => {
    //hook import
    const {isManager, iflog} = useWebsite();

    //set state

    //function define
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // navigation define
    const navigate = useNavigate();
    
    const navigateToMain = () => {
      navigate("/");
    }

    const navigateToPersonal = () => {
      navigate("/personal");
    }

    const navigateToBill = () => {
      navigate("/personal/bills");
    }

    //useEffect
    useEffect(()=>{
      // console.log("in barDrawer: ", isManager);
    }, [isManager])

    //return
    return(
      <ThemeProvider theme={theme}>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"首頁"} disablePadding onClick={()=>{navigateToMain()}}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"首頁"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"基本資料"} disablePadding onClick={()=>{navigateToPersonal()}} disabled={!iflog}>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={"基本資料"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"我的訂單"} disablePadding onClick={()=>{navigateToBill()}} disabled={!iflog}>
                <ListItemButton>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary={"我的訂單"} />
                </ListItemButton>
              </ListItem>
        </List>
        <Divider />
        {isManager? (<List>
            <ListItem key={5} disablePadding>
              <ListItemButton onClick={()=>{navigate("/manager")}}>
                <ListItemIcon>
                <ManageAccounts />
                </ListItemIcon>
                <ListItemText primary={"管理者頁面"} />
              </ListItemButton>
            </ListItem>
        </List>):<></>}
      </Drawer>
      </ThemeProvider>
    )
}

export default BarDrawer;



