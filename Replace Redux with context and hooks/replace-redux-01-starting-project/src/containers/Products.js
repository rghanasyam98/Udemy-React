import React from 'react';
import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';

import { useContext } from 'react';
import { ProductContext } from '../context/product-context';
import { useStore } from '../hooks-store/store';

// for custom hook method for state management
const Products = props => {
  // in case of redux
  // const productList = useSelector(state => state.shop.products);

 const state=useStore();
  return (
    <ul className="products-list">
      {state.products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;



// for contextapi method
// const Products = props => {
//   // in case of redux
//   // const productList = useSelector(state => state.shop.products);

//   // in case of context
//   const productList=useContext(ProductContext).products;
//   return (
//     <ul className="products-list">
//       {productList.map(prod => (
//         <ProductItem
//           key={prod.id}
//           id={prod.id}
//           title={prod.title}
//           description={prod.description}
//           isFav={prod.isFavorite}
//         />
//       ))}
//     </ul>
//   );
// };

// export default Products;
