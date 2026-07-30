import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "shopwave_wishlist";

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isWishlisted = (id) => items.some((i) => i.id === id);

  const toggleWishlist = (product) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === product.id)) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          mrp: product.mrp,
          rating: product.rating,
          brand: product.brand,
          image: product.images?.[0],
        },
      ];
    });
  };

  const removeFromWishlist = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <WishlistContext.Provider value={{ items, isWishlisted, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
