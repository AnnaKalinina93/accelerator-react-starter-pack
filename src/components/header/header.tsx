/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchGuitars } from '../../store/guitars-data/selectors';
import { Link } from 'react-router-dom';
import { getSortInput } from '../../utils';
import { useDebouncedCallback } from 'use-debounce';
import { activePageChange, activeSearchChange } from '../../store/ui-state/action';
import { fetchSearchGuitarsAction } from '../../store/guitars-data/api-action';
import { redirectToRoute } from '../../store/middlewares/action';
import { AppRoute } from '../../const';
import { getActiveSearch } from '../../store/ui-state/selectors';

function Header(): JSX.Element {

  const guitars = useSelector(getSearchGuitars);
  const activeSearch = useSelector(getActiveSearch);
  const [formInput, setFormInput] = useState({
    touched: false,
    value: activeSearch,
  });

  const searchClass = cn('form-search__select-list', {
    hidden: !formInput.touched || formInput.value === '',
  });

  const dispatch = useDispatch();

  const debouncedInputChange = useDebouncedCallback((value) => {
    dispatch(activePageChange(1));
    dispatch(activeSearchChange(value));
    dispatch(fetchSearchGuitarsAction(value));
  }, 500);

  const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      touched: true,
      value: target.value,
    });
    debouncedInputChange(target.value);
  };

  return (
    <header className="header" id="#header">
      <div className="container header__wrapper">
        <a className="header__logo logo">
          <img
            className="logo__img"
            width="70"
            height="70"
            src="/img/svg/logo.svg"
            alt="Логотип"
          />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <a className="link main-nav__link link--current" href="#">
                Каталог
              </a>
            </li>
            <li>
              <a className="link main-nav__link" href="#">
                Где купить?
              </a>
            </li>
            <li>
              <a className="link main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form
            className="form-search__form"
          >
            <button className="form-search__submit" type="submit"
              onClick = {()=> dispatch(redirectToRoute(AppRoute.Main))}
            >
              <svg
                className="form-search__icon"
                width="14"
                height="15"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-search"></use>
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input
              className="form-search__input"
              id="search"
              type="text"
              autoComplete="off"
              placeholder="что вы ищите?"
              value={formInput.value}
              onChange={handleChangeInput}
            />
            <label className="visually-hidden" htmlFor="search">
              Поиск
            </label>
          </form>
          <ul className={searchClass}>
            {guitars.length >=1 && getSortInput(guitars, formInput.value).map((guitar) => (
              <li key={guitar.id} className="form-search__select-item">
                <Link to={`/product/${guitar.id}`} className="form-search__select-item" tabIndex={0}>{guitar.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <a className="header__cart-link" href="#" aria-label="Корзина">
          <svg
            className="header__cart-icon"
            width="14"
            height="14"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
