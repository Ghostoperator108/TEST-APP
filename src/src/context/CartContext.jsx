import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product, quantity = 1) {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  }

  function updateCartItem(id, quantity) {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(id) {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      totalItems,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}
