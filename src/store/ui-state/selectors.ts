import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';

export const getChangeSort = (
  state: State,
): {
  type: string
  order: string
} => state[NameSpace.Ui].activeSort;
