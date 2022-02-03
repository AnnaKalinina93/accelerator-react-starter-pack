import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Comment, Guitar } from '../../types/guitar';

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
