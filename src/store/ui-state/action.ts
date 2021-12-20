import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../types/action';

export const sortChangeType= createAction(
  ActionType.SortType,
  (activeSortType: string) => ({
    payload: activeSortType,
  }),
);

export const sortChangePrice= createAction(
  ActionType.SortPrice,
  (activeSortPrice: string) => ({
    payload: activeSortPrice,
  }),
);
