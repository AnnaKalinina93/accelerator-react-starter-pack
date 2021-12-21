import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { fetchGuitarsAction } from '../../store/guitars-data/api-action';
import { useState } from 'react';
import { SortingPriceRout, SortingRatingRout, sortingType } from '../../const';
import { getSortRout } from '../../utils';

type stateProps = {
    type: string;
    order: string;
};
function Sort(): JSX.Element {
  const [activeSorting, setActiveSorting] = useState<stateProps>({
    type: sortingType.type.default,
    order: sortingType.order.default,
  });
  const dispatch = useDispatch();

  const onUserAnswer = (currentSortPriceType: SortingPriceRout, currentSortRatingType: SortingRatingRout) => {
    dispatch(fetchGuitarsAction(currentSortPriceType, currentSortRatingType));
  };

  const handlePriceClick = () => {
    setActiveSorting({
      order: activeSorting.order,
      type: sortingType.type.price,
    });
    const activeRout = getSortRout(activeSorting);
    onUserAnswer(activeRout.sortPrice, activeRout.rating);
  };
  const handleRatingClick = () => {
    setActiveSorting({
      order: activeSorting.order,
      type: sortingType.type.rating,
    });
    const activeRout = getSortRout(activeSorting);
    onUserAnswer(activeRout.sortPrice, activeRout.rating);
  };
  const handleUpClick = () => {
    setActiveSorting({
      type: activeSorting.type,
      order: sortingType.order.increase,
    });
    const activeRout = getSortRout(activeSorting);
    onUserAnswer(activeRout.sortPrice, activeRout.rating);
  };
  const handleDownClick = () => {
    setActiveSorting({
      type: activeSorting.type,
      order: sortingType.order.decrease,
    });
    const activeRout = getSortRout(activeSorting);
    onUserAnswer(activeRout.sortPrice, activeRout.rating);
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
          tabIndex={-1}
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
