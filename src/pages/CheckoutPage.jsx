import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function CheckoutPage() {
  const { clearCart, subtotal } = useContext(CartContext);
  const [form, setForm] = useState({ name: '', address: '', payment: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Mock submission
    console.log('Order placed:', { ...form, total: subtotal });
    clearCart();
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="text-center">Thank you for your purchase!</p>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            required
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Payment Details</label>
          <input
            type="text"
            required
            value={form.payment}
            onChange={e => setForm({ ...form, payment: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Card number or other details"
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
          Place Order (${subtotal.toFixed(2)})
        </button>
      </form>
    </div>
  );
}
