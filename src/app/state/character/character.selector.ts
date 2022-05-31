import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

export const allCharacters = (state: AppState) => state.characters;

export const selectAllCharacters = createSelector(allCharacters, (c) => {
  return c;
});

export const selectOnlyFavoriteCharacters = createSelector(
  allCharacters,
  (c) => {
    return c.filter((x) => x.isFavorite);
  }
);
