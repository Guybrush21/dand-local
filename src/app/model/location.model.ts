import Base from './base.model';

export default interface Location extends Base {
  name: string;
  area: string;
  description: string;
  imageUrl: string;
}
