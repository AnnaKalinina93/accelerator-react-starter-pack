import { createReducer } from '@reduxjs/toolkit';
import { UiState } from '../../types/state';
import { sortChangeType, sortChangePrice } from './action';

const initialState: UiState = {
  activeSort: {
    type: '',
    price: '',
  },
};

export const uiState = createReducer(initialState, (builder) => {
  builder

    .addCase(sortChangeType, (state, action) => {
      state.activeSort.type = action.payload;
    })

    .addCase(sortChangePrice, (state, action) => {
      state.activeSort.price = action.payload;
    });
});
