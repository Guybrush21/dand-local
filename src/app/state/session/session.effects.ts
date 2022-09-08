import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, from, pipe } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { DbService } from 'src/app/db/db.service';
import { loadItemsFail } from '../items/item.actions';
import {
  loadSessions,
  loadSessionsSuccess,
  removeSession,
  removeSessionFail,
  removeSessionSuccess,
  SaveSession,
  SaveSessionSuccess,
} from './session.actions';

@Injectable()
export class SessionEffects {
  constructor(private actions$: Actions, private db: DbService) {}

  loadSessions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSessions),
      mergeMap(() =>
        from(this.db.getAllSession()).pipe(
          map((a) => loadSessionsSuccess({ sessions: a })),
          catchError(async (err) => loadItemsFail())
        )
      )
    )
  );

  saveSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaveSession),
      mergeMap((action) =>
        from(this.db.saveSession(action.session)).pipe(
          map((a) => SaveSessionSuccess({ session: a }))
        )
      )
    )
  );

  removeSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeSession),
      mergeMap((removeAction) =>
        from(this.db.removeSession(removeAction.session)).pipe(
          map((a) => removeSessionSuccess({ session: removeAction.session })),
          catchError(async (err) => removeSessionFail(err))
        )
      )
    )
  );
}
