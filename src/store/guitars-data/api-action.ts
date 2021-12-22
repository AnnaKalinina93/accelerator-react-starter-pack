import { ThunkActionResult } from '../../types/action';
import { guitarsFailed, guitarsRequest, guitarsSucceeded } from './action';
import { APIRoute, sortingType } from '../../const';
import { Guitar } from '../../types/guitar';
import { getSortRout } from '../../utils';
import { sortChangeOrder, sortChangeType } from '../ui-state/action';

export const fetchGuitarsAction = (
  activeSorting = {
    type: sortingType.type.default,
    order: sortingType.order.default,
  },
): ThunkActionResult => async (dispatch, _, api): Promise<void> => {
  const activeRout = getSortRout(activeSorting);
  dispatch(guitarsRequest());
  try {
    const { data } = await api.get<Guitar[]>(
      `${APIRoute.Guitars}?_embed=comments${activeRout.sortPrice}${activeRout.rating}`,
    );
    dispatch(guitarsSucceeded(data));
    dispatch(sortChangeType(activeSorting.type));
    dispatch(sortChangeOrder(activeSorting.order));
  } catch {
    dispatch(guitarsFailed());
  }
};
