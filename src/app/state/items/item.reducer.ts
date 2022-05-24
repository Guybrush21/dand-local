import { createReducer, on } from '@ngrx/store';
import item from '../../model/item.model';
import produce from 'immer';
import { AppState } from '../state';
import Item from 'src/app/model/item.model';
import {
  addItem,
  generateRandomItem,
  removeItem,
  retriveItem,
} from './item.actions';
import itemGenerator from 'src/app/generators/itemGenerator';

export const initialState: ReadonlyArray<Item> = [];

export const itemsReducer = createReducer(
  initialState,
  on(retriveItem, (state) => state),
  on(addItem, (state, { item }) =>
    produce(state, (draft) => {
      const id = draft.findIndex((x) => x._id == item._id);
      if (id === -1) draft.push(item);
      else draft[id] = item;
    })
  ),
  on(removeItem, (state, { item }) =>
    produce(state, (draft) => {
      const index = draft.findIndex((c) => c._id === item._id);
      if (index !== -1) draft.splice(index, 1);
    })
  ),
  on(generateRandomItem, (state) =>
    produce(state, (draft) => {
      const generator = new itemGenerator();
      const randomitem = generator.next();
      draft.push(randomitem);
    })
  )
);
