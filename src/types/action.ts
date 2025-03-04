import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';

export enum ActionType {
  GuitarsSucceeded = 'catalog/guitarsSucceeded',
  GuitarsRequest = 'catalog/guitarsRequest',
  GuitarsFailed = 'catalog/guitarsFailed',
  TotalGuitars = 'catalog/totalGuitars',
  SearchGuitarsSucceeded = 'catalog/searchGuitarsSucceeded',
  GuitarRequest = 'product/guitarRequest',
  GuitarSucceeded = 'product/guitarSucceeded',
  GuitarFailed = 'product/guitarFailed',
  RedirectToRoute = 'app/redirectToRoute',
  CommentRequest = 'catalog/commentsRequest',
  CommentSucceeded = 'catalog/commentsSucceeded',
  CommentFailed = 'catalog/commentsFailed',
  SortType = 'catalog/sortType',
  SortOrder = 'catalog/sortOrder',
  ActiveMinPrice = 'catalog/activeMinPrice',
  ActiveMaxPrice = 'catalog/activeMaxPrice',
  ChangePrice = 'catalog/changePrice',
  TypeGuitar = 'catalog/typeGuitar',
  NumberOfString = 'catalog/numberOfString',
  ActivePage = 'catalog/activePage',
  ActiveSearch = 'catalog/activeSearch',
  PostReviewReset = 'product/postReviewReset',
  AddCartGuitars = 'cart/addCartGuitars',
  RemovalCartGuitars = 'cart/removalCartGuitars',
  RemovalAllGuitars = 'cart/removalAllGuitars',
  CountCartGuitarsChange = 'cart/countCartGuitarsChange',
  IsActivePopupAddCartChange = 'cart/isActivePopupAddCartChange',
  IsActivePopupAddCartSuccessChange = 'cart/isActivePopupAddCartSuccessChange',
  IsActivePopupDeleteGuitarCartChange = 'cart/isActivePopupDeleteGuitarCartChange',
  PromoCodAdding = 'cart/promoCodAdding',
  DiscountSucceeded = 'cart/discountSucceeded',
  IsPostCoupon = 'cart/isPostCoupon'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Action
>

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>
