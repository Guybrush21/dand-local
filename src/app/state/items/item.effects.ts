import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, from, pipe } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { DbService } from 'src/app/db/db.service';
import {
  loadItems,
  loadItemsFail,
  loadItemsSuccess,
  removeItem,
  removeItemFail,
  removeItemSuccess,
  SaveItem,
  SaveItemSuccess,
} from './item.actions';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions, private db: DbService) {}

  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() =>
        from(this.db.getAllItems()).pipe(
          map((a) => loadItemsSuccess({ items: a })),
          catchError(async (err) => loadItemsFail())
        )
      )
    )
  );

  saveItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaveItem),
      mergeMap((action) =>
        from(this.db.saveItem(action.item)).pipe(
          map((a) => SaveItemSuccess({ item: a }))
        )
      )
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeItem),
      mergeMap((removeAction) =>
        from(this.db.removeItem(removeAction.item)).pipe(
          map((a) => removeItemSuccess({ item: removeAction.item })),
          catchError(async (err) => removeItemFail(err))
        )
      )
    )
  );
}
