import Generator from './generator';
import { LOCATION_TYPE } from '../common/constant';
import Location from '../model/location.model';

export default class LocationGenerator extends Generator {
  firsterms = [
    'Dark',
    'White',
    'Elven',
    'Dwarf',
    'Goblins',
    'Kobold',
    'Ghost',
    'Phantom',
    'Dragon',
    'Red',
    'Blue',
    'Green',
    'Pale',
    'Mushroom',
    'Undead',
    'New',
    'Old',
    'Abandoned',
    'Marble',
    'Diamond',
    'Rock',
    'Cotton',
    'Silk',
    'Leather',
  ];

  secondterms = [
    'Mountain',
    'Forest',
    'Park',
    'Cave',
    'Beach',
    'Bay',
    'Shore',
    'Sea',
    'Land',
    'Desert',
    'Hill',
    'Inn',
    'Town',
    'House',
    'Port',
    'Lake',
    'River',
    'Road',
    'Path',
    'Trek',
    'Hetch',
    'Shelter',
  ];
  seconTermGenerator: Generator;
  firsTermGenerator: Generator;

  constructor() {
    super([]);
    this.firsTermGenerator = new Generator(this.firsterms);
    this.seconTermGenerator = new Generator(this.secondterms);
  }

  next() {
    let location: Location = {
      _id: null,
      _rev: null,
      area: null,
      isFavorite: false,
      type: LOCATION_TYPE,
      name: `${this.firsTermGenerator.next()} ${this.seconTermGenerator.next()}`,
      description: '',
    };

    return location;
  }
}
