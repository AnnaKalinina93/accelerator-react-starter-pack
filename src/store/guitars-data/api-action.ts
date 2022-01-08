import { ThunkActionResult } from '../../types/action';
import { guitarsFailed, guitarsRequest, guitarsSucceeded } from './action';
import { APIRoute, AppRoute, sortingType } from '../../const';
import { Guitar } from '../../types/guitar';
import { redirectToRoute } from '../middlewares/action';
import { getNewParams } from '../../utils';

export const fetchGuitarsAction = (
  activeSorting = {
    type: sortingType.type.default,
    order: sortingType.order.default,
  },
  minPrice = '',
  maxPrice = '',
  activeTypes: string[] = [],
): ThunkActionResult => async (dispatch, _, api): Promise<void> => {
  const baseURL = `${APIRoute.Guitars}?_embed=comments`;
  const params = getNewParams(activeSorting, minPrice, maxPrice, activeTypes);
  const url = params.toString() ? `${baseURL}&${params.toString()}` : baseURL;

  dispatch(guitarsRequest());
  try {
    const { data } = await api.get<Guitar[]>(url);
    dispatch(guitarsSucceeded(data));
    dispatch(redirectToRoute(`${AppRoute.Main}?${params.toString()}`));
  } catch {
    dispatch(guitarsFailed());
  }
};
