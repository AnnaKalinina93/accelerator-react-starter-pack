import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { sortingType } from '../../const';
import { getChangeSort } from '../../store/ui-state/selectors';
import { sortChangeOrder, sortChangeType } from '../../store/ui-state/action';

function Sort(): JSX.Element {
  const activeSorting = useSelector(getChangeSort);
  const dispatch = useDispatch();

  const onUserAnswer = (currentSorting: {
    type: string,
    order: string,
  }) => {
    dispatch(sortChangeType(currentSorting.type));
    dispatch(sortChangeOrder(currentSorting.order));
  };

  const handlePriceClick = () => {
    onUserAnswer({
      type: sortingType.type.price,
      order: activeSorting.order,
    });
  };
  const handleRatingClick = () => {
    onUserAnswer({
      type: sortingType.type.rating,
      order: activeSorting.order,
    });
  };
  const handleUpClick = () => {
    onUserAnswer({
      type: activeSorting.type,
      order: sortingType.order.increase,
    });
  };
  const handleDownClick = () => {
    onUserAnswer({
      type: activeSorting.type,
      order: sortingType.order.decrease,
    });
  };

  const sortTypePriceClass =cn('catalog-sort__type-button',{'catalog-sort__type-button--active ': activeSorting.type === sortingType.type.price});
  const sortTypePopularityClass =cn('catalog-sort__type-button',{'catalog-sort__type-button--active ': activeSorting.type === sortingType.type.rating});
  const sortPriceIncreaseClass =cn('catalog-sort__order-button catalog-sort__order-button--up',{'catalog-sort__order-button--active': activeSorting.order === sortingType.order.increase});
  const sortPriceDecreaseClass = cn('catalog-sort__order-button catalog-sort__order-button--down',{ 'catalog-sort__order-button--active': activeSorting.order === sortingType.order.decrease});
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={sortTypePriceClass}
          aria-label="по цене"
          onClick={handlePriceClick}
        >
          по цене
        </button>
        <button
          className={sortTypePopularityClass}
          aria-label="по популярности"
          onClick={handleRatingClick}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={sortPriceIncreaseClass}
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={handleUpClick}
        />
        <button
          className={sortPriceDecreaseClass}
          aria-label="По убыванию"
          onClick={handleDownClick}
        />
      </div>
    </div>
  );
}

export default Sort;
