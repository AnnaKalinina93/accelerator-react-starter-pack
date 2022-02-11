import { Guitar } from '../../types/guitar';
import GuitarItem from '../guitar-item/guitar-item';
import LoadingScreen from '../loading-screen/loading-screen';
import GuitarsErrorScreen from '../guitars-error-screen/guitars-error-screen';
import {
  getGuitarsError,
  getGuitarsLoading
} from '../../store/guitars-data/selectors';
import { useSelector } from 'react-redux';
import PopupAddCart from '../popup-add-cart/popup-add-cart';
import PopupAddToCartSucceeded from '../popup-add-to-cart-succeeded/popup-add-to-cart-succeeded';
import { getIsActivePopupAddCart, getIsActivePopupAddCartSuccess } from '../../store/ui-state/selectors';
import cn from 'classnames';
import { useState } from 'react';

type GuitarsListProps = {
  guitars: Guitar[],
}
function GuitarsList({ guitars }: GuitarsListProps): JSX.Element {
  const guitarsLoading = useSelector(getGuitarsLoading);
  const guitarsError = useSelector(getGuitarsError);
  const isActivePopupAddCart = useSelector(getIsActivePopupAddCart);
  const isActivePopupAddCartSuccess = useSelector(getIsActivePopupAddCartSuccess);
  const [selectGuitar, setSelectGuitar] = useState<Guitar | null>(null);

  const classPopupAddCart = cn('modal modal-for-ui-kit', { 'is-active': isActivePopupAddCart });
  const classPopupAddCartSucceeded = cn('modal modal--success modal-for-ui-kit', { 'is-active': isActivePopupAddCartSuccess });

  const handleClickAddToCard = (guitar: Guitar) => {
    setSelectGuitar(guitar);
  };

  if (guitarsLoading) {
    return <LoadingScreen />;
  }

  if (!guitarsLoading && guitarsError) {
    return <GuitarsErrorScreen />;
  }

  return (
    <div className="cards catalog__cards">
      {guitars?.map((guitar) => (
        <GuitarItem key={`${guitar.id}-${guitar.vendorCode}`} guitar={guitar} onClickAddToCart={handleClickAddToCard}/>
      ))}
      {selectGuitar !== null && <PopupAddCart guitar={selectGuitar} classPopup={classPopupAddCart} />}
      <PopupAddToCartSucceeded classSucceeded={classPopupAddCartSucceeded} />
    </div>
  );
}

export default GuitarsList;
