import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My E-commerce Store. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="mx-2 hover:underline">Privacy Policy</a> | 
          <a href="#" className="mx-2 hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
