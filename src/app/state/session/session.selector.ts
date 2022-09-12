import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

export const allSessions = (state: AppState) => state.sessions.sessions;

export const selectSessions = createSelector(allSessions, (c) => {
  return c;
});

export const selectSessionById = (id: string) =>
  createSelector(allSessions, (c) => c.find((x) => x._id === id));
