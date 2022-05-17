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

export const generateRandomCharacter = createAction(
    '[Characters] Generate random character'
);

export const retriveCharacter = createAction(
    '[Characters] Retrive characters',
    props<{ characters: ReadonlyArray<Character> }>()
);
