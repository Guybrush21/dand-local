import PouchDB from 'pouchdb';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllCharacters } from '../state/character/character.selector';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  db: PouchDB.Database<{}>;
  constructor(private store: Store) {
    this.db = new PouchDB('campaign');
  }

  save() {
    this.store.subscribe((data) => {
      this.db.put({
        _id: '1',
        ...data,
      });
    });
  }

  load() {
    return this.db.get('1');
  }
}
