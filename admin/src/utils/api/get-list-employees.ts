import { APIResponse } from '../../models/response';
import { Employee } from '../../models/employee';
import { END_POINT } from '../constants/link';

export async function getListEmployees(): Promise<APIResponse<Employee[]>> {
  try {
    const res = await fetch(`${END_POINT}/api/v1/employee`);
    const result = await res.json();
    const { data } = result;

    return {
      data,
      status: 'success'
    };
  } catch (e) {
    return {
      status: 'error',
      error: {
        message: e.message
      }
    };
  }
}
