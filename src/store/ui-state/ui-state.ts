import { createReducer } from '@reduxjs/toolkit';
import { UiState } from '../../types/state';
import { inputSearchChange } from './action';

const initialState: UiState = {
  inputSearch: '',
};

export const uiState = createReducer(initialState, (builder) => {
  builder

    .addCase(inputSearchChange, (state, action) => {
      state.inputSearch = action.payload;
    });
});
