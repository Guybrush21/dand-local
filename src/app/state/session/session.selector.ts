import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

export const allSessions = (state: AppState) => state.sessions;

export const selectSessions = createSelector(allSessions, (c) => {
  return c;
});
