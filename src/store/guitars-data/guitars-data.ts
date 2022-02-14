import { createReducer } from '@reduxjs/toolkit';
import { Guitar } from '../../types/guitar';
import { GuitarsData } from '../../types/state';
import {
  guitarsFailed,
  guitarsRequest,
  guitarsSucceeded,
  commentFailed,
  commentRequest,
  commentSucceeded,
  guitarFailed,
  guitarRequest,
  guitarSucceeded,
  postReviewReset,
  totalGuitars,
  searchGuitarsSucceeded,
  addCartGuitars,
  removalCartGuitars,
  countCartGuitarsChange
} from './action';

const initialState: GuitarsData = {
  guitars: [],
  guitarsLoading: false,
  guitarsError: false,
  totalGuitars: 0,
  searchGuitars:[],
  comment: null,
  commentLoading: false,
  commentError: false,
  guitar: null,
  guitarLoading: false,
  guitarError: false,
  isPostComment: false,
  cartGuitars: [],
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

    .addCase(guitarRequest, (state) => {
      state.guitarLoading = true;
    })

    .addCase(guitarSucceeded, (state, action) => {
      state.guitarLoading = false;
      state.guitarError = false;
      state.guitar = action.payload;
    })

    .addCase(searchGuitarsSucceeded, (state, action) => {
      state.searchGuitars = action.payload;
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
    })

    .addCase(addCartGuitars, (state, action) => {
      state.cartGuitars = [...state.cartGuitars, action.payload];
    })

    .addCase(removalCartGuitars, (state, action) => {
      const guitars = state.cartGuitars.slice();
      const indexFirstSearch = guitars.findIndex((guitar)=> guitar.id === action.payload.id);
      guitars.splice(indexFirstSearch,1);
      state.cartGuitars = guitars;
    })

    .addCase(countCartGuitarsChange, (state, action) => {
      const guitars = state.cartGuitars.slice();
      const guitarsWithoutSelectGuitar = guitars.filter((guitar) => guitar.id !== action.payload.guitar.id);
      const selectGuitars = new Array(action.payload.count).fill(action.payload.guitar) as Guitar[];
      state.cartGuitars = [...guitarsWithoutSelectGuitar, ...selectGuitars];
    });
});


