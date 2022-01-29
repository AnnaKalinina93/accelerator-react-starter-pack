/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ratingMap } from '../../const';
import FormStars from '../form-stars/form-stars';
import { PostComment } from '../../types/guitar';
import { postComment } from '../../store/guitars-data/api-action';
import { getIsPostReview } from '../../store/guitars-data/selectors';


type FormReviewProps = {
  nameGuitar: string
  guitarId: number,
  formClass: string,
  onClickFormReview: (param: boolean)=> void,
}

function FormReview({nameGuitar, formClass, guitarId, onClickFormReview}:FormReviewProps): JSX.Element {
  const isPostReview = useSelector(getIsPostReview);
  const dispatch = useDispatch();

  const onEscKeyDown = useCallback((evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      onClickFormReview(false);
    }
  }, [onClickFormReview]);

  useEffect(() => {
    document.body.style.overflow = formClass === 'modal modal--review modal-for-ui-kit is-active' ? 'hidden' : 'auto';
  }, [formClass]);

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyDown);

    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown]);

  useEffect(() => {
    if( isPostReview ) {
      setFormState({
        userName: '',
        advantage: '',
        disadvantage: '',
        comment: '',
        rating: '0',
        guitarId: `${guitarId}`,
      });
      onClickFormReview(false);
    }
  },[isPostReview]);

  const postReview = (comment: PostComment) => {
    dispatch(postComment(comment));
  };

  const [formState,setFormState] = useState<{ [key: string]: string }>({
    userName: '',
    advantage: '',
    disadvantage: '',
    comment: '',
    rating: '0',
    guitarId: `${guitarId}`,
  });


  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const isDisabled =
  formState.userName === ''|| formState.rating === '0' || formState.advantage === '' || formState.disadvantage === '';
  return (
    <div className={formClass}>
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal
          onClick={()=>onClickFormReview(false)}
        >
        </div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">
            Оставить отзыв
          </h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">
            {nameGuitar}
          </h3>
          <form className="form-review"
            onSubmit={(evt: FormEvent<HTMLFormElement>) => {
              evt.preventDefault();
              const comment = {
                userName: formState.userName,
                advantage: formState.advantage,
                disadvantage: formState.disadvantage,
                comment: formState.comment,
                rating: Number(formState.rating),
                guitarId: Number(formState.guitarId),
              };
              postReview(comment);
            }}
          >
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label
                  className="form-review__label form-review__label--required"
                  htmlFor="user-name"
                >
                  Ваше Имя
                </label>
                <input
                  className="form-review__input form-review__input--name"
                  id="user-name"
                  type="text"
                  name="userName"
                  data-testid="userName"
                  value={formState.userName}
                  autoComplete="off"
                  onChange={handleChange}
                />
                {formState.userName === '' && <span className="form-review__warning">Заполните поле</span>}
              </div>
              <div>
                <span className="form-review__label form-review__label--required">
                  Ваша Оценка
                </span>
                <div className="rate rate--reverse">
                  {Object.entries(ratingMap)
                    .reverse()
                    .map(([key, title]) => (
                      <FormStars
                        key={key}
                        count={key}
                        title={title}
                        value={formState.rating}
                        onStartChange={handleChange}
                      />
                    ))}
                  <span className="rate__count"></span>
                  {formState.rating === '0' && <span className="rate__message">Поставьте оценку</span>}
                </div>
              </div>
            </div>
            <label className="form-review__label form-review__label--required" htmlFor="user-name" >
              Достоинства
            </label>
            <input
              className="form-review__input"
              id="pros"
              type="text"
              name="advantage"
              data-testid="advantage"
              value={formState.advantage}
              autoComplete="off"
              onChange={handleChange}
            />
            {formState.advantage === '' && <span className="form-review__warning">Заполните поле</span>}
            <label className="form-review__label form-review__label--required" htmlFor="user-name">
              Недостатки
            </label>
            <input
              className="form-review__input"
              id="user-name"
              type="text"
              name="disadvantage"
              data-testid="disadvantage"
              value={formState.disadvantage}
              autoComplete="off"
              onChange={handleChange}
            />
            {formState.disadvantage === '' && <span className="form-review__warning">Заполните поле</span>}
            <label className="form-review__label" htmlFor="user-name">
              Комментарий
            </label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="user-name"
              rows={10}
              name="comment"
              data-testid="comment"
              value={formState.comment}
              autoComplete="off"
              onChange={handleChange}
            >
            </textarea>
            {formState.comment === '' && <span className="form-review__warning">Заполните поле</span>}
            <button
              className="button button--medium-20 form-review__button"
              type="submit"
              disabled={isDisabled}
            >
              Отправить отзыв
            </button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={()=>onClickFormReview(false)}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormReview;
