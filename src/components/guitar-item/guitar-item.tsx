/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { Guitar } from '../../types/guitar';
import RatingPanel from '../rating-panel/rating-panel';
import { isGuitarInCart } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getCartGuitarsWithCount } from '../../store/guitars-data/selectors';
import { redirectToRoute } from '../../store/middlewares/action';
import { AppRoute } from '../../const';
import { isActivePopupAddCartChange } from '../../store/ui-state/action';

type GuitarItemProps = {
  guitar: Guitar,
  onClickAddToCart: (guitar: Guitar) => void,
}

function GuitarItem({ guitar, onClickAddToCart }: GuitarItemProps): JSX.Element {
  const { name, previewImg, rating, price, comments } = guitar;
  const guitarsMap = useSelector(getCartGuitarsWithCount);
  const dispatch = useDispatch();

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
        {!isGuitarInCart(guitar, guitarsMap) && (
          <a
            className="button button--red button--mini button--add-to-cart"
            onClick={() => {
              onClickAddToCart(guitar);
              dispatch(isActivePopupAddCartChange(true));}}
            data-testid="Купить"
          >
            Купить
          </a>)}
        {isGuitarInCart(guitar, guitarsMap) && (
          <button className="button button--red-border button--mini button--in-cart" onClick={() => dispatch(redirectToRoute(AppRoute.Cart))}>В Корзине</button>)}
      </div>
    </div>
  );
}

export default GuitarItem;
