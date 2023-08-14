import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from '../category/category.component';
import { setCategories } from '../../component/store/categories/category.action';
import { useDispatch } from 'react-redux';
import './shop.styles.scss';


const Shop = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    //Crate documents for each categories in the SHOP_DATA file
    const getCategoriesMap = async ()=>{
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(setCategories(categoriesArray));

    }
    getCategoriesMap();
}, [])


  return (


        <Routes>
          <Route index element = { <CategoriesPreview/>}/>
          <Route path = ":category" element = { <Category/>}/>

        </Routes>




  );
};

export default Shop;
