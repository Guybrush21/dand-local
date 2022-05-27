import { TestBed } from '@angular/core/testing';
import { CHARACTER_TYPE } from '../common/constant';
import Character from '../model/character.model';
import PouchDB from 'pouchdb';
import { v4 } from 'uuid';
import { DbService } from './db.service';
import { removeCharacter } from '../state/character/character.action';

describe('DbService', () => {
  let service: DbService;

  const defaultCharacter: Character = {
    name: 'mario',
    class: 'developer',
    isFavorite: false,
    race: 'halforc',
    sex: 'male',
    type: CHARACTER_TYPE,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbService);
    service.db = new PouchDB(v4());

    service.saveCharacter(defaultCharacter);
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

    const result = await service.saveCharacter(character);
    expect(result).toBeDefined();
    expect(result._id).toBe(
      `${service.campaign_id}/${CHARACTER_TYPE}/${character.name}`
    );
  });

  it('should get default character', async () => {
    const c = await service.getCharacter(service.getId(defaultCharacter));

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
    const c = await service.getCharacter(service.getId(defaultCharacter));
    const removeResult = await service.removeCharacter(c);

    expect(removeResult).toBeTrue();
  });
});
