import { combineReducers } from 'redux';
import { guitarsData } from './guitars-data/guitars-data';
// import { userProcess } from './user-process/user-process';
// import { commentsData } from './comments-data/comments-data';
// import { uiState } from './ui-state/ui-state';
// import { favoritesOffersData } from './favorites-data/favorites-data';

export enum NameSpace {
  Ui = 'UI_STATE',
  Guitars = 'GUITARS',
}

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsData,
});

export type RootState = ReturnType<typeof rootReducer>
