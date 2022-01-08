import { useDispatch, useSelector } from 'react-redux';
import { getFilterGuitars } from '../../store/guitars-data/selectors';
import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import Sort from '../../components/sort/sort';
import GuitarsList from '../../components/guitars-list/guitars-list';
import Footer from '../../components/footer/footer';
import { useEffect, useState } from 'react';
import { fetchGuitarsAction } from '../../store/guitars-data/api-action';
import {
  getChangeSort,
  getMaxPrice,
  getMinPrice,
  getGuitarTypes
} from '../../store/ui-state/selectors';
import Pagination from '../../components/pagination/pagination';
import * as queryString from 'querystring';
import { useHistory } from 'react-router';
import { sortingType } from '../../const';
//import { getNewParams } from '../../utils';

function Catalog(): JSX.Element {
  const guitars = useSelector(getFilterGuitars);
  const activeSorting = useSelector(getChangeSort);
  const activeMinPrice = useSelector(getMinPrice);
  const activeMaxPrice = useSelector(getMaxPrice);
  const activeGuitarTypes = useSelector(getGuitarTypes);

  const [formState, setFormState] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   const params = getNewParams(activeSorting, activeMinPrice, activeMaxPrice, activeGuitarTypes);
  //   history.push({
  //     pathname: '/',
  //     search: params.toString(),
  //   });
  // }, [activeSorting, activeMinPrice, activeMaxPrice, activeGuitarTypes, dispatch],
  // );

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1));

    let actualSorting = activeSorting;
    if (parsed._sort) { actualSorting = {
      ...actualSorting,
      type: parsed._sort as string,
    };
    }
    if (parsed._order) { actualSorting = {
      ...actualSorting,
      order: parsed._order as string,
    };}
    if (activeSorting.type !== sortingType.type.default || activeSorting.order !== sortingType.order.default) {
      actualSorting = activeSorting;
    }

    let actualMinPrice = activeMinPrice;
    if (parsed.price_gte) {
      actualMinPrice = parsed.price_gte as string;
    }
    if (activeMinPrice !== '') {
      actualMinPrice = activeMinPrice;
    }
    let actualMaxPrice = activeMaxPrice;
    if (parsed.price_lte) {
      actualMaxPrice = parsed.price_lte as string;
    }
    if (activeMaxPrice !== '') {
      actualMaxPrice = activeMaxPrice;
    }

    let actualGuitarTypes = activeGuitarTypes;
    if (parsed.type) {
      actualGuitarTypes = parsed.type as string[];
    }
    if ( activeMinPrice.length ) {
      actualGuitarTypes = activeGuitarTypes;
    }
    dispatch(fetchGuitarsAction(actualSorting, actualMinPrice, actualMaxPrice, actualGuitarTypes));
  }, [activeSorting, activeMinPrice, activeMaxPrice, activeGuitarTypes, dispatch],
  );

  const handleChange = (value: string) => {
    setFormState(value);
  };


  const searchGuitars = guitars.filter((guitar) =>
    guitar.name.toLowerCase().includes(formState.toLowerCase()),
  );

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
            <GuitarsList guitars={searchGuitars.slice(0, 9)} />
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Catalog;
