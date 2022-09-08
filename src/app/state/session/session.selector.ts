import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

export const allItems = (state: AppState) => state.items;

export const selectItems = createSelector(allItems, (c) => {
  return c;
});

export const selectOnlyFavoriteItems = createSelector(allItems, (c) => {
  return c.filter((x) => x.isFavorite);
});
