import { createReducer } from '@reduxjs/toolkit';
import { sortingType } from '../../const';
import { UiState } from '../../types/state';
import { sortChangeType, sortChangeOrder, minPriceChange, maxPriceChange, typeGuitarChange, numberOfStringChange, priceChange, activePageChange, activeSearchChange, isActivePopupAddCartChange, isActivePopupAddCartSuccessChange } from './action';
import * as queryString from 'querystring';

const location = window.location;
const parsed = queryString.parse(location.search.substr(1));
let activeSort = {
  type: sortingType.type.default,
  order: sortingType.order.default,
};
if (parsed._sort) {
  activeSort = {
    ...activeSort,
    type: parsed._sort as string,
  };
}
if (parsed._order) {
  activeSort = {
    ...activeSort,
    order: parsed._order as string,
  };}

let minPrice = '';
if (parsed.price_gte) {
  minPrice = parsed.price_gte as string;
}

let maxPrice = '';
if (parsed.price_lte) {
  maxPrice = parsed.price_lte as string;
}

let typeGuitar: string[] = [];
if (parsed.type) {
  if ( Array.isArray(parsed.type)) {
    typeGuitar = parsed.type as string[];
  } else {
    typeGuitar = [parsed.type as string];
  }
}

let activePage = 1;
if (parsed.page_) {
  activePage = Number(parsed.page_);
}

let activeStrings: string[] = [];
if (parsed.stringCount) {
  if (Array.isArray(parsed.stringCount)) {
    activeStrings = parsed.stringCount as string[];
  } else {
    activeStrings = [parsed.stringCount as string];
  }
}

const initialState: UiState = {
  activeSort,
  minPrice,
  maxPrice,
  typeGuitar,
  activeStrings,
  activePage,
  activeSearch: '',
  isActivePopupAddCart: false,
  isActivePopupAddCartSuccess: false,
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
    })

    .addCase(activePageChange, (state, action) => {
      state.activePage = action.payload;
    })

    .addCase(activeSearchChange, (state, action) => {
      state.activeSearch = action.payload;
    })

    .addCase(isActivePopupAddCartChange, (state, action) => {
      state.isActivePopupAddCart = action.payload;
    })

    .addCase(isActivePopupAddCartSuccessChange, (state, action) => {
      state.isActivePopupAddCartSuccess = action.payload;
    });
});
