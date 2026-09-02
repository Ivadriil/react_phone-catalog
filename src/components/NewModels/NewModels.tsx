import React, { useEffect, useState } from 'react';
import products from '../../../public/api/products.json';

import './NewModels.scss';
import { ProductCard } from '../ProductCard/index';
import cn from 'classnames';
import { Title } from '../../types/Titel';
import '../../styles/titel.scss';
import { Product } from '../../types/Product';
type Props = {
  titel: Title;
};
export const NewModels: React.FC<Props> = ({ titel }) => {
  let newProduct: Product[] = [];

  if (titel === Title.NewModels) {
    newProduct = [...products]
      .filter(product => product.year === 2022 && product.capacity === '128GB')
      .sort((a, b) => b.itemId.localeCompare(a.itemId));
  } else {
    newProduct = [...products].sort((a, b) => b.itemId.localeCompare(a.itemId));
  }

  const [productCard, setProductCard] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1.5);
  const newPruductArray = newProduct.slice(
    productCard,
    productCard + visibleCards,
  );

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1.5);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2.5);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();

    window.addEventListener('resize', updateVisibleCards);

    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const handlePageChange = (count: number) => {
    if (
      productCard + count >= 0 &&
      productCard + count <= newProduct.length - visibleCards
    ) {
      return setProductCard(productCard + count);
    }

    return;
  };

  return (
    <>
      <div className="titel">
        <h2 className="titel--text">{titel}</h2>
        <div className="titel__chevron">
          <div
            className={cn('titel__chevron--item ', {
              active: productCard !== 0,
            })}
          >
            <a
              className={cn('titel__chevron--item--link ', {
                disabled: productCard === 0,
              })}
              onClick={() => handlePageChange(-1)}
            >
              {'<'}
            </a>
          </div>
          <div
            className={cn('titel__chevron--item ', {
              active: productCard !== newProduct.length - visibleCards,
            })}
          >
            <a
              className={cn('titel__chevron--item--link ', {
                disabled: productCard === newProduct.length - visibleCards,
              })}
              onClick={() => handlePageChange(1)}
            >
              {'>'}
            </a>
          </div>
        </div>
      </div>

      {newPruductArray.map(product => (
        <ProductCard titel={titel} key={product.itemId} product={product} />
      ))}
    </>
  );
};
