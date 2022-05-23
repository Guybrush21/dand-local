import { createSelector } from '@ngrx/store';
import { AppState } from '../../state';

export const itemUIState = (state: AppState) => state.itemsUI;

export const itemUISelector = createSelector(itemUIState, (c) => {
  return c;
});
