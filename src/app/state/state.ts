import { EntityState } from '@ngrx/entity';
import Character from '../model/character.model';
import Item from '../model/item.model';
import Location from '../model/location.model';

export interface AppState {
  uid: string;
  characters: Character[];
  ui: UIState;
  items: Item[];
  locations: LocationState;
}

export interface LocationState {
  locations: Location[];
}

export interface UIState {
  isFormOpen: boolean;
  selectedItem?: Item;
  selectedCharacter?: Character;
  selectedType: string;
}
