import { createSelector } from '@ngrx/store';
import { AppState } from '../../state';

export const characterUIState = (state: AppState) => state.characterUI;

export const characterUISelector = createSelector(characterUIState, (c) => {
    return c;
});
