import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCoupon } from '../../store/guitars-data/api-action';
import { getIsPostCoupon } from '../../store/guitars-data/selectors';
import { promoCodAdding } from '../../store/ui-state/action';
import { getPromoCod } from '../../store/ui-state/selectors';

function CouponCart(): JSX.Element {
  const promoCod = useSelector(getPromoCod);
  const isPostPromoCod = useSelector(getIsPostCoupon);
  const [inputPromoCod, setInputPromoCod] = useState('');
  const dispatch = useDispatch();
  const handlePromoInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputPromoCod(target.value);
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" method="post" action="/"
        onSubmit={(evt: FormEvent<HTMLFormElement>) => {
          evt.preventDefault();
          dispatch(promoCodAdding(inputPromoCod.toLocaleUpperCase()));
          dispatch(postCoupon(inputPromoCod));
        }}
      >
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input type="text" placeholder={promoCod} id="coupon" name="coupon"
            data-testid="coupon"
            value={inputPromoCod}
            onChange={handlePromoInput}
          />
          { isPostPromoCod === false && <p className="form-input__message form-input__message--error">неверный промокод</p>}
          { isPostPromoCod && <p className="form-input__message form-input__message--success">Промокод принят</p> }
        </div>
        <button className="button button--big coupon__button">Применить</button>
      </form >
    </div >
  );
}

export default CouponCart;
