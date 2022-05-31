import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

export const uiState = (state: AppState) => state.ui;

export const uiSelector = createSelector(uiState, (c) => {
  return c;
});
