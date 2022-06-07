import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import Character from '../model/character.model';
import { CHARACTER_TYPE, ITEM_TYPE } from '../common/constant';
import Item from '../model/item.model';
import pouchdbfind from 'pouchdb-find';
import { getAuth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { filter } from 'rxjs';

PouchDB.plugin(pouchdbfind);
@Injectable({
  providedIn: 'root',
})
export class DbService {
  campaign_id = 'dand';
  remoteurl = 'couchdb.elaine.pw';
  remoteDB: PouchDB.Database<{}>;

  db: PouchDB.Database<{}>;

  constructor(public auth: AngularFireAuth) {
    this.db = new PouchDB(this.campaign_id);

    this.auth.user.pipe(filter((user) => user != null)).subscribe((user) => {
      const userdb = this.getUserDb(user.uid);
      user.getIdTokenResult().then((t) => {
        const token = t.claims.couchtoken;
        if (!token) user.getIdToken(true);
        debugger;
        console.assert(token != null, 'couchtoken is missing');
        console.log(token);
        this.remoteDB = new PouchDB(
          `https://${user.uid}:${token}@${this.remoteurl}/${userdb}`
        );
        this.db
          .sync(this.remoteDB, {
            live: true,
          })
          .on('change', (change) => console.log(change))
          .on('error', (error) => console.log(error));
      });
    });
  }

  getUserDb(userid: string): string {
    return (
      'userdb-' +
      userid
        .split('')
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
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
    let result = await this.db.find({
      selector: { type: CHARACTER_TYPE },
    });
    return result.docs as Character[];
  }

  async removeCharacter(character: Character): Promise<boolean> {
    let doc = await this.db.get<Character>(character._id);
    let result = await this.db.remove(doc);

    return result.ok;
  }

  async getAllItems(): Promise<Item[]> {
    let result = await this.db.find({
      selector: { type: ITEM_TYPE },
    });
    return result.docs as Item[];
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
