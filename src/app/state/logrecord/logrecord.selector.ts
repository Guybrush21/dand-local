import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

export const allLogRecords = (state: AppState) => state.logs.logRecords;

export const selectLogRecords = createSelector(allLogRecords, (c) => {
  return c;
});

export const selectOnlyFavoriteItems = createSelector(allLogRecords, (c) => {
  return c.filter((x) => x.isFavorite);
});
