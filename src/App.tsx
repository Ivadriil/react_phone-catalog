import { Link, Outlet } from 'react-router-dom';
import './App.scss';
import './styles/main.scss';
import './styles/footer.scss';
import { Navigations } from './components/Navigations/Navigations';
import { useEffect, useState } from 'react';
import './styles/header.scss';
import classNames from 'classnames';
import { getProduct } from './utils/FetchClients';
import { Product } from './types/Product';
import { Loader } from './components/Loader/Loader';
import { FavoritesProvider } from './context/FavoritesContext';
import { OrdersProvider } from './context/OrdersContext';

export const App = () => {
  const [newProduct, setNewProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hangelChangeBurger = (item: boolean) => {
    if (isOpen === false) {
      return setIsOpen(item);
    }

    return setIsOpen(false);
  };

  useEffect(() => {
    getProduct()
      .then(setNewProduct)
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <FavoritesProvider products={newProduct}>
        <OrdersProvider products={newProduct}>
          <header className="header">
            <div className="header__logo">
              <a className="header__logo__link" href="/">
                <img
                  className="header__logo__link--item"
                  src="/src/images/Logo.png"
                  alt="LogoSticker"
                />
              </a>
            </div>
            <div className="header__navigation">
              <Navigations />
            </div>
            <a
              onClick={() => hangelChangeBurger(true)}
              className={classNames(
                '',
                { 'header__burge-menu--item': isOpen === false },
                { 'burger-menu--active': isOpen === true },
              )}
            ></a>
          </header>

          <div
            className={classNames(
              'mobile-menu',

              { 'mobile-men--active': isOpen === true },
            )}
          >
            <Navigations />
          </div>

          <main>
            <div>{loading ? <Loader /> : <Outlet />}</div>
          </main>
          <footer className="footer">
            <div className="header__logo">
              <a className="header__logo__link" href="/">
                <img
                  className="header__logo__link--item"
                  src="/src/images/Logo.png"
                  alt="LogoSticker"
                />
              </a>
            </div>
            <ul className="footer__list">
              <li className="footer__list__item">
                <Link to="/Github" className="footer__list__item--link">
                  Github
                </Link>
              </li>
              <li className="footer__list__item">
                <Link className="footer__list__item--link" to="/Contacts">
                  Contacts
                </Link>
              </li>
              <li className="footer__list__item">
                <Link to="/rights" className="footer__list__item--link">
                  rights
                </Link>
              </li>
            </ul>
            <div className="footer__back">
              <a
                className="footer__back--link"
                onClick={e => {
                  e.preventDefault();

                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                Back to top <span className="footer__back--link--arrow">^</span>
              </a>
            </div>
          </footer>
        </OrdersProvider>
      </FavoritesProvider>
    </>
  );
};
