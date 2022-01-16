import { combineReducers } from 'redux';
import { guitarsData } from './guitars-data/guitars-data';
import { uiState } from './ui-state/ui-state';

export enum NameSpace {
  Ui = 'UI_STATE',
  Guitars = 'GUITARS',
}

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsData,
  [NameSpace.Ui]: uiState,
});

export type RootState = ReturnType<typeof rootReducer>
