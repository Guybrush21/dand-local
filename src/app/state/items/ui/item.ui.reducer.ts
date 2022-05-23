import { createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { AppState, ItemUiState } from '../../state';
import {
  closeForm,
  deselectItem,
  editItem,
  openNewForm,
  selectItem,
} from './item.ui.action';

export const initialState: ItemUiState = {
  isNewFormOpen: false,
  selectedItem: null,
};

export const itemsUIReducer = createReducer(
  initialState,
  on(openNewForm, (state) => ({
    ...state,
    isNewFormOpen: true,
    selectedItem: null,
  })),
  on(closeForm, (state) => ({ ...state, isNewFormOpen: false })),
  on(selectItem, (state, { item }) => ({
    ...state,
    selectedItem: item,
  })),
  on(deselectItem, (state) => ({ ...state, selectedItem: null })),
  on(editItem, (state) =>
    produce(state, (draft) => {
      draft.isNewFormOpen = true;
    })
  )
);
