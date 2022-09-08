import { EntityState } from '@ngrx/entity';
import Character from '../model/character.model';
import Item from '../model/item.model';
import Location from '../model/location.model';
import LogRecord from '../model/logRecord.model';
import Session from '../model/session.model';

export interface AppState {
  uid: string;
  characters: Character[];
  ui: UIState;
  items: Item[];
  locations: LocationState;
  logs: LogRecordState;
}

export interface LogRecordState {
  logRecords: LogRecord[];
}
export interface LocationState {
  locations: Location[];
}

export interface SessionState {
  sessions: Session[];
}
export interface UIState {
  isFormOpen: boolean;
  isLogMessageOpen: boolean;
  selectedLogRecord: LogRecord;
  selectedItem?: Item;
  selectedCharacter?: Character;
  selectedLocation?: Location;
  selectedType: string;
}
