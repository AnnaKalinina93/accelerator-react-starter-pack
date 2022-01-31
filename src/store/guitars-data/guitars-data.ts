import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import {
  guitarsFailed,
  guitarsRequest,
  guitarsSucceeded,
  commentFailed,
  commentRequest,
  commentSucceeded,
  guitarsSucceededForPrice,
  guitarFailed,
  guitarRequest,
  guitarSucceeded,
  postReviewReset,
  totalGuitars
} from './action';

const initialState: GuitarsData = {
  guitars: [],
  guitarsLoading: false,
  guitarsError: false,
  totalGuitars: 0,
  comment: null,
  commentLoading: false,
  commentError: false,
  guitarsForPrice : [],
  guitar: null,
  guitarLoading: false,
  guitarError: false,
  isPostComment: false,
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

    .addCase(totalGuitars, (state, action) => {
      state.totalGuitars = action.payload;
    })


    .addCase(guitarsSucceededForPrice, (state, action) => {
      state.guitarsForPrice = action.payload;
    })

    .addCase(guitarRequest, (state) => {
      state.guitarLoading = true;
    })

    .addCase(guitarSucceeded, (state, action) => {
      state.guitarLoading = false;
      state.guitarError = false;
      state.guitar = action.payload;
    })

    .addCase(guitarFailed, (state) => {
      state.guitarLoading = false;
      state.guitarError = true;
    })

    .addCase(commentRequest, (state) => {
      state.commentLoading = true;
    })

    .addCase(commentSucceeded, (state, action) => {
      state.commentLoading = false;
      state.commentError = false;
      state.comment = action.payload;
      if (state.guitar){
        state.guitar.comments = [state.comment,...state.guitar.comments];
      }
      state.isPostComment = true;
    })

    .addCase(commentFailed, (state) => {
      state.commentLoading = false;
      state.commentError = true;
    })

    .addCase(postReviewReset, (state) =>{
      state.commentLoading = false;
      state.commentError = false;
      state.comment = null;
      state.isPostComment = false;
    });
});

