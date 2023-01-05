// react import
// import {useState} from "react";

// Component import
import ProductsTabs from "../components/MainPageComponent/productsTabs";
import client from "./hooks/wsConnect";
import useBackend from "./hooks/useBackend";

// get items function import
// import useBackendTest from "./hooks/useBackend_test";

const MainPage = () => {

    //set state
    const {GetCategories} = useBackend();


    //set function 
    useEffect(()=>{
        console.log("in mainpage useeffect");
        console.log("client: ", client);
        GetCategories();
      }, [])


    //return
    return(
        <>
        {GetCategories()}
        <ProductsTabs />
        </>
    )

}

export default MainPage;