import { ThunkActionResult } from '../../types/action';
import { commentFailed, commentRequest, commentSucceeded, discountSucceeded, guitarFailed, guitarRequest, guitarsFailed, guitarsRequest, guitarsSucceeded, guitarSucceeded, isPostCoupon, postReviewReset, searchGuitarsSucceeded, totalGuitars } from './action';
import { APIRoute, SortingRout, sortingType } from '../../const';
import { Comment, Guitar, PostComment } from '../../types/guitar';
import { getNewParams } from '../../utils';
import { toast } from 'react-toastify';
import { maxPriceChange, minPriceChange } from '../ui-state/action';

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

export const fetchSearchGuitarsAction = (
  activeSearch = '',
): ThunkActionResult => async (dispatch, _, api): Promise<void> => {
  const baseURL = `${APIRoute.Guitars}?_embed=comments`;
  const params = new URLSearchParams('');
  params.append('name_like',activeSearch);

  const url = params.toString() ? `${baseURL}&${params.toString()}` : baseURL;
  try {
    const { data } = await api.get<Guitar[]>(url);
    dispatch(searchGuitarsSucceeded(data));
  } catch {
    toast.info('Не удалось найти нужный товар, попробуйте еще раз.');
  }
};

export const fetchGuitarsForMinPrice = (
  activeTypes: string[] = [],
  activeStrings: string[] = [],
): ThunkActionResult => async (dispatch, _, api): Promise<void> => {
  const baseURL = `${APIRoute.Guitars}?`;
  const params = new URLSearchParams('');
  if (activeTypes.length) {
    activeTypes.map((type) => params.append('type', type));
  }
  params.append(SortingRout.Type, sortingType.type.price);
  params.append(SortingRout.Order, sortingType.order.increase);
  params.append('_start','0');
  params.append('_end','1');
  if (activeStrings.length) {
    activeStrings.forEach((item)=>params.append('stringCount', item));
  }
  const url = params.toString() ? `${baseURL}&${params.toString()}` : baseURL;
  try {
    const { data } = await api.get<Guitar[]>(url);
    const guitar = data[0];
    dispatch(minPriceChange(String(guitar.price)));
  } catch {
    toast.info('Не удалось пересчитать минималльную цену');
  }
};

export const fetchGuitarsForMaxPrice = (
  activeTypes: string[] = [],
  activeStrings: string[] = [],
): ThunkActionResult => async (dispatch, _, api): Promise<void> => {
  const baseURL = `${APIRoute.Guitars}?`;
  const params = new URLSearchParams('');
  if (activeTypes.length) {
    activeTypes.map((type) => params.append('type', type));
  }
  params.append(SortingRout.Type, sortingType.type.price);
  params.append(SortingRout.Order, sortingType.order.decrease);
  params.append('_start','0');
  params.append('_end','1');
  if (activeStrings.length) {
    activeStrings.forEach((item)=>params.append('stringCount', item));
  }
  const url = params.toString() ? `${baseURL}&${params.toString()}` : baseURL;
  try {
    const { data } = await api.get<Guitar[]>(url);
    const guitar = data[0];
    dispatch(maxPriceChange(String(guitar.price)));
  } catch {
    toast.info('Не удалось пересчитать максимальную цену');
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

export const postCoupon = (promoCod: string): ThunkActionResult =>
  async (dispatch, _, api) => {
    const coupon = {
      coupon: promoCod,
    };
    try {
      const { data } = await api.post<string>(APIRoute.Coupons, coupon);
      dispatch(discountSucceeded(Number(data)));
      dispatch(isPostCoupon(true));
    } catch {
      dispatch(discountSucceeded(0));
      dispatch(isPostCoupon(false));
    }
  };
