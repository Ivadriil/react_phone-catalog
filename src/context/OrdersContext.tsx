import { createContext, useContext } from 'react';
import { useItemIds } from '../hooks/useItemIds';

type OrdersContextType = {
  orders: string[];
  addOrder: (itemId: string) => void;
  removeOrder: (itemId: string) => void;
  clearOrders: () => void;
};
const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    itemIds: orders,
    addItem,
    removeItem,
    clearItems,
  } = useItemIds('orders');

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder: addItem,
        removeOrder: removeItem,
        clearOrders: clearItems,
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
