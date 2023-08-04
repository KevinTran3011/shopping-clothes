import { createContext , useEffect, useState} from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util.js";

import SHOP_DATA from '../../shop-data.js';



export const CategoriesContext = createContext({

    categoriesMap: {},


});

export const CategoriesProvider = ({children}) =>{

    const [categoriesMap, setCategoriesMap] = useState({});
    useEffect(()=>{
        //Crate documents for each categories in the SHOP_DATA file
        const getCategoriesMap = async ()=>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)

        }
        getCategoriesMap();
    }, [])
    const value = {categoriesMap};
    return(
        <CategoriesContext.Provider value ={value}>{children}</CategoriesContext.Provider>
    )
}