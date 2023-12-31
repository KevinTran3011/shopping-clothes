
import React, { useEffect, Fragment } from "react";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../component/store/categories/category.selector";
import { useSelector } from "react-redux";

import Spinner from "../../component/spinner/spinner.components";


const  CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading)

  return (
    <Fragment>
      {isLoading? (<Spinner/>):(Object.keys(categoriesMap).map(title => {
        const products = categoriesMap[title];
        return(
          <CategoryPreview key = {title} title = {title} products = {products}/>
        )

      }))
      }
    </Fragment>
  );
};

export default CategoriesPreview;
