import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, updateCartItem, removeFromCart, subtotal } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="text-center">
        <p>Your cart is empty.</p>
        <Link to="/" className="text-blue-600 hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      {cartItems.map(item => (
        <div key={item.id} className="flex items-center border-b py-4">
          <img src={item.image} alt={item.name} className="h-16 w-16 object-cover mr-4" />
          <div className="flex-1">
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
            <div className="flex items-center mt-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e => updateCartItem(item.id, parseInt(e.target.value))}
                className="w-16 border px-2 py-1 rounded"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
          <div>${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}
      <div className="text-right mt-4">
        <p className="text-xl">Subtotal: ${subtotal.toFixed(2)}</p>
        <Link to="/checkout" className="inline-block mt-2 px-6 py-2 bg-green-600 text-white rounded">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
