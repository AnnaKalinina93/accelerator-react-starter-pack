import { ActionType } from '../../types/action';
import { Comment, Guitar } from '../../types/guitar';
import { createAction } from '@reduxjs/toolkit';

export const guitarsSucceeded = createAction(
  ActionType.GuitarsSucceeded,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const commentSucceeded = createAction(
  ActionType.CommentSucceeded,
  (comment: Comment) => ({
    payload: comment,
  }),
);

export const guitarSucceeded = createAction(
  ActionType.GuitarSucceeded,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

export const totalGuitars = createAction(ActionType.TotalGuitars,
  (count: number) => ({
    payload: count,
  }));

export const searchGuitarsSucceeded = createAction(
  ActionType.SearchGuitarsSucceeded,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const guitarRequest = createAction(ActionType.GuitarRequest);

export const guitarFailed = createAction(ActionType.GuitarFailed);

export const guitarsRequest = createAction(ActionType.GuitarsRequest);

export const guitarsFailed = createAction(ActionType.GuitarsFailed);

export const commentRequest = createAction(ActionType.CommentRequest);

export const commentFailed = createAction(ActionType.CommentFailed);

export const postReviewReset = createAction(ActionType.PostReviewReset);


export const addCartGuitars = createAction(
  ActionType.AddCartGuitars,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

export const removalCartGuitars = createAction(
  ActionType.RemovalCartGuitars,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);
