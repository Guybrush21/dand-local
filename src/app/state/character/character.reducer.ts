import { createReducer, on } from '@ngrx/store';
import Character from '../../model/character.model';

import {
  addCharacter,
  generateRandomCharacter,
  removeCharacter,
  retriveCharacter,
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
  on(retriveCharacter, (state, { characters }) => characters),
  on(addCharacter, (state, { character }) =>
    produce(state, (draft) => {
      draft.push(character);
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
