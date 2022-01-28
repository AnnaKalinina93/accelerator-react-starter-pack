import { useDispatch, useSelector } from 'react-redux';
import { getIsPostReview } from '../../store/guitars-data/selectors';
import cn from 'classnames';
import { postReviewReset } from '../../store/guitars-data/action';
import { useCallback, useEffect } from 'react';

function PopupThanks(): JSX.Element {

  const isPostReview = useSelector(getIsPostReview);
  const dispatch = useDispatch();
  const onEscKeyDown = useCallback((evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      dispatch(postReviewReset());
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = isPostReview ? 'hidden' : 'auto';
  }, [isPostReview]);

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyDown);

    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown]);

  const popupClass = cn('modal modal--success modal-for-ui-kit',{'is-active': isPostReview});
  const handleReviewReset = () => {
    dispatch(postReviewReset());
  };

  return (
    <div className={popupClass}>
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal
          onClick={handleReviewReset}
        >
        </div>
        <div className="modal__content">
          <svg
            className="modal__icon"
            width="26"
            height="20"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Спасибо за ваш отзыв!</p>
          <div className="modal__button-container modal__button-container--review">
            <button className="button button--small modal__button modal__button--review"
              onClick={handleReviewReset}
            >
              К покупкам!
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleReviewReset}
            data-testid="Закрыть"
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupThanks;
