import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { guitarsFailed, guitarsRequest, guitarsSucceeded } from './action';

const initialState: GuitarsData = {
  guitars: [],
  guitarsLoading: false,
  guitarsError: false,
};

export const guitarsData = createReducer(initialState, (builder) => {
  builder

    .addCase(guitarsRequest, (state) => {
      state.guitarsLoading = true;
    })

    .addCase(guitarsSucceeded, (state, action) => {
      state.guitarsLoading = false;
      state.guitarsError = false;
      state.guitars = action.payload;
    })

    .addCase(guitarsFailed, (state) => {
      state.guitarsLoading = false;
      state.guitarsError = true;
    });
});

