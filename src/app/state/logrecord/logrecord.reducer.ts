import { createReducer, on } from '@ngrx/store';
import produce from 'immer';

import { LogRecordState } from '../state';
import {
  loadLogRecordsSuccess,
  removeLogRecordSuccess,
  SaveLogRecordSuccess,
} from './logrecord.actions';

export const initialState: LogRecordState = { logRecords: [] };

export const logRecordReducer = createReducer(
  initialState,
  on(loadLogRecordsSuccess, (state, logs) =>
    produce(state, (draft) => {
      draft.logRecords.splice(0, draft.logRecords.length);
      draft.logRecords.push(...logs.logRecords);
    })
  ),
  on(SaveLogRecordSuccess, (state, { logRecord }) =>
    produce(state, (draft) => {
      const id = draft.logRecords.findIndex((x) => x._id == logRecord._id);
      if (id === -1) draft.logRecords.push(logRecord);
      else draft.logRecords[id] = logRecord;
    })
  ),
  on(removeLogRecordSuccess, (state, { logRecord }) =>
    produce(state, (draft) => {
      const index = draft.logRecords.findIndex((c) => c._id === logRecord._id);
      if (index !== -1) draft.logRecords.splice(index, 1);
    })
  )
);
