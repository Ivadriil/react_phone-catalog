import { useEffect, useReducer } from 'react';

type Action =
  | { type: 'add'; itemId: string }
  | { type: 'remove'; itemId: string }
  | { type: 'clear' };

const reducer = (itemIds: string[], action: Action): string[] => {
  if (action.type === 'add') {
    return itemIds.includes(action.itemId)
      ? itemIds
      : [...itemIds, action.itemId];
  }

  if (action.type === 'clear') {
    return [];
  }

  return itemIds.filter(itemId => itemId !== action.itemId);
};

const getStoredIds = (storageKey: string): string[] => {
  try {
    const value = localStorage.getItem(storageKey);
    const parsedValue: unknown = value && JSON.parse(value);

    return Array.isArray(parsedValue) &&
      parsedValue.every(id => typeof id === 'string')
      ? parsedValue
      : [];
  } catch {
    return [];
  }
};

export const useItemIds = (storageKey: string) => {
  const [itemIds, dispatch] = useReducer(reducer, storageKey, getStoredIds);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(itemIds));
  }, [itemIds, storageKey]);

  return {
    itemIds,
    addItem: (itemId: string) => dispatch({ type: 'add', itemId }),
    removeItem: (itemId: string) => dispatch({ type: 'remove', itemId }),
    clearItems: () => dispatch({ type: 'clear' }),
  };
};
