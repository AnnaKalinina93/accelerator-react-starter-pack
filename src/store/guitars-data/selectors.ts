import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Comment, Guitar } from '../../types/guitar';
import { createSelector } from 'reselect';

export const getGuitars = (state: State): Guitar[] =>
  state[NameSpace.Guitars].guitars;
export const getGuitarsLoading = (state: State): boolean =>
  state[NameSpace.Guitars].guitarsLoading;
export const getGuitarsError = (state: State): boolean =>
  state[NameSpace.Guitars].guitarsError;
export const getTotalGuitars = (state: State): number =>
  state[NameSpace.Guitars].totalGuitars;

export const getGuitar = (state: State): Guitar | null =>
  state[NameSpace.Guitars].guitar;
export const getGuitarLoading = (state: State): boolean =>
  state[NameSpace.Guitars].guitarLoading;
export const getGuitarError = (state: State): boolean =>
  state[NameSpace.Guitars].guitarError;

export const getComment = (state: State): Comment | null =>
  state[NameSpace.Guitars].comment;

export const getGuitarsForPrice = (state: State): Guitar[] =>
  state[NameSpace.Guitars].guitarsForPrice;

export const selectPrices = createSelector(
  [getGuitarsForPrice],
  (guitars) => {
    const sortedGuitars = guitars.slice().sort((a,b) => a.price - b.price);

    return {
      minPrice: sortedGuitars[0]?.price,
      maxPrice: sortedGuitars[sortedGuitars.length - 1]?.price,
    };
  },
);

export const getIsPostReview = (state: State): boolean =>
  state[NameSpace.Guitars].isPostComment;
