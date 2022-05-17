import { createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { AppState, CharacterUIState } from '../../state';
import {
  closeDetail,
  closeForm,
  deselectCharachter,
  openDetail,
  openNewForm,
  selectCharachter,
} from './character.ui.action';

export const initialState = {
  isDetailOpen: false,
  isNewFormOpen: false,
  selectCharachter: null,
};

export const charactersUIReducer = createReducer(
  initialState,
  on(openDetail, (state) => ({ ...state, isDetailOpen: true })),
  on(closeDetail, (state) => ({ ...state, isDetailOpen: false })),
  on(openNewForm, (state) => ({ ...state, isNewFormOpen: true })),
  on(closeForm, (state) => ({ ...state, isNewFormOpen: false })),
  on(selectCharachter, (state, { character }) => ({
    ...state,
    selectedCharacter: character,
  })),
  on(deselectCharachter, (state) => ({ ...state, selectedCharacter: null }))
);
