import { Comment, Guitar } from './guitar';
import { RootState } from '../store/root-reduser';

export type State = RootState

export type GuitarsData = {
  guitars: Guitar[],
  guitarsLoading: boolean,
  guitarsError: boolean,
  guitarsForPrice: Guitar[],
  totalGuitars: number,
  guitar: Guitar | null,
  guitarLoading: boolean,
  guitarError: boolean,
  comment: Comment | null,
  commentLoading: boolean,
  commentError: boolean,
  isPostComment: boolean,
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
  activePage: number,
  activeSearch: string,
}
