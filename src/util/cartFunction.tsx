import React, { ReactNode, createContext, useContext, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageURL: string;
}


const CartContext = createContext({
  cart: [] as Product[], // Initialize with an empty array
  addToCart: (product: Product) => {},

});

interface CartProviderProps {
  children: ReactNode;
 
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // TODO: Add remove from cart
  // const removeFromCart = (productId: any) => {
  //   setCart((prevCart) => prevCart.filter((product) => product._id !== productId));
  // };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

