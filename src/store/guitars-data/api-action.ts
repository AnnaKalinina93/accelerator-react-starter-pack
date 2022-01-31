import { ThunkActionResult } from '../../types/action';
import { commentFailed, commentRequest, commentSucceeded, guitarFailed, guitarRequest, guitarsFailed, guitarsRequest, guitarsSucceeded, guitarsSucceededForPrice, guitarSucceeded, postReviewReset, totalGuitars } from './action';
import { APIRoute, sortingType } from '../../const';
import { Comment, Guitar, PostComment } from '../../types/guitar';
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
  activePage = 1,
  activeStrings: string[] = [],
  activeSearch = '',
): ThunkActionResult => async (dispatch, _, api): Promise<void> => {
  const baseURL = `${APIRoute.Guitars}?_embed=comments`;
  const params = getNewParams(activeSorting, minPrice, maxPrice, activeTypes, activeStrings, activeSearch, activePage);
  const url = params.toString() ? `${baseURL}&${params.toString()}` : baseURL;
  dispatch(guitarsRequest());
  try {
    const { data, headers } = await api.get<Guitar[]>(url);
    const count = headers['x-total-count'];
    dispatch(totalGuitars(Number(count)));
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
    activeTypes.map((type) => params.append('type', type));
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

export const fetchGuitarAction = (
  id: string,
): ThunkActionResult => async (dispatch, _, api): Promise<void> => {
  dispatch(guitarRequest());
  try {
    const { data } = await api.get<Guitar>(`${APIRoute.Guitars}/${id}?_embed=comments`);
    dispatch(guitarSucceeded(data));
  } catch {
    dispatch(guitarFailed());
  }
};

export const postComment = (comment: PostComment): ThunkActionResult =>
  async (dispatch, _, api) => {
    dispatch(commentRequest());
    try {
      const { data } = await api.post<Comment>(APIRoute.Comments, comment);
      dispatch(commentSucceeded(data));
    } catch {
      dispatch(commentFailed());
      dispatch(postReviewReset());
      toast.info('Не удалось отправить отзыв, попробуйте еще раз.');
    }
  };
