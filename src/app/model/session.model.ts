import Base from './base.model';
import Character from './character.model';
import Item from './item.model';
import Location from './location.model';
export default interface Session extends Base {
  title: string;
  start: string;
  scenes: string[];
  secrets: string[];
  treasures: Item[];
  locations: Location[];
  npc: Character[];
}
