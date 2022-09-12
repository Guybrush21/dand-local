import { createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { AppState, SessionState } from '../state';
import Item from 'src/app/model/item.model';
import {
  loadSessionsSuccess,
  removeSessionSuccess,
  SaveSessionSuccess,
} from './session.actions';
import Session from 'src/app/model/session.model';

export const initialState: SessionState = { sessions: [] };

export const sessionReducer = createReducer(
  initialState,
  on(loadSessionsSuccess, (state, sessions) =>
    produce(state, (draft) => {
      draft.sessions.splice(0, draft.sessions.length);
      draft.sessions.push(...sessions.sessions);
    })
  ),
  on(SaveSessionSuccess, (state, { session }) =>
    produce(state, (draft) => {
      const id = draft.sessions.findIndex((x) => x._id == session._id);
      if (id === -1) draft.sessions.push(session);
      else draft[id] = session;
    })
  ),
  on(removeSessionSuccess, (state, { session }) =>
    produce(state, (draft) => {
      const index = draft.sessions.findIndex((c) => c._id === session._id);
      if (index !== -1) draft.sessions.splice(index, 1);
    })
  )
);
