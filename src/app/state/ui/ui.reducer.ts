import { createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { CHARACTER_TYPE, ITEM_TYPE } from 'src/app/common/constant';
import { AppState, UIState } from '../state';
import {
  closeForm,
  deselectCharachter,
  deselectItem,
  openForm,
  selectCharachter,
  selectItem,
} from './ui.action';

export const initialState: UIState = {
  isFormOpen: false,
  selectedCharacter: null,
  selectedItem: null,
  selectedType: null,
};

export const uiReducer = createReducer(
  initialState,
  on(openForm, (state, { newFormType }) => ({
    ...state,
    isFormOpen: true,
    selectedType: newFormType,
  })),
  on(closeForm, (state) => ({
    isFormOpen: false,
    selectedCharacter: null,
    selectedItem: null,
    selectedType: null,
  })),
  on(selectCharachter, (state, { character }) => ({
    ...state,
    selectedCharacter: character,
    selectedType: CHARACTER_TYPE,
  })),
  on(deselectCharachter, (state) => ({
    ...state,
    selectedCharacter: null,
    selectedType: null,
  })),
  on(selectItem, (state, { item }) => ({
    ...state,
    selectedItem: item,
    selectedType: ITEM_TYPE,
  })),
  on(deselectItem, (state) => ({
    ...state,
    selectedItem: null,
    selectedType: null,
  }))
);
