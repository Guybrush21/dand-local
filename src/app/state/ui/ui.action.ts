import { createAction, props } from '@ngrx/store';
import Character from 'src/app/model/character.model';
import Item from 'src/app/model/item.model';

export const openForm = createAction(
  '[UI] Open form',
  props<{ newFormType: string }>()
);

export const closeForm = createAction('[UI] Close form');

export const selectCharachter = createAction(
  '[UI - Character] Select character',
  props<{ character: Character }>()
);

export const deselectCharachter = createAction(
  '[UI - Character] Deselect character'
);

export const deselectItem = createAction('[UI - Item] Deselect character');

export const selectItem = createAction(
  '[UI - Item] Select item',
  props<{ item: Item }>()
);
