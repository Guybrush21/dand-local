import { createReducer, on } from '@ngrx/store';
import Character from '../../model/character.model';

import {
  addCharacter,
  generateRandomCharacter,
  removeCharacter,
  loadCharacters,
  loadCharactersSuccess,
  removeCharacterSuccess,
} from './character.action';

import produce from 'immer';
import { AppState } from '../state';
import CharacterGenerator from 'src/app/generators/characterGenerator';

export const initialState: ReadonlyArray<Character> = [];

export const charactersReducer = createReducer(
  initialState,
  on(loadCharactersSuccess, (state, characters) =>
    produce(state, (draft) => {
      draft.splice(0, draft.length);
      draft.push(...characters.characters);
    })
  ),
  on(addCharacter, (state, { character }) =>
    produce(state, (draft) => {
      const id = draft.findIndex((x) => x._id == character._id);
      if (id === -1) draft.push(character);
      else draft[id] = character;
    })
  ),
  on(removeCharacterSuccess, (state, { character }) =>
    produce(state, (draft) => {
      const index = draft.findIndex((c) => c._id === character._id);
      if (index !== -1) draft.splice(index, 1);
    })
  )
);
