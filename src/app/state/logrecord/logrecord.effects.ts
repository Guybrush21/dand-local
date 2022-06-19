import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, from, pipe } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { DbService } from 'src/app/db/db.service';
import {
  loadLogRecords,
  loadLogRecordsFail,
  loadLogRecordsSuccess,
  removeLogRecord,
  removeLogRecordFail,
  removeLogRecordSuccess,
  SaveLogRecord,
  SaveLogRecordSuccess,
} from './logrecord.actions';

@Injectable()
export class LogRecordsEffects {
  constructor(private actions$: Actions, private db: DbService) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLogRecords),
      mergeMap(() =>
        from(this.db.getAllLogs()).pipe(
          map((a) => loadLogRecordsSuccess({ logRecords: a })),
          catchError(async (err) => loadLogRecordsFail())
        )
      )
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaveLogRecord),
      mergeMap((action) =>
        from(this.db.saveLogRecord(action.logRecord)).pipe(
          map((a) => SaveLogRecordSuccess({ logRecord: a }))
        )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeLogRecord),
      mergeMap((removeAction) =>
        from(this.db.removeLogRecord(removeAction.logRecord)).pipe(
          map((a) =>
            removeLogRecordSuccess({ logRecord: removeAction.logRecord })
          ),
          catchError(async (err) => removeLogRecordFail(err))
        )
      )
    )
  );
}
