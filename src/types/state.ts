import { Guitar } from './guitar';
import { RootState } from '../store/root-reduser';

export type State = RootState

export type GuitarsData = {
  guitars: Guitar[],
  guitarsLoading: boolean,
  guitarsError: boolean,
  comments: [],
  commentsLoading: boolean,
  commentsError: boolean,
}

export type UiState = {
  activeSort: {
    type: string
    order: string
  },
  minPrice: string,
  maxPrice: string,
  typeGuitar: string[],
  activeStrings: string[],
}
