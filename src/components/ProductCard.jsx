import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Button from './Button';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded shadow p-4 flex flex-col">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-4"/>
        <h3 className="font-semibold">{product.name}</h3>
      </Link>
      <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
      <div className="mt-auto">
        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      </div>
    </div>
  );
}
