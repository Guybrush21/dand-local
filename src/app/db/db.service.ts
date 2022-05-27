import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import Character from '../model/character.model';
import { CHARACTER_TYPE } from '../common/constant';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  campaign_id = 'default';
  db: PouchDB.Database<{}>;
  constructor() {
    this.db = new PouchDB('dand');
  }

  loadCharacters(): Character[] {
    return [];
  }

  async addCharacter(character: Character): Promise<Character> {
    if (!character._id)
      character._id = `${this.campaign_id}/${CHARACTER_TYPE}/${character.name}`;

    const doc = await this.db.put(character);
    return character;
  }

  async getAllCharacter(): Promise<Character[]> {
    let result = await this.db.allDocs<Character>({
      include_docs: true,
      attachments: true,
      startkey: `${this.campaign_id}/${CHARACTER_TYPE}/`,
    });

    return result.rows.map((x) => x.doc);
  }
}
