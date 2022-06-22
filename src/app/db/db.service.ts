import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import Character from '../model/character.model';
import {
  CHARACTER_TYPE,
  ITEM_TYPE,
  LOCATION_TYPE,
  LOG_RECORD_TYPE,
} from '../common/constant';
import Item from '../model/item.model';
import pouchdbfind from 'pouchdb-find';
import { getAuth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { filter, find } from 'rxjs';
import Location from '../model/location.model';
import LogRecord from '../model/logRecord.model';
import Base from '../model/base.model';

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

    if (auth)
      this.auth.user.pipe(filter((user) => user != null)).subscribe((user) => {
        const userdb = this.getUserDb(user.uid);
        user.getIdTokenResult().then((t) => {
          const token = t.claims.couchtoken;
          if (!token) user.getIdToken(true);

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

  getLocationId = (item: Location): string =>
    `${this.campaign_id}/${LOCATION_TYPE}/${item.name}`;

  getRecordLogId = (record: LogRecord): string =>
    `${this.campaign_id}/${LOG_RECORD_TYPE}/${record.number}`;

  composeRecordLogId = (number: number): string =>
    `${this.campaign_id}/${LOG_RECORD_TYPE}/${number}`;

  async addAttachment(entity: Base, filename: string, data: Blob) {
    await this.db.putAttachment(
      entity._id,
      filename,
      entity._rev,
      data,
      'image'
    );
  }

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

  async removeLocation(location: Location): Promise<boolean> {
    let doc = await this.db.get<Location>(location._id);
    let result = await this.db.remove(doc);

    return result.ok;
  }

  async saveLocation(location: Location): Promise<Location> {
    if (!location._id)
      location = { ...location, _id: this.getLocationId(location) };
    const doc = await this.db.put<Location>(location);
    return { ...location, _rev: doc.rev };
  }

  async getAllLocations(): Promise<Location[]> {
    let result = await this.db.find({
      selector: { type: LOCATION_TYPE },
    });

    return result.docs as Location[];
  }

  async getAllLogs(count: number = 0, page: number = 0): Promise<LogRecord[]> {
    const pagination = { limit: count, skip: page };
    let selector = {
      selector: { type: LOG_RECORD_TYPE },
    };

    if (count !== 0) {
      selector = { ...selector, ...pagination };
    }

    let result = await this.db.find(selector);

    return result.docs as LogRecord[];
  }

  async removeLogRecord(record: LogRecord): Promise<boolean> {
    let doc = await this.db.get<LogRecord>(record._id);
    let result = await this.db.remove(doc);

    return result.ok;
  }

  async getLastLogRecord(): Promise<LogRecord | null> {
    const idx = await this.db.createIndex({
      index: {
        fields: ['number'],
        name: 'logrecordidx',
      },
    });

    let doc = await this.db.find({
      selector: { type: LOG_RECORD_TYPE, number: { $gte: null } },
      limit: 1,
      sort: [{ number: 'desc' }],
    });
    return (doc.docs[0] as LogRecord) ?? null;
  }

  async saveLogRecord(record: LogRecord): Promise<LogRecord> {
    if (!record._id) {
      const lastRecord = await this.getLastLogRecord();
      let lastNumber = 0;
      if (lastRecord) lastNumber = lastRecord.number + 1;

      record = {
        ...record,
        _id: this.composeRecordLogId(lastNumber),
        number: lastNumber,
        timestamp: new Date(),
        type: LOG_RECORD_TYPE,
      };
    }
    const doc = await this.db.put<LogRecord>(record);
    return { ...record, _rev: doc.rev };
  }
}
