// What is this doing?
// List out all products available by importing shop data
// What do we do with shop data? --> It will likely live in Firebase DB. We can start setup the storage with React Context

import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products.context.jsx';
import ProductCard  from '../../components/product-card/product-card.component.jsx';

import './shop.styles.scss';

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className='products-container'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )
}

export default Shop;