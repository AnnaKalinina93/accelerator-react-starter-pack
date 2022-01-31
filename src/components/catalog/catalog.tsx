/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from 'react-redux';
import { getGuitars, getTotalGuitars } from '../../store/guitars-data/selectors';
import Header from '../header/header';
import Filter from '../filter/filter';
import Sort from '../sort/sort';
import GuitarsList from '../guitars-list/guitars-list';
import Footer from '../footer/footer';
import { useEffect } from 'react';
import {
  fetchGuitarsAction,
  fetchGuitarsForPrice
} from '../../store/guitars-data/api-action';
import {
  getChangeSort,
  getMaxPrice,
  getMinPrice,
  getGuitarTypes,
  getActivePage,
  getActiveStrings,
  getActiveSearch
} from '../../store/ui-state/selectors';
import Pagination from '../pagination/pagination';
import { redirectToRoute } from '../../store/middlewares/action';
import { AppRoute } from '../../const';
import { getNewParams } from '../../utils';

function Catalog(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const activeSorting = useSelector(getChangeSort);
  const activeMinPrice = useSelector(getMinPrice);
  const activeMaxPrice = useSelector(getMaxPrice);
  const activeGuitarTypes = useSelector(getGuitarTypes);
  const activePage = useSelector(getActivePage);
  const activeStrings = useSelector(getActiveStrings);
  const totalGuitars = useSelector(getTotalGuitars);
  const activeSearch = useSelector(getActiveSearch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchGuitarsAction(
        activeSorting,
        activeMinPrice,
        activeMaxPrice,
        activeGuitarTypes,
        activePage,
        activeStrings,
        activeSearch,
      ),
    );
    const params = getNewParams(
      activeSorting,
      activeMinPrice,
      activeMaxPrice,
      activeGuitarTypes,
      activeStrings,
    );
    if (activePage !== 1) {
      params.set('page_', String(activePage));
    }
    if (params.toString() !== '') {
      dispatch(redirectToRoute(`${AppRoute.Main}?${params.toString()}`));
    }
  }, [
    activeSorting,
    activeMinPrice,
    activeMaxPrice,
    activeGuitarTypes,
    activePage,
    activeStrings,
    activeSearch,
  ]);

  useEffect(() => {
    dispatch(fetchGuitarsForPrice(activeGuitarTypes, activeStrings));
  }, [activeGuitarTypes, activeStrings]);

  const PAGE_COUNT = Math.ceil(totalGuitars / 9);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">
            Каталог гитар
          </h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">
                Главная
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <Filter />
            <Sort />
            <GuitarsList guitars={guitars} />
            <Pagination pageCount={PAGE_COUNT} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Catalog;
