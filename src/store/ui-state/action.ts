import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../types/action';

export const inputSearchChange= createAction(
  ActionType.Search,
  (inputSearch: string) => ({
    payload: inputSearch,
  }),
);
