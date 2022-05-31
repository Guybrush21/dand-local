import Character from '../model/character.model';
import Item from '../model/item.model';

export interface AppState {
  uid: string;
  characters: Character[];
  ui: UIState;
  items: Item[];
}

export interface UIState {
  isFormOpen: boolean;
  selectedItem?: Item;
  selectedCharacter?: Character;
  selectedType: string;
}
