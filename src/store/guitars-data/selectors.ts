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

export const getGuitar = (state: State): Guitar | null =>
  state[NameSpace.Guitars].guitar;
export const getGuitarLoading = (state: State): boolean =>
  state[NameSpace.Guitars].guitarLoading;
export const getGuitarError = (state: State): boolean =>
  state[NameSpace.Guitars].guitarError;

export const getComments = (state: State): [] =>
  state[NameSpace.Guitars].comments;

export const getFilterGuitars = createSelector([getGuitars, getActiveStrings], (guitars, numberStrings) => {
  if (numberStrings.length) {
    let currentGuitars: Guitar[] = [];
    numberStrings.forEach((count) => {
      const selectedGuitars = guitars.filter((guitar) => guitar.stringCount === Number(count));
      currentGuitars = [...currentGuitars, ...selectedGuitars];
    });
    return currentGuitars;
  } else {
    return guitars;
  }
});

export const getGuitarsForPrice = (state: State): Guitar[] =>
  state[NameSpace.Guitars].guitarsForPrice;

export const selectPrices = createSelector(
  [getGuitarsForPrice],
  (guitars) => {
    const sortedGuitars = guitars.slice().sort((a,b) => a.price - b.price);

    return {
      minPrice: sortedGuitars[0]?.price,
      maxPrice: sortedGuitars[sortedGuitars.length - 1]?.price,
    };
  },
);
