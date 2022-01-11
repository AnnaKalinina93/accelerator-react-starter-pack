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
  getGuitarTypes,
  getActivePage,
  getActiveStrings
} from '../../store/ui-state/selectors';
import Pagination from '../../components/pagination/pagination';
import * as queryString from 'querystring';
import { useHistory } from 'react-router';
import { activePageChange, maxPriceChange, minPriceChange, numberOfStringChange, sortChangeOrder, sortChangeType, typeGuitarChange } from '../../store/ui-state/action';

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
  const history = useHistory();

  useEffect( () => {
    dispatch(fetchGuitarsAction(activeSorting, activeMinPrice, activeMaxPrice, activeGuitarTypes, activePage, activeStrings));
  },[activeSorting, activeMinPrice, activeMaxPrice, activeGuitarTypes, activePage, activeStrings]);

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

    let actualMinPrice = activeMinPrice;
    if (parsed.price_gte) {
      actualMinPrice = parsed.price_gte as string;
    }

    let actualMaxPrice = activeMaxPrice;
    if (parsed.price_lte) {
      actualMaxPrice = parsed.price_lte as string;
    }

    let actualGuitarTypes = activeGuitarTypes;
    if (parsed.type) {
      actualGuitarTypes = parsed.type as string[];
    }

    let actualPage = activePage;
    if (parsed.page_) {
      actualPage = Number(parsed.page_);
    }

    let actualStrings = activeStrings;
    if (parsed.strings) {
      actualStrings = parsed.strings as string[];
    }
    dispatch(sortChangeType(actualSorting.type));
    dispatch(sortChangeOrder(actualSorting.order));
    dispatch(minPriceChange(actualMinPrice));
    dispatch(maxPriceChange(actualMaxPrice));
    dispatch(typeGuitarChange(activeGuitarTypes));
    dispatch(activePageChange(actualPage));
    dispatch(numberOfStringChange(actualStrings));
    dispatch(fetchGuitarsAction(actualSorting, actualMinPrice, actualMaxPrice, actualGuitarTypes, actualPage, actualStrings));
  }, [],
  );

  const handleChange = (value: string) => {
    setFormState(value);
  };


  const searchGuitars = guitars.filter((guitar) =>
    guitar.name.toLowerCase().includes(formState.toLowerCase()),
  );

  const PAGE_COUNT = Math.min(searchGuitars.length/9);

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
