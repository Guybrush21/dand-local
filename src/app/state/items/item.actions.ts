import { createAction, props } from '@ngrx/store';
import Item from '../../model/item.model';

export const addItem = createAction(
  '[Items] Add Item',
  props<{ item: Item }>()
);

export const removeItem = createAction(
  '[Items] Remove Item',
  props<{ item: Item }>()
);

export const generateRandomItem = createAction('[Items] Generate random item');

export const retriveItem = createAction('[Items] Retrive items');
