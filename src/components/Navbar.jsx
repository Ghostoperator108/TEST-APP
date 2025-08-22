import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim() !== '') {
        navigate(`/products?search=${encodeURIComponent(search)}`);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [search, navigate]);

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ShopLogo</Link>
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
        </div>
        <Link to="/cart" className="relative">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
