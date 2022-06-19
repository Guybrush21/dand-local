import { createAction, props } from '@ngrx/store';
import LogRecord from '../../model/logRecord.model';

export const SaveLogRecord = createAction(
  '[LogRecords] Save LogRecord',
  props<{ logRecord: LogRecord }>()
);

export const SaveLogRecordSuccess = createAction(
  '[LogRecords] Save LogRecord Success',
  props<{ logRecord: LogRecord }>()
);

export const SaveLogRecordFail = createAction(
  '[LogRecords] Save LogRecord Fail',
  props<{ logRecord: LogRecord; error: string }>()
);

export const removeLogRecord = createAction(
  '[LogRecords] Remove LogRecord',
  props<{ logRecord: LogRecord }>()
);

export const removeLogRecordSuccess = createAction(
  '[LogRecords] Remove LogRecord Success',
  props<{ logRecord: LogRecord }>()
);

export const removeLogRecordFail = createAction(
  '[LogRecords] Remove LogRecord Fail',
  props<{ logRecord: LogRecord; error: string }>()
);

export const loadLogRecords = createAction('[LogRecords] Load all logRecords');

export const loadLogRecordsSuccess = createAction(
  '[LogRecords] Load all logRecords Success',
  props<{ logRecords: LogRecord[] }>()
);

export const loadLogRecordsFail = createAction(
  '[LogRecords] Load all logRecords Fail'
);

export const generateRandomLogRecord = createAction(
  '[LogRecords] Generate random logRecord'
);
