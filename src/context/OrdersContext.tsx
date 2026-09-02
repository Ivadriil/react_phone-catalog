import { createContext, useContext, useState } from 'react';

import type { Product } from '../types/Product';

type OrdersContextType = {
  orders: Product[];
  addOrder: (id: number | string) => void;
  removeOrder: (id: number | string) => void;
};
type OrdersProviderProps = {
  children: React.ReactNode;
  products: Product[];
};
const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider = ({ children, products }: OrdersProviderProps) => {
  const [orders, setOrders] = useState<Product[]>([]);

  const addOrder = (id: number | string) => {
    let product: Product | undefined;

    if (typeof id === 'number') {
      product = products.find(item => item.id === id);
    } else {
      product = products.find(item => item.itemId === id);
    }

    if (!product) {
      return;
    }

    setOrders(prev => [...prev, product]);
  };

  const removeOrder = (id: number | string) => {
    setOrders(prev =>
      prev.filter(item => {
        if (typeof id === 'number') {
          return item.id !== id;
        }

        return item.itemId !== id;
      }),
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        removeOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error('useOrders must be used inside OrdersProvider');
  }

  return context;
};
