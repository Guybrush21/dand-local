import Base from './base.model';

export default interface LogRecord extends Base {
  message: string;
  timestamp?: Date;
  number?: number;
}
