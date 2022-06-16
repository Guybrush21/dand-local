import Base from './base.model';

export default interface Location extends Base {
  name: string;
  description: string;
  area: Location;
}
