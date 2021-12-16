import { ActionType } from '../../types/action';
import { AppRoute } from '../../const';
import { createAction } from '@reduxjs/toolkit';

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);
