import { Link } from 'react-router-dom';
import heartImg from '../../images/Favourites(HeartLike).png';
import type { Product } from '../../types/Product';
import './ProductCard.scss';
import { Title } from '../../types/Titel';
import BloodHeart from '../../images/Union.png';
// import { addFavorite, addOrders, getOrders, removeFavorite, removeOrders } from "../../utils/localStorage";
import { useFavorites } from '../../context/FavoritesContext';
import { useOrders } from '../../context/OrdersContext';
type Props = {
  product: Product;
  titel: Title;
};
export const ProductCard: React.FC<Props> = ({ product, titel }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { orders, addOrder, removeOrder } = useOrders();

  const isFavorite = favorites.some(item => item.id === product.id);
  const isOrder = orders.some(item => item.id === product.id);

  function changeFavorite() {
    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  }

  function changeOrders() {
    if (isOrder) {
      removeOrder(product.id);
    } else {
      addOrder(product.id);
    }
  }

  return (
    <div className="card" key={product.id}>
      {titel === Title.Space ? (
        <Link to={product.itemId} className="card__link container__card-photo">
          <img
            className="card-photo"
            src={product.image}
            alt="NewModaliPhone"
          />
          <h3 className="card__link--items">{product.name}</h3>
        </Link>
      ) : (
        <Link
          to={`${product.category}/${product.itemId}`}
          className="card__link container__card-photo"
        >
          <img
            className="card-photo"
            src={product.image}
            alt="NewModaliPhone"
          />
          <h3 className="card__link--items">{product.name}</h3>
        </Link>
      )}

      <div className="card__price">
        <span className="card__price--item ">${product.price}</span>
        {titel !== Title.NewModels && (
          <span className="card__price--item item-old">
            ${product.fullPrice}{' '}
          </span>
        )}
      </div>

      <div className="card--line section--line"></div>
      <div className="card__info">
        <div className="card__info--items">
          <span>Screen</span>
          <span>{product.screen}</span>
        </div>
        <div className="card__info--items">
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </div>
        <div className="card__info--items">
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>
      <div className="card__info__button">
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
    </div>
  );
};
