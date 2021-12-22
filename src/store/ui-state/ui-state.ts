import { createReducer } from '@reduxjs/toolkit';
import { sortingType } from '../../const';
import { UiState } from '../../types/state';
import { sortChangeType, sortChangeOrder } from './action';

const initialState: UiState = {
  activeSort: {
    type: sortingType.type.default,
    order: sortingType.order.default,
  },
};

export const uiState = createReducer(initialState, (builder) => {
  builder

    .addCase(sortChangeType, (state, action) => {
      state.activeSort.type = action.payload;
    })

    .addCase(sortChangeOrder, (state, action) => {
      state.activeSort.order = action.payload;
    });
});
