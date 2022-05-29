import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, from, pipe } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { DbService } from 'src/app/db/db.service';
import {
  addCharacter,
  loadCharacters,
  loadCharactersSuccess,
  removeCharacter,
  removeCharacterFail,
  removeCharacterSuccess,
} from './character.action';

@Injectable()
export class CharacterEffects {
  constructor(
    private actions$: Actions,
    private db: DbService,
    private store: Store
  ) {}

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacters),
      mergeMap(() =>
        from(this.db.getAllCharacter()).pipe(
          map((a) => loadCharactersSuccess({ characters: a }))
        )
      )
    )
  );

  addCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCharacter),
      mergeMap((action) =>
        from(this.db.saveCharacter(action.character)).pipe(
          map((a) => loadCharacters())
        )
      )
    )
  );

  removeCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCharacter),
      mergeMap((removeAction) =>
        from(this.db.removeCharacter(removeAction.character)).pipe(
          map((a) =>
            removeCharacterSuccess({ character: removeAction.character })
          ),
          catchError(async (err) => removeCharacterFail(err))
        )
      )
    )
  );
}
