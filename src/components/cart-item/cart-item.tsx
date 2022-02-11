import { guitarTranslate } from '../../const';
import { Guitar } from '../../types/guitar';

type CartItemProps = {
  guitars: Guitar[],
}

function CartItem({ guitars }: CartItemProps): JSX.Element {
  const totalPrice = guitars[0].price*guitars.length;

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image"><img src="img/content/guitar-2.jpg" width="55" height="130" alt="ЭлектроГитара Честер bass" />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitars[0].name}</p>
        <p className="product-info__info">Артикул: {guitars[0].vendorCode}</p>
        <p className="product-info__info">{guitarTranslate[guitars[0].type]}, {guitars[0].stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{guitars[0].price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder={String(guitars.length)} id="2-count" name="2-count" max="99" />
        <button className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{totalPrice} ₽</div>
    </div>
  );

}

export default CartItem;
