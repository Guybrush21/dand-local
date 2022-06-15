import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { DbService } from 'src/app/db/db.service';

import {
  loadLocations,
  loadLocationsFail,
  loadLocationsSuccess,
  removeLocation,
  removeLocationFail,
  removeLocationSuccess,
  SaveLocation,
  SaveLocationSuccess,
} from './location.actions';

@Injectable()
export class LocationsEffects {
  constructor(private actions$: Actions, private db: DbService) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLocations),
      mergeMap(() =>
        from(this.db.getAllLocations()).pipe(
          map((a) => loadLocationsSuccess({ locations: a })),
          catchError(async (err) => loadLocationsFail())
        )
      )
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaveLocation),
      mergeMap((action) =>
        from(this.db.saveLocation(action.location)).pipe(
          map((a) => SaveLocationSuccess({ location: a }))
        )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeLocation),
      mergeMap((removeAction) =>
        from(this.db.removeLocation(removeAction.location)).pipe(
          map((a) =>
            removeLocationSuccess({ location: removeAction.location })
          ),
          catchError(async (err) => removeLocationFail(err))
        )
      )
    )
  );
}
