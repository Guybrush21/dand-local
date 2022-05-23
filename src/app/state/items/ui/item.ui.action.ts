import { createAction, props } from '@ngrx/store';
import Item from 'src/app/model/item.model';

export const openNewForm = createAction('[UI - Item] Open new form');

export const closeForm = createAction('[UI - Item] Close form');

export const selectItem = createAction(
  '[UI - Item] Select item',
  props<{ item: Item }>()
);

export const deselectItem = createAction('[UI - Item] Deselect item');

export const editItem = createAction('[UI - Item] Open Edit item');
