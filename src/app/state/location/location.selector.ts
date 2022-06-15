import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

export const allLocations = (state: AppState) => state.locations.locations;

export const select = createSelector(allLocations, (c) => {
  return c;
});

export const selectOnlyFavorite = createSelector(allLocations, (c) => {
  return c.filter((x) => x.isFavorite);
});
