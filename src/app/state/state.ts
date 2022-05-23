import Character from '../model/character.model';
import Item from '../model/item.model';

export interface AppState {
  uid: string;
  characters: Character[];
  characterUI: CharacterUIState;
  items: Item[];
  itemsUI: ItemUiState;
}

export interface CharacterUIState {
  isNewFormOpen: boolean;
  isDetailOpen: boolean;
  selectedCharacter?: Character;
}

export interface ItemUiState {
  isNewFormOpen: boolean;
  selectedItem?: Item;
}
