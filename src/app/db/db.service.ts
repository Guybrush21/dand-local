import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import Character from '../model/character.model';
import { CHARACTER_TYPE, ITEM_TYPE } from '../common/constant';
import Item from '../model/item.model';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  campaign_id = 'dand';
  remoteDB = new PouchDB('https://couchdb.elaine.pw/dand');
  db: PouchDB.Database<{}>;
  constructor() {
    this.db = new PouchDB(this.campaign_id);
    this.db
      .sync(this.remoteDB, {
        live: true,
      })
      .on('change', (change) => console.log(change))
      .on('error', (error) => console.log(error));
  }

  getCharacterId = (character: Character): string =>
    `${this.campaign_id}/${CHARACTER_TYPE}/${character.name}`;

  getItemId = (item: Item): string =>
    `${this.campaign_id}/${ITEM_TYPE}/${item.name}`;

  async saveCharacter(character: Character): Promise<Character> {
    if (!character._id)
      character = { ...character, _id: this.getCharacterId(character) };

    const doc = await this.db.put(character);
    return { ...character, _rev: doc.rev };
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

  async getAllItems(): Promise<Item[]> {
    const result = await this.db.allDocs<Item>({
      include_docs: true,
      attachments: true,
      startkey: `${this.campaign_id}/${ITEM_TYPE}/`,
    });

    return result.rows.map((x) => x.doc);
  }

  async saveItem(item: Item): Promise<Item> {
    if (!item._id) item = { ...item, _id: this.getItemId(item) };

    const doc = await this.db.put<Item>(item);
    return { ...item, _rev: doc.rev };
  }

  async removeItem(item: Item): Promise<boolean> {
    let doc = await this.db.get<Item>(item._id);
    let result = await this.db.remove(doc);

    return result.ok;
  }
}
