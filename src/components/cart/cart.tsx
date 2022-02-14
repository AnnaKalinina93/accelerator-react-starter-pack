import Footer from '../footer/footer';
import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { useSelector } from 'react-redux';
import { getCartGuitarsWithCount } from '../../store/guitars-data/selectors';
import CartItem from '../cart-item/cart-item';
import CouponCart from '../coupon-cart/coupon-cart';
import { getTotalPrice } from '../../utils';
import PopupDeleteGuitars from '../popup-delete-guitars/popup-delete-guitars';
import { useState } from 'react';
import { Guitar } from '../../types/guitar';

function Cart(): JSX.Element {
  const guitarsMap = useSelector(getCartGuitarsWithCount);
  const [selectGuitar, setSelectGuitar] = useState<Guitar | null>( null);
  document.body.style.overflow = 'auto';
  const totalPrice = getTotalPrice(guitarsMap);
  const bonus = 0;
  const handleDeleteClick = (guitar: Guitar) => {
    setSelectGuitar(guitar);
  };

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
              <CouponCart />
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalPrice} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">{bonus} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{totalPrice-bonus} ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
          {selectGuitar !== null && <PopupDeleteGuitars guitar={selectGuitar}/>}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
