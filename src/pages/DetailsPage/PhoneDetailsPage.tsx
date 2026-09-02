import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { findProduct, models } from '../../utils/findProduct';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import '../../styles/index.scss';
import './PhoneDetailsPage.scss';
import classNames from 'classnames';
import BloodHeart from '../../images/Union.png';
import heartImg from '../../images/Favourites(HeartLike).png';
import { NewModels } from '../../components/NewModels';
import { Title } from '../../types/Titel';
import { colors } from '../../utils/colors';
import { useFavorites } from '../../context/FavoritesContext';
import { useOrders } from '../../context/OrdersContext';
export const PhoneDetailsPage: React.FC = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const category = parts[0];
  const productId = parts[1];
  const product = findProduct(category as keyof typeof models, productId);
  const navigate = useNavigate();
  const [firstPhoto, setFirstPhoto] = useState(product?.images[0]);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { orders, addOrder, removeOrder } = useOrders();

  useEffect(() => {
    if (product) {
      setFirstPhoto(product?.images[0]);
    }
  }, [product]);
  if (!product) {
    return <h1>Product not found</h1>;
  }

  function changeProduct(item: string) {
    if (!product) {
      return;
    }

    if (product.color === item || product.capacity === item) {
      return;
    }

    if (product.colorsAvailable.includes(item)) {
      const idParts = product.id
        .toLowerCase()
        .split(product.color.toLowerCase());

      const result = `${idParts[0]}${item}`.split(' ').join('-');

      navigate(`/${category}/${result}`);
    } else {
      const idParts = product.id
        .toLowerCase()
        .split(product.capacity.toLowerCase());

      const result = `${idParts[0]}${item}${idParts[1]}`.split(' ').join('-');

      navigate(`/${category}/${result}`);
    }
  }

  const isFavorite = favorites.some(item => item.itemId === product.id);

  const isOrder = orders.some(item => item.itemId === product.id);

  function changeFavorite() {
    if (isFavorite) {
      removeFavorite(product!.id);
    } else {
      addFavorite(product!.id);
    }
  }

  function changeOrders() {
    if (isOrder) {
      removeOrder(product!.id);
    } else {
      addOrder(product!.id);
    }
  }

  function slicing(item: string) {
    const numbers: string[] = [];
    const letters: string[] = [];

    for (const char of item) {
      if (!isNaN(Number(char))) {
        numbers.push(char);
      } else {
        letters.push(char);
      }
    }

    return `${numbers.join('')} ${letters.join('')}`;
  }

  return (
    <div className="wrapper">
      <Breadcrumbs />

      <div className="container">
        <h1 className="titel">{product.name}</h1>

        <div className="product-photo">
          {product.images.map(photo => (
            <img
              className="product-photo--item"
              key={photo}
              src={photo}
              onClick={() => setFirstPhoto(photo)}
              alt="photo-Product"
            />
          ))}
        </div>
        <div className="product-photo-first">
          <img
            className="product-photo-first--item"
            src={firstPhoto}
            alt="Foto Product"
          />
        </div>
        <div className="product">
          <div className="product__box">
            <p className="product__box--text">Available colors</p>
            <div className="product__box__colors">
              {product.colorsAvailable.map(item => (
                <div
                  key={item}
                  className={classNames('product__box__colors--item', {
                    ActiveColor: product.color === item,
                  })}
                  style={{ backgroundColor: colors[item] }}
                  onClick={() => changeProduct(item)}
                ></div>
              ))}
            </div>
          </div>
          <div className="product--line"></div>
          <div className="product__box">
            <p className="product__box--text">Select capacity</p>
            <div className="product__box__gb">
              {product.capacityAvailable.map(item => (
                <div
                  key={item}
                  className={classNames('product__box__gb--item', {
                    ActiveCapacity: product.capacity === item,
                  })}
                  onClick={() => changeProduct(item.toLocaleLowerCase())}
                >
                  {slicing(item)}
                </div>
              ))}
            </div>
          </div>
          <div className="product--line"></div>
          <div className="product__price">
            <h3 className="product__price--item">${product.priceDiscount}</h3>
            <span className="product__price--item item-old">
              ${product.priceRegular}
            </span>
          </div>
          <div className="product__info__button">
            {isOrder ? (
              <span
                className="card__info__button--item item--Added"
                onClick={changeOrders}
              >
                Added
              </span>
            ) : (
              <span
                className="card__info__button--item item--button"
                onClick={changeOrders}
              >
                Add to cart
              </span>
            )}
            <span
              className="card__info__button--item item--BloodHeart"
              onClick={changeFavorite}
            >
              <img
                className="item--image"
                src={isFavorite ? BloodHeart : heartImg}
                alt="Remove from favorites"
              />
            </span>
          </div>
          <div className="product__info">
            <div className="product__info--items">
              <span>Screen</span>
              <span>{product.screen}</span>
            </div>
            <div className="product__info--items">
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </div>
            <div className="product__info--items">
              <span>Processor</span>
              <span>{product.processor}</span>
            </div>
            <div className="product__info--items">
              <span>RAM</span>
              <span>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="info">
          <div className="info__about">
            <h2 className="info__About--titel">About</h2>
          </div>
          <div className="product--line"></div>
          {product.description.map(item => (
            <div key={item.title} className="info__text">
              <h3 className="info__text--titel">{item.title} </h3>
              <p className="info__text--paragafs">{item.text} </p>
            </div>
          ))}
        </div>
        <div className="tech">
          <div className="tech__info__about">
            <h2 className="tech__info__About--titel">Tech specs</h2>
          </div>
          <div className="product--line"></div>
          <div className="tech__info">
            <div className="tech__info--items">
              <span>Screen</span>
              <span>{product.screen}</span>
            </div>
            <div className="tech__info--items">
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </div>
            <div className="tech__info--items">
              <span>Processor</span>
              <span>{product.processor}</span>
            </div>
            <div className="tech__info--items">
              <span>RAM</span>
              <span>{product.ram}</span>
            </div>
            {product.camera && (
              <div className="tech__info--items">
                <span>camera</span>
                <span>{product.camera}</span>
              </div>
            )}
            {product.zoom && (
              <div className="tech__info--items">
                <span>zoom</span>
                <span>{product.zoom}</span>
              </div>
            )}
            <div className="tech__info--items">
              <span>cell</span>
              <span>{product.cell.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <NewModels titel={Title.YouMayAlsolike} />
      </div>
    </div>
  );
};
