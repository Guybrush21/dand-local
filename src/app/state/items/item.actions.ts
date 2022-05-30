import { createAction, props } from '@ngrx/store';
import Item from '../../model/item.model';

export const SaveItem = createAction(
  '[Items] Save Item',
  props<{ item: Item }>()
);

export const SaveItemSuccess = createAction(
  '[Items] Save Item Success',
  props<{ item: Item }>()
);

export const SaveItemFail = createAction(
  '[Items] Save Item Fail',
  props<{ item: Item; error: string }>()
);

export const removeItem = createAction(
  '[Items] Remove Item',
  props<{ item: Item }>()
);

export const removeItemSuccess = createAction(
  '[Items] Remove Item Success',
  props<{ item: Item }>()
);

export const removeItemFail = createAction(
  '[Items] Remove Item Fail',
  props<{ item: Item; error: string }>()
);

export const loadItems = createAction('[Items] Load all items');

export const loadItemsSuccess = createAction(
  '[Items] Load all items Success',
  props<{ items: Item[] }>()
);

export const loadItemsFail = createAction('[Items] Load all items Fail');

export const generateRandomItem = createAction('[Items] Generate random item');
