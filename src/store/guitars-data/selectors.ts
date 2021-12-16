import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Guitar } from '../../types/guitar';
import { createSelector } from 'reselect';
import { getInputSearch } from '../ui-state/selectors';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.Guitars].guitars;
export const getGuitarsLoading = (state: State): boolean => state[NameSpace.Guitars].guitarsLoading;
export const getGuitarsError = (state: State): boolean => state[NameSpace.Guitars].guitarsError;

export const getSearchGuitars = createSelector([getGuitars, getInputSearch], (guitars, inputSearch) => guitars.filter((guitar) => guitar.name.toLowerCase().includes(inputSearch.toLowerCase())));
