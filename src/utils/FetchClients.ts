import { Product } from '../types/Product';

export function getProduct(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch('/api/products.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }

          return response.json();
        })
        .then(resolve)
        .catch(reject);
    }, 2000);
  });
}
