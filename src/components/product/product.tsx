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
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ReviewsList from '../reviews-list/reviews-list';
import { nanoid } from 'nanoid';
import Breadcrumbs from '../breadcrumbs/breadcrumbs__item';
import LoadingScreen from '../loading-screen/loading-screen';
import { activeTabs, guitarTranslate } from '../../const';
import cn from 'classnames';

type ParamTypes = {
  id: string
}
const RATING_COUNT = 5;

function Product(): JSX.Element {
  const { id }: ParamTypes = useParams();
  const guitar = useSelector(getGuitar);
  const guitarLoading = useSelector(getGuitarLoading);
  const guitarError = useSelector(getGuitarError);
  const [tabsState, setTabsState] = useState(activeTabs.characteristics);
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

  const characteristicsClass = cn('button button--medium tabs__button', {'button--black-border': tabsState === activeTabs.description});
  const characteristicsTableClass = cn('tabs__table', {hidden: tabsState === activeTabs.description});
  const descriptionClass = cn('button button--medium tabs__button', {'button--black-border': tabsState === activeTabs.characteristics});
  const descriptionParagraphClass = cn('tabs__product-description', {hidden: tabsState === activeTabs.characteristics});

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <Breadcrumbs />
          {guitarLoading && <LoadingScreen />}
          {guitarError && <NotFoundScreen />}
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
                  <div
                    className="rate product-container__rating"
                    aria-hidden="true"
                  >
                    <span className="visually-hidden">Рейтинг:</span>
                    {new Array(Math.round(guitar.rating)).fill(1).map((item) => (
                      <svg
                        key={nanoid()}
                        width="12"
                        height="11"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                    ))}
                    {new Array(RATING_COUNT - Math.round(guitar.rating))
                      .fill(1)
                      .map((item) => (
                        <svg
                          key={nanoid()}
                          width="12"
                          height="11"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      ))}
                    <span className="rate__count"></span>
                    <span className="rate__message"></span>
                  </div>
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
                    href="#"
                  >
                    Добавить в корзину
                  </a>
                </div>
              </div>
              <ReviewsList comments={guitar.comments} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Product;
