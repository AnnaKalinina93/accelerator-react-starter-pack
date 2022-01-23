import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <a className="link" href="./main.html">
          Главная
        </a>
      </li>
      <li className="breadcrumbs__item">
        <Link to={AppRoute.Main} className="link">
          Каталог
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <a className="link">Товар</a>
      </li>
    </ul>
  );
}

export default Breadcrumbs;
