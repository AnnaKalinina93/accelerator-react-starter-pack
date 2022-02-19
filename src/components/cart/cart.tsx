import Footer from '../footer/footer';
import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { useSelector } from 'react-redux';
import { getCartGuitarsWithCount, getDiscount } from '../../store/guitars-data/selectors';
import CartItem from '../cart-item/cart-item';
import CouponCart from '../coupon-cart/coupon-cart';
import { getDiscountFromPrice, getTotalPrice } from '../../utils';
import { useState } from 'react';
import { Guitar } from '../../types/guitar';
import './cart.css';
import cn from 'classnames';
import PopupDeleteGuitars from '../popup-delete-guitars/popup-delete-guitars';

function Cart(): JSX.Element {
  const guitarsMap = useSelector(getCartGuitarsWithCount);
  const discount = useSelector(getDiscount);
  const [selectGuitar, setSelectGuitar] = useState<Guitar[] | null>( null);

  document.body.style.overflow = 'auto';

  const totalPrice = getTotalPrice(guitarsMap);
  const discountFromPrice = getDiscountFromPrice( totalPrice, discount);

  const handleDeleteClick = (guitars: Guitar[]) => {
    setSelectGuitar(guitars);
  };
  const discountClass = cn('cart__total-value cart__total-value--bonus', {'is-disactive': discountFromPrice === 0});

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <Breadcrumbs />
          <div className="cart">
            {[...guitarsMap.entries()].map(([id, guitars])=> <CartItem key={id} guitars={guitars} onDeleteClick={handleDeleteClick}/>)}
            <div className="cart__footer">
              <CouponCart/>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalPrice} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className={discountClass}>- {discountFromPrice} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{totalPrice-discountFromPrice} ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
          {selectGuitar !== null && <PopupDeleteGuitars guitars={selectGuitar}/>}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
