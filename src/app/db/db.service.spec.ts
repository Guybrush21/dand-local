import { TestBed } from '@angular/core/testing';
import { CHARACTER_TYPE, LOG_RECORD_TYPE } from '../common/constant';
import Character from '../model/character.model';
import PouchDB from 'pouchdb';
import { v4 } from 'uuid';
import { DbService } from './db.service';
import { removeCharacter } from '../state/character/character.action';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import LogRecord from '../model/logRecord.model';

describe('DbService', () => {
  let service: DbService;

  const defaultCharacter: Character = {
    _id: null,
    _rev: null,
    name: 'mario',
    class: 'developer',
    isFavorite: false,
    race: 'halforc',
    sex: 'male',
    type: CHARACTER_TYPE,
  };

  beforeEach(async () => {
    service = new DbService(null);
    service.db = new PouchDB(v4());

    service.saveCharacter(defaultCharacter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save new character', async () => {
    const character: Character = {
      _id: null,
      name: 'nicholas',
      class: 'developer',
      isFavorite: false,
      race: 'human',
      sex: 'male',
      type: CHARACTER_TYPE,
    };

    const result = await service.saveCharacter(character);
    expect(result).toBeDefined();
    expect(result._id).toBe(
      `${service.campaign_id}/${CHARACTER_TYPE}/${character.name}`
    );
  });

  it('should get default character', async () => {
    const c = await service.getCharacter(
      service.getCharacterId(defaultCharacter)
    );

    expect(c.name).toEqual(defaultCharacter.name);
    expect(c.class).toEqual(defaultCharacter.class);
  });

  it('database should contain at least the default character', async () => {
    const all = await service.getAllCharacter();

    expect(all).toBeTruthy();
    expect(all.length).toBeGreaterThanOrEqual(1);
    console.log(all);
  });

  it('should remove character', async () => {
    const c = await service.getCharacter(
      service.getCharacterId(defaultCharacter)
    );
    const removeResult = await service.removeCharacter(c);

    expect(removeResult).toBeTrue();
  });

  it('should add a logrecord', async () => {
    const record: LogRecord = {
      isFavorite: false,
      message: 'testing message',
      type: LOG_RECORD_TYPE,
    };
    const result = await service.saveLogRecord(record);
    expect(result).toBeDefined();
    expect(result.timestamp).toBeDefined();
    expect(result.number).toBeDefined();
  });

  it('log number should auto-increase', async () => {
    const record: LogRecord = {
      isFavorite: false,
      message: 'testing message 1',
      type: LOG_RECORD_TYPE,
    };
    const result1 = await service.saveLogRecord(record);

    const result2 = await service.saveLogRecord({
      ...record,
      message: 'testing message 2',
    });
    console.log(result1);
    console.log(result2);

    expect(result1.number).toBeDefined();
    expect(result2.number).toBeDefined();
    expect(result1.number).toBeLessThan(result2.number);
  });
});
