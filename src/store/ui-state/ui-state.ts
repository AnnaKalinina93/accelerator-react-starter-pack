import { createReducer } from '@reduxjs/toolkit';
import { sortingType } from '../../const';
import { UiState } from '../../types/state';
import { sortChangeType, sortChangeOrder, minPriceChange, maxPriceChange, typeGuitarChange, numberOfStringChange, priceChange } from './action';

const initialState: UiState = {
  activeSort: {
    type: sortingType.type.default,
    order: sortingType.order.default,
  },
  minPrice: '',
  maxPrice: '',
  typeGuitar: [],
  activeStrings: [],
};

export const uiState = createReducer(initialState, (builder) => {
  builder

    .addCase(sortChangeType, (state, action) => {
      state.activeSort.type = action.payload;
    })

    .addCase(sortChangeOrder, (state, action) => {
      state.activeSort.order = action.payload;
    })

    .addCase(minPriceChange, (state, action) => {
      state.minPrice = action.payload;
    })

    .addCase(maxPriceChange, (state, action) => {
      state.maxPrice = action.payload;
    })
    .addCase(priceChange, (state, action) => {
      const { key, price } = action.payload;
      return {
        ...state,
        [key]: price,
      };
    })

    .addCase(typeGuitarChange, (state, action) => {
      state.typeGuitar = action.payload;
    })

    .addCase(numberOfStringChange, (state, action) => {
      state.activeStrings = action.payload;
    });
});
