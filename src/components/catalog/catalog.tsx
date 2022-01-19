/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from 'react-redux';
import { getFilterGuitars } from '../../store/guitars-data/selectors';
import Header from '../header/header';
import Filter from '../filter/filter';
import Sort from '../sort/sort';
import GuitarsList from '../guitars-list/guitars-list';
import Footer from '../footer/footer';
import { useEffect, useState } from 'react';
import { fetchGuitarsAction, fetchGuitarsForPrice } from '../../store/guitars-data/api-action';
import {
  getChangeSort,
  getMaxPrice,
  getMinPrice,
  getGuitarTypes,
  getActivePage,
  getActiveStrings
} from '../../store/ui-state/selectors';
import Pagination from '../pagination/pagination';
import { redirectToRoute } from '../../store/middlewares/action';
import { AppRoute } from '../../const';
import { getNewParams } from '../../utils';

function Catalog(): JSX.Element {
  const guitars = useSelector(getFilterGuitars);
  const activeSorting = useSelector(getChangeSort);
  const activeMinPrice = useSelector(getMinPrice);
  const activeMaxPrice = useSelector(getMaxPrice);
  const activeGuitarTypes = useSelector(getGuitarTypes);
  const activePage = useSelector(getActivePage);
  const activeStrings = useSelector(getActiveStrings);

  const [formState, setFormState] = useState('');

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(fetchGuitarsForPrice(activeGuitarTypes,activeStrings));
    dispatch(fetchGuitarsAction(activeSorting, activeMinPrice, activeMaxPrice, activeGuitarTypes));
    const params = getNewParams(activeSorting, activeMinPrice, activeMaxPrice, activeGuitarTypes, activePage, activeStrings);
    if (params.toString() !== '') {
      dispatch(redirectToRoute(`${AppRoute.Main}?${params.toString()}`));
    }
  },[activeSorting, activeMinPrice, activeMaxPrice, activeGuitarTypes, activePage, activeStrings]);

  const handleChange = (value: string) => {
    setFormState(value);
  };


  const searchGuitars = guitars.filter((guitar) =>
    guitar.name.toLowerCase().includes(formState.toLowerCase()),
  );

  const PAGE_COUNT = Math.ceil(searchGuitars.length/9);

  return (
    <div className="wrapper">
      <Header onChangeInput={handleChange} />
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
            <GuitarsList guitars={searchGuitars.slice((activePage-1)*9, activePage*9)} />
            <Pagination pageCount={PAGE_COUNT}/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Catalog;
