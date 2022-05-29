import { createAction, props } from '@ngrx/store';
import Character from '../../model/character.model';

export const addCharacter = createAction(
  '[Characters] Add character',
  props<{ character: Character }>()
);

export const removeCharacter = createAction(
  '[Characters] Remove character',
  props<{ character: Character }>()
);

export const removeCharacterSuccess = createAction(
  '[Characters] Remove character Success',
  props<{ character: Character }>()
);

export const removeCharacterFail = createAction(
  '[Characters] Remove character fail',
  props<{ string }>()
);

export const generateRandomCharacter = createAction(
  '[Characters] Generate random character'
);

export const loadCharacters = createAction('[Characters] Load characters');
export const loadCharactersSuccess = createAction(
  '[Characters] Load characters success',
  props<{ characters: Character[] }>()
);
export const loadCharactersFail = createAction(
  '[Characters] Load characters fail'
);
