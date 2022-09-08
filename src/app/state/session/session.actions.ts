import { createAction, props } from '@ngrx/store';
import Session from '../../model/session.model';

export const SaveSession = createAction(
  '[Sessions] Save session',
  props<{ session: Session }>()
);

export const SaveSessionSuccess = createAction(
  '[Sessions] Save session Success',
  props<{ session: Session }>()
);

export const SaveSessionFail = createAction(
  '[Sessions] Save session Fail',
  props<{ session: Session; error: string }>()
);

export const removeSession = createAction(
  '[Sessions] Remove session',
  props<{ session: Session }>()
);

export const removeSessionSuccess = createAction(
  '[Sessions] Remove session Success',
  props<{ session: Session }>()
);

export const removeSessionFail = createAction(
  '[Sessions] Remove session Fail',
  props<{ session: Session; error: string }>()
);

export const loadSessions = createAction('[Sessions] Load all sessions');

export const loadSessionsSuccess = createAction(
  '[Sessions] Load all sessions Success',
  props<{ sessions: Session[] }>()
);

export const loadSessionsFail = createAction(
  '[Sessions] Load all sessions Fail'
);
