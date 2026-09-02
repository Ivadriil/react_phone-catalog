import { createContext, useContext, useState } from 'react';

import type { Product } from '../types/Product';

type FavoritesContextType = {
  favorites: Product[];
  addFavorite: (id: number | string) => void;
  removeFavorite: (id: number | string) => void;
};

type FavoritesProviderProps = {
  children: React.ReactNode;
  products: Product[];
};
const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
  products,
}: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addFavorite = (id: number | string) => {
    let product: Product | undefined;

    if (typeof id === 'number') {
      product = products.find(item => item.id === id);
    } else {
      product = products.find(item => item.itemId === id);
    }

    if (!product) {
      return;
    }

    setFavorites(prev => [...prev, product]);
  };

  const removeFavorite = (id: number | string) => {
    setFavorites(prev =>
      prev.filter(item => {
        if (typeof id === 'number') {
          return item.id !== id;
        }

        return item.itemId !== id;
      }),
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
};
