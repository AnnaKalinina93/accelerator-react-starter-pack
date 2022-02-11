/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Header from '../header/header';
import Footer from '../footer/footer';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchGuitarAction } from '../../store/guitars-data/api-action';
import {
  getGuitar,
  getGuitarError,
  getGuitarLoading
} from '../../store/guitars-data/selectors';
import ReviewsList from '../reviews-list/reviews-list';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import LoadingScreen from '../loading-screen/loading-screen';
import { activeTabs, guitarTranslate } from '../../const';
import cn from 'classnames';
import FormReview from '../form-review/form-review';
import PopupThanks from '../popup-thanks/popup-thanks';
import GuitarsErrorScreen from '../guitars-error-screen/guitars-error-screen';
import RatingPanel from '../rating-panel/rating-panel';
import PopupAddCart from '../popup-add-cart/popup-add-cart';
import PopupAddToCartSucceeded from '../popup-add-to-cart-succeeded/popup-add-to-cart-succeeded';
import { getIsActivePopupAddCart, getIsActivePopupAddCartSuccess } from '../../store/ui-state/selectors';
import { isActivePopupAddCartChange } from '../../store/ui-state/action';

type ParamTypes = {
  id: string
}

function Product(): JSX.Element {
  const { id }: ParamTypes = useParams();
  const guitar = useSelector(getGuitar);
  const guitarLoading = useSelector(getGuitarLoading);
  const guitarError = useSelector(getGuitarError);
  const isActivePopupAddCart = useSelector(getIsActivePopupAddCart);
  const isActivePopupAddCartSuccess = useSelector(getIsActivePopupAddCartSuccess);
  const [tabsState, setTabsState] = useState(activeTabs.characteristics);
  const [formReviewState, setFormReviewState] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGuitarAction(id));
  }, [id]);

  const handleChangeTabs = () => {
    if (tabsState === activeTabs.characteristics) {
      setTabsState(activeTabs.description);
    } else {
      setTabsState(activeTabs.characteristics);
    }
  };

  const handleClickFormReview = (param: boolean) => {
    setFormReviewState(param);
  };

  const characteristicsClass = cn('button button--medium tabs__button', { 'button--black-border': tabsState === activeTabs.description });
  const characteristicsTableClass = cn('tabs__table', { hidden: tabsState === activeTabs.description });
  const descriptionClass = cn('button button--medium tabs__button', { 'button--black-border': tabsState === activeTabs.characteristics });
  const descriptionParagraphClass = cn('tabs__product-description', { hidden: tabsState === activeTabs.characteristics });
  const formClass = cn('modal modal--review modal-for-ui-kit', { 'is-active': formReviewState === true });

  const classPopupAddCart = cn('modal modal-for-ui-kit', {'is-active' : isActivePopupAddCart});
  const classPopupAddCartSucceeded = cn('modal modal--success modal-for-ui-kit', {'is-active' : isActivePopupAddCartSuccess});

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{guitar?.name ?? 'Товар'}</h1>
          <Breadcrumbs name={guitar?.name} />
          {guitarLoading && <LoadingScreen />}
          {guitarError && <GuitarsErrorScreen />}
          {guitar && (
            <>
              <div className="product-container">
                <img
                  className="product-container__img"
                  src={`/img/content/${guitar.previewImg.slice(4)}`}
                  width="90"
                  height="235"
                  alt={guitar.name}
                />
                <div className="product-container__info-wrapper">
                  <h2 className="product-container__title title title--big title--uppercase">
                    {guitar.name}
                  </h2>
                  <RatingPanel rating={guitar.rating} />
                  <div className="tabs">
                    <a
                      className={characteristicsClass}
                      onClick={handleChangeTabs}
                    >
                      Характеристики
                    </a>
                    <a
                      className={descriptionClass}
                      onClick={handleChangeTabs}
                    >
                      Описание
                    </a>
                    <div className="tabs__content" id="characteristics">
                      <table className={characteristicsTableClass}>
                        <tbody>
                          <tr className="tabs__table-row">
                            <td className="tabs__title">Артикул:</td>
                            <td className="tabs__value">{guitar.vendorCode}</td>
                          </tr>
                          <tr className="tabs__table-row">
                            <td className="tabs__title">Тип:</td>
                            <td className="tabs__value">{guitarTranslate[guitar.type]}</td>
                          </tr>
                          <tr className="tabs__table-row">
                            <td className="tabs__title">Количество струн:</td>
                            <td className="tabs__value">
                              {guitar.stringCount} струнная
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className={descriptionParagraphClass}>
                        {guitar.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="product-container__price-wrapper">
                  <p className="product-container__price-info product-container__price-info--title">
                    Цена:
                  </p>
                  <p className="product-container__price-info product-container__price-info--value">
                    {guitar.price} ₽
                  </p>
                  <a
                    className="button button--red button--big product-container__button"
                    onClick={()=>dispatch(isActivePopupAddCartChange(true))}
                  >
                    Добавить в корзину
                  </a>
                </div>
              </div>
              <ReviewsList comments={guitar.comments} onClickFormReview={handleClickFormReview} />
              <FormReview nameGuitar={guitar.name} guitarId={guitar.id} formClass={formClass} onClickFormReview={handleClickFormReview} />
              {formReviewState === false && <PopupThanks />}
              <PopupAddCart guitar={guitar} classPopup={classPopupAddCart}/>
              <PopupAddToCartSucceeded classSucceeded={classPopupAddCartSucceeded}/>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Product;
