import { createReducer, on } from '@ngrx/store';
import produce from 'immer';
import {
  CHARACTER_TYPE,
  ITEM_TYPE,
  LOCATION_TYPE,
} from 'src/app/common/constant';
import { AppState, UIState } from '../state';
import {
  closeForm,
  closeLogForm,
  deselectCharachter,
  deselectItem,
  deselectLogRecord,
  openForm,
  openLogForm,
  selectCharachter,
  selectItem,
  selectLocation,
  selectLogRecord,
} from './ui.action';

export const initialState: UIState = {
  isFormOpen: false,
  isLogMessageOpen: false,
  selectedLogRecord: null,
  selectedCharacter: null,
  selectedItem: null,
  selectedType: null,
  selectedLocation: null,
};

export const uiReducer = createReducer(
  initialState,
  on(openForm, (state, { newFormType }) => ({
    ...state,
    isFormOpen: true,
    selectedType: newFormType,
  })),
  on(closeForm, (state) => ({
    ...state,
    isFormOpen: false,
    selectedCharacter: null,
    selectedItem: null,
    selectedLocation: null,
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
  })),
  on(selectLocation, (state, { location }) => ({
    ...state,
    selectedLocation: location,
    selectedType: LOCATION_TYPE,
  })),
  on(deselectItem, (state) => ({
    ...state,
    selectedLocation: null,
    selectedType: null,
  })),
  on(openLogForm, (state) => ({ ...state, isLogMessageOpen: true })),
  on(closeLogForm, (state) => ({
    ...state,
    isLogMessageOpen: false,
    selectedLogRecord: null,
  })),
  on(selectLogRecord, (state, { log }) => ({
    ...state,
    selectedLogRecord: log,
  })),
  on(deselectLogRecord, (state) => ({ ...state, selectedLogRecord: null }))
);
