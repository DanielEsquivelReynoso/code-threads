// What is this doing?
// List out all products available by importing shop data
// What do we do with shop data? --> It will likely live in Firebase DB. We can start setup the storage with React Context

import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products.context';

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div>
      {products.map(({id, name}) => (
        <div key= {id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  )
}

export default Shop;