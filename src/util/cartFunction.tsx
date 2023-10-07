import { useState } from 'react';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageURL: string;
}

export const useCart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return {
    cart,
    addToCart,
  };
};
