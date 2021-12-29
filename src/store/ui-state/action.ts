import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../types/action';

export const sortChangeType = createAction(
  ActionType.SortType,
  (activeSortType: string) => ({
    payload: activeSortType,
  }),
);

export const sortChangeOrder = createAction(
  ActionType.SortOrder,
  (activeSortOrder: string) => ({
    payload: activeSortOrder,
  }),
);

export const minPriceChange = createAction(
  ActionType.ActiveMinPrice,
  (activeMinPrice: string) => ({
    payload: activeMinPrice,
  }),
);

export const maxPriceChange = createAction(
  ActionType.ActiveMaxPrice,
  (activeMaxPrice: string) => ({
    payload: activeMaxPrice,
  }),
);

export const typeGuitarChange = createAction(
  ActionType.TypeGuitar,
  (activeTypeGuitar: string[]) => ({
    payload: activeTypeGuitar,
  }),
);

export const numberOfStringChange = createAction(
  ActionType.NumberOfString,
  (activeNumberOfString: string[]) => ({
    payload: activeNumberOfString,
  }),
);
