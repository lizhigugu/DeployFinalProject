// react import

// Component import
import { useEffect } from "react";
import ProductsTabs from "../components/MainPageComponent/productsTabs";

import useBackend from "./hooks/useBackend";

const MainPage = () => {

    //set state
    const {GetCategories, GetProductsByCategory} = useBackend();

    const geting = () =>{
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