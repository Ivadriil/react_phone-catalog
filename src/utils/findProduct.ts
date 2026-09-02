import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import { ProductDetails } from '../types/ProductDetails';

interface Models {
  phones: ProductDetails[];
  tablets: ProductDetails[];
  accessories: ProductDetails[];
}

export const models: Models = {
  phones: phones as ProductDetails[],
  tablets: tablets as ProductDetails[],
  accessories: accessories as ProductDetails[],
};

type Category = keyof typeof models;

export function findProduct(
  category: string,
  productId: string,
): ProductDetails | undefined {
  const products = models[category as Category];

  if (!products) {
    return undefined;
  }

  return products.find(item => item.id === productId);
}
