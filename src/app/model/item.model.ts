import Base from './base.model';

export default interface Item extends Base {
  name: string;
  type: string;
  description: string;
}
