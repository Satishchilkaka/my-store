// CartFunction.tsx
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageURL: string;
}

const STORAGE_KEY = 'cart';

const CartContext = createContext({
  cart: [] as Product[], // Initialize with an empty array
  addToCart: (products: Product[]) => {},
  removeFromCart: (productId: string) => {},
});

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextType {
  cart: Product[];
  addToCart: (products: Product[]) => void;
  removeFromCart: (productId: string) => void;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    // Load cart data from localStorage
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []); // Run once on component mount

  const addToCart = (products: Product[]) => {
    setCart((prevCart) => [...prevCart, ...products]);
    // Save the updated cart to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...cart, ...products]));
  };
  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
