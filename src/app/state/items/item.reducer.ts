import { createReducer, on } from '@ngrx/store';
import item from '../../model/item.model';
import produce from 'immer';
import { AppState } from '../state';
import Item from 'src/app/model/item.model';
import {
  SaveItem,
  generateRandomItem,
  removeItem,
  loadItems,
  loadItemsSuccess,
  SaveItemSuccess,
  removeItemSuccess,
} from './item.actions';
import itemGenerator from 'src/app/generators/itemGenerator';

export const initialState: ReadonlyArray<Item> = [];

export const itemsReducer = createReducer(
  initialState,
  on(loadItemsSuccess, (state, items) =>
    produce(state, (draft) => {
      draft.splice(0, draft.length);
      draft.push(...items.items);
    })
  ),
  on(SaveItemSuccess, (state, { item }) =>
    produce(state, (draft) => {
      const id = draft.findIndex((x) => x._id == item._id);
      if (id === -1) draft.push(item);
      else draft[id] = item;
    })
  ),
  on(removeItemSuccess, (state, { item }) =>
    produce(state, (draft) => {
      const index = draft.findIndex((c) => c._id === item._id);
      if (index !== -1) draft.splice(index, 1);
    })
  )
);
