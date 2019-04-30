import { IEmployee } from 'app/shared/model/employee.model';

export interface IDailyReport {
  id?: number;
  reportDate?: number;
  startTime?: number;
  endTime?: number;
  content?: string;
  reporter?: IEmployee;
}

export const defaultValue: Readonly<IDailyReport> = {};
