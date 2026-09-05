import { Link } from 'react-router-dom';
import './Orders.scss';
import close from '../../images/Close.png';
import { useState } from 'react';
import classNames from 'classnames';
import { useOrders } from '../../context/OrdersContext';
import { useProducts } from '../../context/ProductsContext';
export const Orders: React.FC = () => {
  const { orders, removeOrder, clearOrders } = useOrders();
  const { products } = useProducts();
  const orderedProducts = products.filter(product =>
    orders.includes(product.itemId),
  );

  const [value, setValue] = useState<Record<string, number>>({});

  function onChange(itemId: string, count: number) {
    setValue(prev => {
      const currentValue = prev[itemId] ?? 1;
      const newValue = currentValue + count;

      if (newValue < 1 || newValue > 10) {
        return prev;
      }

      return {
        ...prev,
        [itemId]: newValue,
      };
    });
  }

  function handleRemove(itemId: string) {
    removeOrder(itemId);
  }

  const totalPrice = orderedProducts.reduce((total, item) => {
    const counts = value[item.itemId] ?? 1;

    return total + counts * item.price;
  }, 0);

  function handleCheckout() {
    const shouldPay = window.confirm(
      `Pay $${totalPrice} for ${orderedProducts.length} item(s)?`,
    );

    if (shouldPay) {
      clearOrders();
      window.alert('Payment completed. Thank you for your order!');
    }
  }

  return (
    <div className="wrapper">
      <div className="container">
        <Link to="">{'<'} back</Link>
        <h2 className="titel">Cart</h2>
        <div className="cart">
          <div className="cart__items">
            {orderedProducts.map(item => {
              const counts = value[item.itemId] ?? 1;
              const itemPrice = counts * item.price;

              return (
                <div key={item.id} className="Orders">
                  <button
                    type="button"
                    className="Orders--link"
                    onClick={() => handleRemove(item.itemId)}
                  >
                    <img
                      className="Orders--link--item"
                      src={close}
                      alt="Remove item"
                    />
                  </button>
                  <img className="Orders--img" src={item.image} alt="" />
                  <span className="Orders--name">{item.name}</span>
                  <div className="Orders__box">
                    <button
                      type="button"
                      disabled={counts === 1}
                      onClick={() => onChange(item.itemId, -1)}
                      className={classNames('Orders__box--button', {
                        isNotActive: counts === 1,
                      })}
                    >
                      -
                    </button>
                    <span className="Orders__box--item">{counts}</span>
                    <button
                      type="button"
                      disabled={counts === 10}
                      onClick={() => onChange(item.itemId, 1)}
                      className={classNames('Orders__box--button', {
                        isNotActive: counts === 10,
                      })}
                    >
                      +
                    </button>
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
                  Total for {orderedProducts.length} items
                </span>
              </div>
              <span className="result__line"></span>
              <button
                type="button"
                className="result__button"
                onClick={handleCheckout}
              >
                Pay ${totalPrice}
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
