import { useCallback, useEffect } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useDispatch } from 'react-redux';
import { guitarTranslate } from '../../const';
import { addCartGuitars } from '../../store/guitars-data/action';
import { isActivePopupAddCartChange, isActivePopupAddCartSuccessChange } from '../../store/ui-state/action';
import { Guitar } from '../../types/guitar';

type PopupAddCartProps = {
  guitar: Guitar,
  classPopup: string,
}

function PopupAddCart({ guitar, classPopup }: PopupAddCartProps): JSX.Element {
  const dispatch = useDispatch();
  const onEscKeyDown = useCallback((evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      dispatch(isActivePopupAddCartChange(false));
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = classPopup === 'modal modal-for-ui-kit is-active' ? 'hidden' : 'auto';
  }, [classPopup]);

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyDown);

    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown]);

  return (
    <ReactFocusLock>
      <div className={classPopup}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={() => dispatch(isActivePopupAddCartChange(false))}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info"><img className="modal__img" src={`/img/content/${guitar.previewImg.slice(4)}`} width="67" height="137" alt="Честер bass" />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{guitar.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: SO757575</p>
                <p className="modal__product-params">{guitarTranslate[guitar.type]}, {guitar.stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitar.price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--red button--big modal__button modal__button--add" onClick={() => {
                dispatch(isActivePopupAddCartChange(false));
                dispatch(isActivePopupAddCartSuccessChange(true));
                dispatch(addCartGuitars(guitar));
              }}
              >Добавить в корзину
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => dispatch(isActivePopupAddCartChange(false))}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );

}

export default PopupAddCart;
