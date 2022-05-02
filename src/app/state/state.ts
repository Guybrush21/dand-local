import Character from '../model/character.model';

export interface AppState {
    uid: string;
    characters: Character[];
}

// export interface CharacterState {
//     characters: Character[];
// }

// export function getInitialState(): AppState {
//     return { characterState: initialCharacterState };
// }
