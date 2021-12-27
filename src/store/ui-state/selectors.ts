import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';

export const getChangeSort = (
  state: State,
): {
  type: string,
  order: string
} => state[NameSpace.Ui].activeSort;

export const getMinPrice = (state: State): string =>
  state[NameSpace.Ui].minPrice;

export const getMaxPrice = (state: State): string =>
  state[NameSpace.Ui].maxPrice;

export const getTypeGuitar = (state: State): string[] =>
  state[NameSpace.Ui].typeGuitar;

export const getActiveStrings = (state: State): string[] =>
  state[NameSpace.Ui].activeStrings;

