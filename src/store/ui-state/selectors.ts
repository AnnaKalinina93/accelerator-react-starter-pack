import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';

export const getInputSearch= (state: State): string => state[NameSpace.Ui].inputSearch;

