import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../types/action';

export const sortChangeType= createAction(
  ActionType.SortType,
  (activeSortType: string) => ({
    payload: activeSortType,
  }),
);

export const sortChangeOrder= createAction(
  ActionType.SortOrder,
  (activeSortOrder: string) => ({
    payload: activeSortOrder,
  }),
);
