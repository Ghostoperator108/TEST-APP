import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const featured = products.slice(0, 4); // first 4 as featured
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 rounded mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="mb-6">Discover amazing products and deals!</p>
          <Link to="/products" className="bg-white text-blue-600 px-6 py-3 font-semibold rounded">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex space-x-4">
          {categories.map(cat => (
            <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`} className="px-4 py-2 bg-gray-200 rounded">
              {cat}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
