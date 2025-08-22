import React from 'react';

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-xl mb-4">{title}</h2>
        <div>{children}</div>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-3 py-1 rounded">
          Close
        </button>
      </div>
    </div>
  );
}
