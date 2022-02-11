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

export const priceChange = createAction(
  ActionType.ChangePrice,
  (name: string, price: string) => ({
    payload: {
      key: name,
      price,
    },
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

export const activePageChange = createAction(
  ActionType.ActivePage,
  (activePage: number) => ({
    payload: activePage,
  }),
);

export const activeSearchChange = createAction(
  ActionType.ActiveSearch,
  (activeSearch: string) => ({
    payload: activeSearch,
  }),
);


export const isActivePopupAddCartChange = createAction(
  ActionType.IsActivePopupAddCartChange,
  (isActiveAddCart: boolean) => ({
    payload: isActiveAddCart,
  }),
);

export const isActivePopupAddCartSuccessChange = createAction(
  ActionType.IsActivePopupAddCartSuccessChange,
  (isActiveAddCart: boolean) => ({
    payload: isActiveAddCart,
  }),
);
