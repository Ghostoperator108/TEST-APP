import React, { useState } from 'react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const query = useQuery();
  const searchQuery = query.get('search') || '';
  const categoryFilter = query.get('category') || '';
  const sortOption = query.get('sort') || '';

  // Filter products based on search and category
  let filtered = productsData.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (categoryFilter ? product.category === categoryFilter : true)
  );

  // Sorting
  if (sortOption === 'priceAsc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'priceDesc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'popularity') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search products..."
            defaultValue={searchQuery}
            onChange={() => setPage(1)} // resets page on change
            className="border px-3 py-2 rounded"
          />
          <select defaultValue={sortOption} onChange={() => setPage(1)} className="border px-3 py-2 rounded">
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {paginated.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center space-x-2">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">Page {page} of {totalPages || 1}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
