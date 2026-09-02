import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigations.scss';
import { useFavorites } from '../../context/FavoritesContext';
import { useOrders } from '../../context/OrdersContext';
export const Navigations: React.FC = () => {
  const { favorites } = useFavorites();

  const { orders } = useOrders();

  useEffect(() => {}, [favorites, orders]);

  return (
    <nav className="navigation burge-menu__navigation">
      <ul className="navigation__list">
        <li className="navigation__list__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__list__item--link ${isActive ? 'navigation__list__item--link--active' : ''}`
            }
          >
            Home
          </NavLink>
        </li>
        <li className="navigation__list__item">
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `navigation__list__item--link ${isActive ? 'navigation__list__item--link--active' : ''}`
            }
          >
            Phones
          </NavLink>
        </li>
        <li className="navigation__list__item">
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              `navigation__list__item--link ${isActive ? 'navigation__list__item--link--active' : ''}`
            }
          >
            tablets
          </NavLink>
        </li>
        <li className="navigation__list__item">
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `navigation__list__item--link ${isActive ? 'navigation__list__item--link--active' : ''}`
            }
          >
            accessories
          </NavLink>
        </li>
      </ul>
      <div className="shopping-bag">
        <NavLink to="/favorits" className="shopping-bag__link">
          <img
            src="/src/images/Favourites(HeartLike).png"
            alt="(HeartLike)"
            className="shopping-bag__link--item"
          />
          {favorites.length > 0 && (
            <div className="shopping-bag__link--count">{favorites.length}</div>
          )}
        </NavLink>
        <NavLink className="shopping-bag__link" to="/orders">
          <img
            src="/src/images/Shopping-Bag(Cart).png"
            alt="(Order)"
            className="shopping-bag__link--item"
          />
          {orders.length > 0 && (
            <div className="shopping-bag__link--count">{orders.length}</div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
