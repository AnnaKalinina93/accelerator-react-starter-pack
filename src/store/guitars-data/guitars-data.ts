import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { guitarsFailed, guitarsRequest, guitarsSucceeded, commentsFailed, commentsRequest, commentsSucceeded } from './action';

const initialState: GuitarsData = {
  guitars: [],
  guitarsLoading: false,
  guitarsError: false,
  comments: [],
  commentsLoading: false,
  commentsError: false,
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
    })

    .addCase(commentsRequest, (state) => {
      state.commentsLoading = true;
    })

    .addCase(commentsSucceeded, (state, action) => {
      state.commentsLoading = false;
      state.commentsError = false;
      state.comments = action.payload;
    })

    .addCase(commentsFailed, (state) => {
      state.commentsLoading = false;
      state.commentsError = true;
    });
});

