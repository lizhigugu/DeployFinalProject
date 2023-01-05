// react import
// import {useState} from "react";

// Component import
import { useEffect } from "react";
import ProductsTabs from "../components/MainPageComponent/productsTabs";

import useBackend from "./hooks/useBackend";

// get items function import
// import useBackendTest from "./hooks/useBackend_test";

const MainPage = () => {

    //set state
    const {GetCategories, GetProductsByCategory} = useBackend();

    const geting = () =>{
        // console.log("in");
        GetCategories();
        GetProductsByCategory("all");
    }

    useEffect(()=>{geting()},[])


    //set function 


    //return
    return(

        <ProductsTabs />
    )

}

export default MainPage;