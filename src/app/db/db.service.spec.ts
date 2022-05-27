import { TestBed } from '@angular/core/testing';
import { CHARACTER_TYPE } from '../common/constant';
import Character from '../model/character.model';
import PouchDB from 'pouchdb';
import { v4 } from 'uuid';
import { DbService } from './db.service';

describe('DbService', () => {
  let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbService);
    service.db = new PouchDB(v4());

    service.addCharacter({
      name: 'mario',
      class: 'developer',
      isFavorite: false,
      race: 'halforc',
      sex: 'male',
      type: CHARACTER_TYPE,
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save new character', async () => {
    const character: Character = {
      name: 'nicholas',
      class: 'developer',
      isFavorite: false,
      race: 'human',
      sex: 'male',
      type: CHARACTER_TYPE,
    };

    const result = await service.addCharacter(character);
    expect(result).toBeDefined();
    expect(result._id).toBe(
      `${service.campaign_id}/${CHARACTER_TYPE}/${character.name}`
    );
  });

  it('should get 2 default characters', async () => {
    const all = await service.getAllCharacter();

    expect(all).toBeTruthy();
    expect(all.length).toBeGreaterThanOrEqual(1);
  });
});
