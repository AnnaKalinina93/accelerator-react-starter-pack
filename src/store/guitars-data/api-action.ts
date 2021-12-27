import { ThunkActionResult } from '../../types/action';
import { guitarsFailed, guitarsRequest, guitarsSucceeded } from './action';
import { APIRoute, FilterPriceRout, sortingType } from '../../const';
import { Guitar } from '../../types/guitar';
import { getSortRout, getTypeRout } from '../../utils';
import { sortChangeOrder, sortChangeType } from '../ui-state/action';

export const fetchGuitarsAction = (
  activeSorting = {
    type: sortingType.type.default,
    order: sortingType.order.default,
  },
  minPrice = '',
  maxPrice = '',
  activeTypeGuitar: string[] = [],
): ThunkActionResult => async (dispatch, _, api): Promise<void> => {
  const activeRout = getSortRout(activeSorting);
  const filterMinPriceRout = minPrice !== ''? `${FilterPriceRout.from}${minPrice}` : '';
  const filterMaxPriceRout = maxPrice !== ''? `${FilterPriceRout.to}${maxPrice}` : '';
  const filterTypeRout = getTypeRout(activeTypeGuitar);
  dispatch(guitarsRequest());
  try {
    const { data } = await api.get<Guitar[]>(
      `${APIRoute.Guitars}?_embed=comments${activeRout.sortPrice}${activeRout.rating}${filterMinPriceRout}${filterMaxPriceRout}${filterTypeRout}`,
    );
    dispatch(guitarsSucceeded(data));
    dispatch(sortChangeType(activeSorting.type));
    dispatch(sortChangeOrder(activeSorting.order));
  } catch {
    dispatch(guitarsFailed());
  }
};
