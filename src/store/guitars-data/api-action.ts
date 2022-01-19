import { ThunkActionResult } from '../../types/action';
import { guitarsFailed, guitarsRequest, guitarsSucceeded, guitarsSucceededForPrice } from './action';
import { APIRoute, sortingType } from '../../const';
import { Guitar } from '../../types/guitar';
import { getNewParams } from '../../utils';
import { toast } from 'react-toastify';

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
  } catch {
    dispatch(guitarsFailed());
  }
};

export const fetchGuitarsForPrice = (
  activeTypes: string[] = [],
  activeStrings: string[] = [],
): ThunkActionResult => async (dispatch, _, api): Promise<void> => {
  const baseURL = `${APIRoute.Guitars}?_embed=comments`;
  const params = new URLSearchParams('');
  if (activeTypes.length) {
    activeTypes.map((type)=>params.append('type', type));
  }
  const url = params.toString() ? `${baseURL}&${params.toString()}` : baseURL;
  try {
    const { data } = await api.get<Guitar[]>(url);
    if (activeStrings.length) {
      let currentGuitars: Guitar[] = [];
      activeStrings.forEach((count) => {
        const selectedGuitars = data.filter((guitar) => guitar.stringCount === Number(count));
        currentGuitars = [...currentGuitars, ...selectedGuitars];
      });
      dispatch(guitarsSucceededForPrice(currentGuitars));
    } else {
      dispatch(guitarsSucceededForPrice(data));
    }
  } catch {
    toast.info('Не удалось пересчитать минималльную и максимальную цену');
  }
};
