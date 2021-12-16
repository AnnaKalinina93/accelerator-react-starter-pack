import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Guitar } from '../../types/guitar';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.Guitars].guitars;
export const getGuitarsLoading = (state: State): boolean => state[NameSpace.Guitars].guitarsLoading;
export const getGuitarsError = (state: State): boolean => state[NameSpace.Guitars].guitarsError;
