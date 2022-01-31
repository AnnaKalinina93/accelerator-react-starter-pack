/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { Guitar } from '../../types/guitar';
import RatingPanel from '../rating-panel/rating-panel';

type GuitarItemProps = {
  guitar: Guitar
}

function GuitarItem({ guitar }: GuitarItemProps): JSX.Element {
  const { name, previewImg, rating, price, comments } = guitar;

  return (
    <div className="product-card">
      <img
        src={`img/content/${previewImg.slice(4)}`}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <RatingPanel count={comments.length} rating={rating} />
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link to={`/product/${guitar.id}`} className="button button--mini">
          Подробнее
        </Link>
        <a
          className="button button--red button--mini button--add-to-cart"
          href="#"
        >
          Купить
        </a>
      </div>
    </div>
  );
}

export default GuitarItem;
