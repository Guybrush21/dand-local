import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loadCharacters } from './character.action';

@Injectable()
export class MovieEffects {
    constructor(
      private actions$: Actions,        
    ) { }
    
    // loadCharacters$ = createEffect(() => this.actions$.pipe(
    //     ofType(loadCharacters),
    //     mergeMap(() => this.
    //       .pipe(
    //         map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
    //         catchError(() => EMPTY)
    //       ))
    //     )
    //   );
     
    }
}
