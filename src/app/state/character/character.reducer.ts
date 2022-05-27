import { createReducer, on } from '@ngrx/store';
import Character from '../../model/character.model';

import {
  addCharacter,
  generateRandomCharacter,
  removeCharacter,
  loadCharacters,
} from './character.action';

import produce from 'immer';
import { AppState } from '../state';
import CharacterGenerator from 'src/app/generators/characterGenerator';

export const initialState: ReadonlyArray<Character> = [
  {
    class: 'mage',
    name: 'Komarash Ferroblu',
    race: 'Half-orc',
    sex: 'male',
    _id: '0',
    type: 'bu',
    isFavorite: false,
  },
  {
    class: 'thief',
    name: 'Hel Vela',
    race: 'Human',
    sex: 'male',
    _id: '1',
    type: 'bu',
    isFavorite: false,
  },
];

export const charactersReducer = createReducer(
  initialState,
  on(loadCharacters, (state) => state),
  on(addCharacter, (state, { character }) =>
    produce(state, (draft) => {
      const id = draft.findIndex((x) => x._id == character._id);
      if (id === -1) draft.push(character);
      else draft[id] = character;
    })
  ),
  on(removeCharacter, (state, { character }) =>
    produce(state, (draft) => {
      const index = draft.findIndex((c) => c._id === character._id);
      if (index !== -1) draft.splice(index, 1);
    })
  ),
  on(generateRandomCharacter, (state) =>
    produce(state, (draft) => {
      const generator = new CharacterGenerator();
      const randomCharacter = generator.next();
      draft.push(randomCharacter);
    })
  )
);
