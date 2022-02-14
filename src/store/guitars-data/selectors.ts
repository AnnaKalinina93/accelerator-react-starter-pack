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
export const getSearchGuitars = (state: State): Guitar[] =>
  state[NameSpace.Guitars].searchGuitars;

export const getGuitar = (state: State): Guitar | null =>
  state[NameSpace.Guitars].guitar;
export const getGuitarLoading = (state: State): boolean =>
  state[NameSpace.Guitars].guitarLoading;
export const getGuitarError = (state: State): boolean =>
  state[NameSpace.Guitars].guitarError;

export const getComment = (state: State): Comment | null =>
  state[NameSpace.Guitars].comment;

export const getIsPostReview = (state: State): boolean =>
  state[NameSpace.Guitars].isPostComment;

export const getCartGuitars = (state: State): Guitar[] =>
  state[NameSpace.Guitars].cartGuitars;
export const getCartGuitarsWithCount = createSelector([getCartGuitars], (guitars) => {
  const map = new Map<number,Guitar[]>();
  guitars.forEach((guitar) => {
    if (!map.has(guitar.id)) {
      map.set(guitar.id, [guitar]);
    } else {
      const mapGuitars = map.get(guitar.id) as Guitar[];
      map.set(guitar.id, [...mapGuitars,guitar]);
    }
  });
  return map;
},
);
