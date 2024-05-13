import { Business } from '@/types/business.type';
import { JobPositionType } from '@/types/jobPositionType.enum';

export type Staff = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  job_position: JobPositionType;
  phone_number?: string;
  business?: Business;
};
