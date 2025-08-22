import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import { CartContext } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="md:flex md:space-x-6">
      {/* Images */}
      <div className="md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full rounded" />
      </div>

      {/* Details */}
      <div className="md:w-1/2 mt-4 md:mt-0">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <p className="text-xl text-green-600 font-bold my-2">${product.price.toFixed(2)}</p>
        <p className="mb-4">{product.description}</p>
        <div className="flex items-center mb-4">
          <span className="mr-2">Quantity:</span>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={e => setQty(parseInt(e.target.value))}
            className="w-16 border px-2 py-1 rounded"
          />
        </div>
        <button
          onClick={() => addToCart(product, qty)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add to Cart
        </button>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Reviews</h3>
            {product.reviews.map((rev, idx) => (
              <div key={idx} className="mb-2 border-b pb-2">
                <strong>{rev.user}</strong> - <em>{rev.rating}★</em>
                <p>{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
