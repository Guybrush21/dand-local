import { createAction, props } from '@ngrx/store';
import Character from 'src/app/model/character.model';

export const openNewForm = createAction('[UI - Character] Open new form');

export const closeForm = createAction('[UI - Character] Close form');

export const selectCharachter = createAction(
  '[UI - Character] Select character',
  props<{ character: Character }>()
);

export const deselectCharachter = createAction(
  '[UI - Character] Deselect character'
);

export const editCharachter = createAction(
  '[UI - Character] Open Edit character'
);
