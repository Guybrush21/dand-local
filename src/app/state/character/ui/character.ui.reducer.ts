import { createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { AppState, CharacterUIState } from '../../state';
import {
  closeForm,
  deselectCharachter,
  editCharachter,
  openNewForm,
  selectCharachter,
} from './character.ui.action';

export const initialState: CharacterUIState = {
  isDetailOpen: false,
  isNewFormOpen: false,
  selectedCharacter: null,
};

export const charactersUIReducer = createReducer(
  initialState,
  on(openNewForm, (state) => ({
    ...state,
    isNewFormOpen: true,
    selectedCharacter: null,
  })),
  on(closeForm, (state) => ({ ...state, isNewFormOpen: false })),
  on(selectCharachter, (state, { character }) => ({
    ...state,
    selectedCharacter: character,
  })),
  on(deselectCharachter, (state) => ({ ...state, selectedCharacter: null })),
  on(editCharachter, (state) =>
    produce(state, (draft) => {
      draft.isNewFormOpen = true;
    })
  )
);
