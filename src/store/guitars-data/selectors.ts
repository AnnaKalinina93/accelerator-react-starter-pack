import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Guitar } from '../../types/guitar';
import { createSelector } from 'reselect';
import { getChangeSort } from '../ui-state/selectors';
import { SortingPrice, SortingType } from '../../const';

export const getGuitars = (state: State): Guitar[] =>
  state[NameSpace.Guitars].guitars;
export const getGuitarsLoading = (state: State): boolean =>
  state[NameSpace.Guitars].guitarsLoading;
export const getGuitarsError = (state: State): boolean =>
  state[NameSpace.Guitars].guitarsError;


export const getComments = (state: State): [] =>
  state[NameSpace.Guitars].comments;

export const getSortGuitars = createSelector(
  [getGuitars, getChangeSort],
  (guitars, activeSort) => {
    switch (activeSort) {
      case {
        type: SortingType.Price,
        price: SortingPrice.Increase,
      }:
      case {
        type: SortingType.Price,
        price: '',
      }:
        return guitars.sort((a, b) => a.price - b.price);
      case {
        type: SortingType.Price,
        price: SortingPrice.Decrease,
      }:
        return guitars.sort((a, b) => b.price - a.price);
      case {
        type: SortingType.Popularity,
        price: SortingPrice.Increase,
      }:
      case {
        type: SortingType.Popularity,
        price: '',
      }:
        return guitars.sort((a, b) => a.rating - b.rating);
      case {
        type: SortingType.Popularity,
        price: SortingPrice.Decrease,
      }:
        return guitars.sort((a, b) => b.rating - a.rating);
      default:
        return guitars;
    }
  });

