import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';

export const getChangeSort = (
  state: State,
): {
  type: string
  price: string
} => state[NameSpace.Ui].activeSort;
