import React from 'react';
import { useParams, Link } from 'react-router-dom';
import house from '../../images/Home.png';
import products from '../../../public/api/products.json';
import './Breadcrumbs.scss';
import classNames from 'classnames';
export const Breadcrumbs: React.FC = () => {
  const { productId } = useParams();
  const product = products.find(item => item.itemId === productId);

  return (
    <>
      <nav className="breadcrumbs">
        <Link className="breadcrumbs--link " to="/">
          <img src={house} alt="Home" />
        </Link>
        <span className="breadcrumbs--Chevron">{'>'}</span>

        <Link
          className={classNames('breadcrumbs--link', { NotActive: product })}
          to="/phones"
        >
          Phones
        </Link>
        {product && <span className="breadcrumbs--Chevron"> {'>'} </span>}

        <span className="breadcrumbs--Chevron">{product?.name}</span>
      </nav>
    </>
  );
};
