
import React, { useEffect, Fragment } from "react";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { selectCategoriesMap } from "../../component/store/categories/category.selector";
import { useSelector } from "react-redux";

const  CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map(title => {
        const products = categoriesMap[title];
        return(
          <CategoryPreview key = {title} title = {title} products = {products}/>
        )

      })}
    </Fragment>
  );
};

export default CategoriesPreview;
