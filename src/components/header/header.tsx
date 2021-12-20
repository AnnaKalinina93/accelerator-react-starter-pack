import { ChangeEvent, useState, FormEvent } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { getGuitars } from '../../store/guitars-data/selectors';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { inputSearchChange } from '../../store/ui-state/action';

type HeaderProps = {
  onChangeInput?: (value: any) => void
}

function Header({ onChangeInput }: HeaderProps) {
  // const dispatch = useDispatch();
  // const changeInputSearch = (inputSearch: string) => {
  //   dispatch(inputSearchChange(inputSearch));
  // };
  const guitars = useSelector(getGuitars);
  const [formInput, setFormInput] = useState({
    touched: false,
    value: '',
  });

  const searchClass = cn('form-search__select-list', {
    hidden: !formInput.touched || formInput.value === '',
  });

  const selectedGuitars = guitars.filter((guitar) => guitar.name.toLowerCase().includes(formInput.value.toLowerCase()));
  // const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = target;
  //   setFormState(value);
  // };

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo">
          <img
            className="logo__img"
            width="70"
            height="70"
            src="./img/svg/logo.svg"
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
            // onSubmit={(evt) => {
            //   evt.preventDefault();
            //   changeInputSearch(formState);
            // }}
          >
            <button className="form-search__submit" type="submit">
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
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                setFormInput({
                  touched: true,
                  value: target.value,
                });
                if (onChangeInput) {
                  return onChangeInput(target.value);
                }
              }}
            />
            <label className="visually-hidden" htmlFor="search">
              Поиск
            </label>
          </form>
          <ul className={searchClass}>
            { selectedGuitars.map((guitar)=> (
              <li key={guitar.id} className="form-search__select-item" tabIndex={0}>
                <Link to={`/product/${guitar.id}`} className="form-search__select-item">{guitar.name}</Link>
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
