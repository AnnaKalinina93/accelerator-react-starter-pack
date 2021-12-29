import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Guitar } from '../../types/guitar';
import { createSelector } from 'reselect';
import { getActiveStrings } from '../ui-state/selectors';

export const getGuitars = (state: State): Guitar[] =>
  state[NameSpace.Guitars].guitars;
export const getGuitarsLoading = (state: State): boolean =>
  state[NameSpace.Guitars].guitarsLoading;
export const getGuitarsError = (state: State): boolean =>
  state[NameSpace.Guitars].guitarsError;


export const getComments = (state: State): [] =>
  state[NameSpace.Guitars].comments;

export const getFilterGuitars = createSelector([getGuitars, getActiveStrings], (guitars, numberStrings) => {
  if (numberStrings.length) {
    let currentGuitars: Guitar[] = [];
    numberStrings.map((count) => {
      const selectedGuitars = guitars.filter((guitar) => guitar.stringCount === Number(count));
      currentGuitars = [...currentGuitars, ...selectedGuitars];
    });
    return currentGuitars;
  } else {
    return guitars;
  }
});

