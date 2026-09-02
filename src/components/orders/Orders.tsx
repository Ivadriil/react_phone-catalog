import { Link } from 'react-router-dom';
import './Orders.scss';
import close from '../../images/Close.png';
import { useEffect, useState } from 'react';
// import { Product } from "../../types/Product";
// import { getOrders, removeOrders } from "../../utils/localStorage";
import classNames from 'classnames';
import { useOrders } from '../../context/OrdersContext';
export const Orders: React.FC = () => {
  const { orders, removeOrder } = useOrders();

  // const [orders, setorders] = useState<Product[]>(getOrders);
  const [value, setValue] = useState<Record<number, number>>({});

  function onChange(id: number, count: number) {
    setValue(prev => {
      const currentValue = prev[id] ?? 1;
      const newValue = currentValue + count;

      if (newValue < 1 || newValue > 10) {
        return prev;
      }

      return {
        ...prev,
        [id]: newValue,
      };
    });
  }

  function handleRemove(id: number) {
    removeOrder(id);
  }

  const totalPrice = orders.reduce((total, item) => {
    const counts = value[item.id] ?? 1;

    return total + counts * item.price;
  }, 0);

  useEffect(() => {}, [orders, value]);

  return (
    <div className="wrapper">
      <div className="container">
        <Link to="">{'<'} back</Link>
        <h2 className="titel">Cart</h2>
        <div className="cart">
          <div className="cart__items">
            {orders.map(item => {
              const counts = value[item.id] ?? 1;
              const itemPrice = counts * item.price;

              return (
                <div key={item.id} className="Orders">
                  <a
                    className="Orders--link"
                    onClick={() => handleRemove(item.id)}
                  >
                    <img className="Orders--link--item" src={close} />
                  </a>
                  <img className="Orders--img" src={item.image} alt="" />
                  <span className="Orders--name">{item.name}</span>
                  <div className="Orders__box">
                    <a
                      onClick={() => onChange(item.id, -1)}
                      className={classNames('Orders__box--button', {
                        isNotActive: counts === 1,
                      })}
                    >
                      -
                    </a>
                    <span className="Orders__box--item">{counts}</span>
                    <a
                      onClick={() => onChange(item.id, 1)}
                      className={classNames('Orders__box--button', {
                        isNotActive: counts === 10,
                      })}
                    >
                      +
                    </a>
                  </div>
                  <span className="Orders--price">${itemPrice}</span>
                </div>
              );
            })}
          </div>
          {totalPrice > 0 ? (
            <div className="result">
              <div className="result__titel">
                <h3 className="result__titel--item">
                  {'$'}
                  {totalPrice}
                </h3>
                <span className="result__titel__text">
                  Total for {orders.length} items
                </span>
              </div>
              <span className="result__line"></span>
              <button type="submit" className="result__button">
                Checkout
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
