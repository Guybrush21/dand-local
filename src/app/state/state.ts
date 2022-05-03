import Character from '../model/character.model';

export interface AppState {
    uid: string;
    characters: Character[];
    characterUI: CharacterUIState;
}

export interface CharacterUIState {
    isNewFormOpen: boolean;
    isDetailOpen: boolean;
    selectedCharacter?: Character;
}
