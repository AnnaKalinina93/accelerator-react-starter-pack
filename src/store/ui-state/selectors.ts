import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { createSelector } from 'reselect';
import { getStringsFromType } from '../../utils';

const ALL_STRINGS = ['4', '6', '7', '12'];

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

export const getGuitarTypes = (state: State): string[] =>
  state[NameSpace.Ui].typeGuitar;

export const getActiveStrings = (state: State): string[] =>
  state[NameSpace.Ui].activeStrings;

export const selectDisabledStringCheckboxes = createSelector(
  [getGuitarTypes],
  (types) => {
    if (types.length === 0) {
      return [];
    }

    const set = new Set(ALL_STRINGS);

    types.forEach((typeItem) => {
      const values = getStringsFromType(typeItem);

      values.forEach((value) => {
        if (set.has(value)) {
          set.delete(value);
        }
      });
    });

    return [...set];
  },
);

export const getActivePage = (state: State): number =>
  state[NameSpace.Ui].activePage;
