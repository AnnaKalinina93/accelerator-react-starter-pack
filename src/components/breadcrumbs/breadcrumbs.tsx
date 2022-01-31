/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type BreadcrumbsProps = {
  name?: string
}

function Breadcrumbs({ name }: BreadcrumbsProps): JSX.Element {
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
        <a className="link" data-testid="Товар">
          {name ? name : 'Товар'}
        </a>
      </li>
    </ul>
  );
}

export default Breadcrumbs;
