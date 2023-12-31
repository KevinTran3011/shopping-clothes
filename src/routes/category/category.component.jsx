import './category.styles.scss';
import { useParams } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../component/store/categories/category.selector';
import ProductCard from '../../component/product-card/product-card.component';

import Spinner from '../../component/spinner/spinner.components';
const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading? ( <Spinner/>): (
                <div className='category-container'>
                {products && products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
                    

            )}

    </Fragment>

  );
}

export default Category;
