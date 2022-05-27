import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import Character from '../model/character.model';
import { CHARACTER_TYPE } from '../common/constant';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  campaign_id = 'dand';
  db: PouchDB.Database<{}>;
  constructor() {
    this.db = new PouchDB(this.campaign_id);
  }

  getId(character: Character) {
    return `${this.campaign_id}/${CHARACTER_TYPE}/${character.name}`;
  }

  async saveCharacter(character: Character): Promise<Character> {
    if (!character._id)
      character = { ...character, _id: this.getId(character) };

    const doc = await this.db.put(character);
    return character;
  }

  async getCharacter(id: string): Promise<Character> {
    return await this.db.get<Character>(id);
  }

  async getAllCharacter(): Promise<Character[]> {
    let result = await this.db.allDocs<Character>({
      include_docs: true,
      attachments: true,
      startkey: `${this.campaign_id}/${CHARACTER_TYPE}/`,
    });

    return result.rows.map((x) => x.doc);
  }

  async removeCharacter(character: Character): Promise<boolean> {
    let doc = await this.db.get<Character>(character._id);
    let result = await this.db.remove(doc);

    return result.ok;
  }
}
