import { useDispatch, useSelector } from 'react-redux';
import {
  getGuitarsError,
  getGuitarsLoading,
  getFilterGuitars
} from '../../store/guitars-data/selectors';
import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import Sort from '../../components/sort/sort';
import GuitarsList from '../../components/guitars-list/guitars-list';
import Footer from '../../components/footer/footer';
import LoadingScreen from '../loading-screen/loading-screen';
import GuitarsErrorScreen from '../guitars-error-screen/guitars-error-screen';
import { useEffect, useState } from 'react';
import { fetchGuitarsAction } from '../../store/guitars-data/api-action';
import { getChangeSort, getMaxPrice, getMinPrice, getTypeGuitar } from '../../store/ui-state/selectors';

function Catalog(): JSX.Element {
  const guitarsLoading = useSelector(getGuitarsLoading);
  const guitarsError = useSelector(getGuitarsError);
  const guitars = useSelector(getFilterGuitars);
  const activeSorting = useSelector(getChangeSort);
  const activeMinPrice = useSelector(getMinPrice);
  const activeMaxPrice = useSelector(getMaxPrice);
  const activeTypeGuitar = useSelector(getTypeGuitar);

  const [formState, setFormState] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuitarsAction(activeSorting, activeMinPrice, activeMaxPrice, activeTypeGuitar));
  }, [
    activeSorting,
    activeMinPrice,
    activeMaxPrice,
    activeTypeGuitar,
    dispatch]);


  const handleChange = (value: string) => {
    setFormState(value);
  };

  if (guitarsLoading) {
    return <LoadingScreen />;
  }

  if (!guitarsLoading && guitarsError) {
    return <GuitarsErrorScreen />;
  }

  const searchGuitars = guitars.filter((guitar) => guitar.name.toLowerCase().includes(formState.toLowerCase()));

  return (
    <div className="wrapper">
      <Header onChangeInput={handleChange}/>
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
            <Filter/>
            <Sort />
            <GuitarsList guitars={searchGuitars.slice(0, 9)} />
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active">
                  <a className="link pagination__page-link" href="1">
                    1
                  </a>
                </li>
                <li className="pagination__page">
                  <a className="link pagination__page-link" href="2">
                    2
                  </a>
                </li>
                <li className="pagination__page">
                  <a className="link pagination__page-link" href="3">
                    3
                  </a>
                </li>
                <li
                  className="pagination__page pagination__page--next"
                  id="next"
                >
                  <a className="link pagination__page-link" href="2">
                    Далее
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Catalog;
