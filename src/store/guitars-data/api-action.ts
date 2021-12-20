import { ThunkActionResult } from '../../types/action';
import {
  guitarsFailed,
  guitarsRequest,
  guitarsSucceeded
} from './action';
import { APIRoute } from '../../const';
import { Guitar} from '../../types/guitar';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _, api): Promise<void> => {
    dispatch(guitarsRequest());
    try {
      const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?_embed=comments`);
      dispatch(guitarsSucceeded(data));
    } catch {
      dispatch(guitarsFailed());
    }
  };
