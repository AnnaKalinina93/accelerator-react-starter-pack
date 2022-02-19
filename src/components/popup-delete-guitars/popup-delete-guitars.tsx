import ReactFocusLock from 'react-focus-lock';
import { useDispatch, useSelector } from 'react-redux';
import { guitarTranslate } from '../../const';
import { getIsActivePopupDeleteGuitarCart } from '../../store/ui-state/selectors';
import { Guitar } from '../../types/guitar';
import cn from 'classnames';
import { useCallback, useEffect } from 'react';
import { isActivePopupDeleteGuitarCartChange } from '../../store/ui-state/action';
import { removalAllGuitars } from '../../store/guitars-data/action';

type PopupDeleteGuitarsProps = {
  guitars: Guitar[],
}
function PopupDeleteGuitars({ guitars }: PopupDeleteGuitarsProps): JSX.Element {
  const isActivePopupDeleteGuitarCart = useSelector(getIsActivePopupDeleteGuitarCart);

  const dispatch = useDispatch();
  const onEscKeyDown = useCallback((evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      dispatch(isActivePopupDeleteGuitarCartChange(false));
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = isActivePopupDeleteGuitarCart ? 'hidden' : 'auto';
  }, [isActivePopupDeleteGuitarCart]);

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyDown);

    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown]);

  const deleteClass = cn('modal modal-for-ui-kit', { 'is-active': isActivePopupDeleteGuitarCart });

  const handleDeleteButton = () => {
    dispatch(removalAllGuitars(guitars));
    dispatch(isActivePopupDeleteGuitarCartChange(false));
  };

  const handleContinueButton = () => {
    dispatch(isActivePopupDeleteGuitarCartChange(false));
  };

  return (
    <ReactFocusLock>
      <div className={deleteClass}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info"><img className="modal__img" src={`/img/content/${guitars[0].previewImg.slice(4)}`} width="67" height="137" alt={guitars[0].name} />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{guitars[0].name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitars[0].vendorCode}</p>
                <p className="modal__product-params">{guitarTranslate[guitars[0].type]}, {guitars[0].stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitars[0].price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--small modal__button"
                onClick={handleDeleteButton}
              >Удалить товар
              </button>
              <button className="button button--black-border button--small modal__button modal__button--right"
                onClick={handleContinueButton}
              >
                Продолжить покупки
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
              onClick={handleContinueButton}
            ><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}
export default PopupDeleteGuitars;
