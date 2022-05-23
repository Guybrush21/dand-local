import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

export const allItems = (state: AppState) => state.items;

export const selectItems = createSelector(allItems, (c) => {
  return c;
});
