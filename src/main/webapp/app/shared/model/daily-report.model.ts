import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IDailyReport {
  id?: number;
  reportDate?: Moment;
  startTime?: Moment;
  endTime?: Moment;
  content?: string;
  reporter?: IEmployee;
}

export const defaultValue: Readonly<IDailyReport> = {};
