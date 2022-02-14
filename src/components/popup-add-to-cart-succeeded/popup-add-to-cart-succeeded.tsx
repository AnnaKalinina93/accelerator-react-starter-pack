import { useCallback, useEffect } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useDispatch } from 'react-redux';
import { AppRoute } from '../../const';
import { redirectToRoute } from '../../store/middlewares/action';
import { isActivePopupAddCartSuccessChange } from '../../store/ui-state/action';

type PopupAddToCartSucceeded = {
  classSucceeded: string,
}

function PopupAddToCartSucceeded({ classSucceeded }: PopupAddToCartSucceeded): JSX.Element {
  const dispatch = useDispatch();
  const onEscKeyDown = useCallback((evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      dispatch(isActivePopupAddCartSuccessChange(false));
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = classSucceeded === 'modal modal--success modal-for-ui-kit is-active' ? 'hidden' : 'auto';
  }, [classSucceeded]);

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyDown);

    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown]);

  return (
    <ReactFocusLock>
      <div className={classSucceeded}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={() => dispatch(isActivePopupAddCartSuccessChange(false))}></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button className="button button--small modal__button" onClick={() => {
                dispatch(isActivePopupAddCartSuccessChange(false));
                dispatch(redirectToRoute(AppRoute.Cart));
              }}
              >
                Перейти в корзину
              </button>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={() => {
                dispatch(isActivePopupAddCartSuccessChange(false));
                dispatch(redirectToRoute(AppRoute.Main));
              }}
              >
                Продолжить покупки
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => dispatch(isActivePopupAddCartSuccessChange(false))}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );

}

export default PopupAddToCartSucceeded;
