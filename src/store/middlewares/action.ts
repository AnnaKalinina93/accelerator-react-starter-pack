import { ActionType } from '../../types/action';
import { createAction } from '@reduxjs/toolkit';

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: string) => ({
    payload: url,
  }),
);
