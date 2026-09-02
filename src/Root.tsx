import {
  Navigate,
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from './App';
import { HomePapge } from './pages/HomePapge';
import { PageProduct } from './pages/PageProduct';
import { Favorite } from './components/Favorite/Favorite';
import './styles/index.scss';
import products from '../public/api/products.json';
import { Product } from './types/Product';
import { ProductTitle } from './types/ProductTitel';
import { PhoneDetailsPage } from '../src/pages/DetailsPage/PhoneDetailsPage';
import { Orders } from './components/orders/Orders';
const newPhone: Product[] = products.filter(item => item.category === 'phones');
const newTablets: Product[] = products.filter(
  item => item.category === 'tablets',
);
const newAccessories: Product[] = products.filter(
  item => item.category === 'accessories',
);

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePapge />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones">
          <Route
            index
            element={
              <PageProduct titel={ProductTitle.phone} products={newPhone} />
            }
          />
          <Route path=":productId?" element={<PhoneDetailsPage />} />
        </Route>
        <Route path="tablets">
          <Route
            index
            element={
              <PageProduct titel={ProductTitle.tablet} products={newTablets} />
            }
          />
          <Route path=":productId?" element={<PhoneDetailsPage />} />
        </Route>
        <Route path="accessories">
          <Route
            index
            element={
              <PageProduct
                titel={ProductTitle.accessories}
                products={newAccessories}
              />
            }
          />
          <Route path=":productId?" element={<PhoneDetailsPage />} />
        </Route>
        <Route path="favorits">
          <Route index element={<Favorite />} />
          <Route path=":productId?" element={<PhoneDetailsPage />} />
        </Route>
        <Route path="orders">
          <Route index element={<Orders />} />
          <Route path=":productId?" element={<PhoneDetailsPage />} />
        </Route>

        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);
