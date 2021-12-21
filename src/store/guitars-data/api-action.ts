import { ThunkActionResult } from '../../types/action';
import {
  guitarsFailed,
  guitarsRequest,
  guitarsSucceeded
} from './action';
import { APIRoute, SortingPriceRout, SortingRatingRout } from '../../const';
import { Guitar} from '../../types/guitar';

export const fetchGuitarsAction = (sortingPriceRout = SortingPriceRout.Default, sortingRatingRout = SortingRatingRout.Default): ThunkActionResult =>
  async (dispatch, _, api): Promise<void> => {
    dispatch(guitarsRequest());
    try {
      const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?_embed=comments${sortingPriceRout}${sortingRatingRout}`);
      dispatch(guitarsSucceeded(data));
    } catch {
      dispatch(guitarsFailed());
    }
  };

