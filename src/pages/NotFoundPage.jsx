import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold mb-4">404 - Not Found</h2>
      <p className="mb-6">Sorry, the page you're looking for does not exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
    </div>
  );
}
