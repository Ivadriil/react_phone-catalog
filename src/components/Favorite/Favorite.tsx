import { Breadcrumbs } from '../Breadcrumbs';
import { ProductCard } from '../ProductCard';
import { Title } from '../../types/Titel';
import './Favorite.scss';
import { useFavorites } from '../../context/FavoritesContext';
export const Favorite: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="wrapper">
      <div className="container">
        <Breadcrumbs />
        <div className="titel">
          <h3 className="titel--item">Favourites</h3>
          <p className="titel--text">{favorites.length} items</p>
        </div>
        {favorites.map(item => (
          <ProductCard titel={Title.Space} key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};
