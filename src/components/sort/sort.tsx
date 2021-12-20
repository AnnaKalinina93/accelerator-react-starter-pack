import { useDispatch, useSelector } from 'react-redux';
import { sortChangeType, sortChangePrice } from '../../store/ui-state/action';
import { getChangeSort} from '../../store/ui-state/selectors';
import cn from 'classnames';
import { SortingPrice, SortingType } from '../../const';

function Sort(): JSX.Element {
  const activeSortType = useSelector(getChangeSort).type;
  const activeSortPrice = useSelector(getChangeSort).type;

  const dispatch = useDispatch();

  const onUserAnswerType = (currentSortType: string) => {
    dispatch(sortChangeType(currentSortType));
  };
  const onUserAnswerPrice = (currentSortPrice: string) => {
    dispatch(sortChangePrice(currentSortPrice));
  };

  const sortTypePriceClass =cn('catalog-sort__type-button',{'catalog-sort__type-button--active ': activeSortType === SortingType.Price});
  const sortTypePopularityClass =cn('catalog-sort__type-button',{'catalog-sort__type-button--active ': activeSortType === SortingType.Popularity});
  const sortPriceIncreaseClass =cn('catalog-sort__order-button catalog-sort__order-button--up',{'catalog-sort__order-button--active': activeSortPrice === SortingPrice.Increase});
  const sortPriceDecreaseClass = cn('catalog-sort__order-button catalog-sort__order-button--down',{ 'catalog-sort__order-button--active': activeSortPrice === SortingPrice.Decrease});
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={sortTypePriceClass}
          aria-label="по цене"
          tabIndex={-1}
          onClick={() => onUserAnswerType(SortingType.Price)}
        >
          по цене
        </button>
        <button
          className={sortTypePopularityClass}
          aria-label="по популярности"
          onClick={() => onUserAnswerType(SortingType.Popularity)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={sortPriceIncreaseClass}
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={() => onUserAnswerPrice(SortingPrice.Increase)}
        />
        <button
          className={sortPriceDecreaseClass}
          aria-label="По убыванию"
          onClick={() => onUserAnswerPrice(SortingPrice.Decrease)}
        />
      </div>
    </div>
  );
}

export default Sort;
