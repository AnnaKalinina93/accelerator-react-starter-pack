/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router';


type BreadcrumbsProps = {
  name?: string
}

function Breadcrumbs({ name }: BreadcrumbsProps): JSX.Element {
  const location = useLocation();

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <a className="link" href="#!">
          Главная
        </a>
      </li>
      <li className="breadcrumbs__item">
        <Link to={AppRoute.Main} className="link">
          Каталог
        </Link>
      </li>
      <li className="breadcrumbs__item">
        {location.pathname !== AppRoute.Cart && (
          <a className="link" data-testid="Товар">
            {name ? name : 'Товар'}
          </a>)}
        {location.pathname === AppRoute.Cart && (
          <a className="link">Корзина</a>)}
      </li>
    </ul>
  );
}

export default Breadcrumbs;
