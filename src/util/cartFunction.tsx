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

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
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

  const addToCart = (product: Product) => {
    // Check if the product is already in the cart
    const productInCart = cart.find((item) => item._id === product._id);

    if (productInCart) {
      // If the product is in the cart, update its quantity
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );

      // Save the updated cart to localStorage immediately
      setCart(updatedCart);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCart));
    } else {
      // If the product is not in the cart, add it with the selected quantity
      const updatedCart = [...cart, { ...product }];
      
      // Save the updated cart to localStorage immediately
      setCart(updatedCart);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    
    // Update localStorage with the new cart data immediately
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
