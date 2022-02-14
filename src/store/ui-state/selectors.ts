import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { createSelector } from 'reselect';
import { getStringsFromType, getTypesFromStrings } from '../../utils';
import { guitarsType } from '../../const';

const ALL_STRINGS = ['4', '6', '7', '12'];
const ALL_TYPES = [guitarsType.acoustic,guitarsType.electric, guitarsType.ukulele];

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

export const selectDisabledTypesCheckboxes = createSelector(
  [getActiveStrings],
  (strings) => {
    if (strings.length === 0) {
      return [];
    }

    const set = new Set(ALL_TYPES);

    strings.forEach((stringsItem) => {
      const values = getTypesFromStrings(stringsItem);

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

export const getActiveSearch = (state: State): string =>
  state[NameSpace.Ui].activeSearch;

export const getIsActivePopupAddCart = (state: State): boolean=>
  state[NameSpace.Ui].isActivePopupAddCart;

export const getIsActivePopupAddCartSuccess = (state: State): boolean=>
  state[NameSpace.Ui].isActivePopupAddCartSuccess;

export const getIsActivePopupDeleteGuitarCart = (state: State): boolean=>
  state[NameSpace.Ui].isActivePopupDeleteGuitarCart;
