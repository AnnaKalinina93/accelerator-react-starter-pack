import { ActionType } from '../../types/action';
import { Guitar } from '../../types/guitar';
import { createAction } from '@reduxjs/toolkit';

export const guitarsSucceeded = createAction(
  ActionType.GuitarsSucceeded,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const guitarsSucceededForPrice = createAction(
  ActionType.GuitarsForPriceSucceeded,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const commentsSucceeded = createAction(
  ActionType.CommentsSucceeded,
  (comments: []) => ({
    payload: comments,
  }),
);

export const guitarSucceeded = createAction(
  ActionType.GuitarSucceeded,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

export const guitarRequest = createAction(ActionType.GuitarRequest);

export const guitarFailed = createAction(ActionType.GuitarFailed);

export const guitarsRequest = createAction(ActionType.GuitarsRequest);

export const guitarsFailed = createAction(ActionType.GuitarsFailed);

export const commentsRequest = createAction(ActionType.CommentsRequest);

export const commentsFailed = createAction(ActionType.CommentsFailed);
