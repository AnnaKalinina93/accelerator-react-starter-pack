import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';

export enum ActionType {
  GuitarsSucceeded = 'catalog/guitarsSucceeded',
  GuitarsRequest = 'catalog/guitarsRequest',
  GuitarsFailed = 'catalog/guitarsFailed',
  RedirectToRoute = 'app/redirectToRoute',
  CommentsRequest = 'catalog/commentsRequest',
  CommentsSucceeded = 'catalog/commentsSucceeded',
  CommentsFailed = 'catalog/commentsFailed',
  SortType = 'catalog/sortType',
  SortOrder = 'catalog/sortOrder',
  ActiveMinPrice = 'catalog/activeMinPrice',
  ActiveMaxPrice = 'catalog/activeMaxPrice',
  ChangePrice = 'catalog/changePrice',
  TypeGuitar = 'catalog/typeGuitar',
  NumberOfString = 'catalog/numberOfString'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Action
>

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>
