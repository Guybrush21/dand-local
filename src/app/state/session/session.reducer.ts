import { createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { AppState } from '../state';
import Item from 'src/app/model/item.model';
import {
  loadSessionsSuccess,
  removeSessionSuccess,
  SaveSessionSuccess,
} from './session.actions';
import Session from 'src/app/model/session.model';

export const initialState: ReadonlyArray<Session> = [];

export const sessionReducer = createReducer(
  initialState,
  on(loadSessionsSuccess, (state, sessions) =>
    produce(state, (draft) => {
      draft.splice(0, draft.length);
      draft.push(...sessions.sessions);
    })
  ),
  on(SaveSessionSuccess, (state, { session }) =>
    produce(state, (draft) => {
      const id = draft.findIndex((x) => x._id == session._id);
      if (id === -1) draft.push(session);
      else draft[id] = session;
    })
  ),
  on(removeSessionSuccess, (state, { session }) =>
    produce(state, (draft) => {
      const index = draft.findIndex((c) => c._id === session._id);
      if (index !== -1) draft.splice(index, 1);
    })
  )
);
