import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { guitarTranslate } from '../../const';
import { addCartGuitars, countCartGuitarsChange, removalCartGuitars } from '../../store/guitars-data/action';
import { isActivePopupDeleteGuitarCartChange } from '../../store/ui-state/action';
import { Guitar } from '../../types/guitar';
import { ChangeEvent, useState } from 'react';

type CartItemProps = {
  guitars: Guitar[],
  onDeleteClick: (guitar: Guitar) => void,
}

function CartItem({ guitars, onDeleteClick }: CartItemProps): JSX.Element {
  const [inputCount, setInputCount] = useState('');
  const dispatch = useDispatch();
  const totalPrice = guitars[0].price*guitars.length;
  const debouncedCountChange = useDebouncedCallback((value) => {
    if (value && Number(value) <= 99){
      setInputCount(value);
      dispatch(countCartGuitarsChange(guitars[0], Number(value)));
    }
    if (Number(value) > 99) {
      setInputCount('99');
      dispatch(countCartGuitarsChange(guitars[0], 99));
    }
    if (Number(value) < 1) {
      setInputCount('1');
      dispatch(countCartGuitarsChange(guitars[0], 1));
    }
  }, 500);
  const handleDeleteClick = () => {
    onDeleteClick(guitars[0]);
    dispatch(isActivePopupDeleteGuitarCartChange(true));
  };

  const handleDecreaseClick = () => {
    if (guitars.length > 1) {
      dispatch(removalCartGuitars(guitars[0]));
    } else {
      onDeleteClick(guitars[0]);
      dispatch(isActivePopupDeleteGuitarCartChange(true));
    }
  };

  const handleIncreaseClick = () => {
    dispatch(addCartGuitars(guitars[0]));
  };

  const handleChangeCount = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputCount(target.value);
    debouncedCountChange(target.value);
  };


  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"
        onClick={handleDeleteClick}
      ><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image"><img src={`img/content/${guitars[0].previewImg.slice(4)}`} width="55" height="130" alt={guitars[0].name} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitars[0].name}</p>
        <p className="product-info__info">Артикул: {guitars[0].vendorCode}</p>
        <p className="product-info__info">{guitarTranslate[guitars[0].type]}, {guitars[0].stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{guitars[0].price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество"
          data-testid="Уменьшить количество"
          onClick={handleDecreaseClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder={String(guitars.length)} id="2-count" name="2-count" min="0" max="99"
          value={inputCount}
          onChange={handleChangeCount}
        />
        <button className="quantity__button" aria-label="Увеличить количество"
          data-testid="Увеличить количество"
          onClick={handleIncreaseClick}
        >
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
