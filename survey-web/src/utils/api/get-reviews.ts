import { APIResponse } from '../../models/response';
import { Performance } from '../../models/performance';
import { END_POINT } from '../constants/link';

export async function getReviews(employeeID: string): Promise<APIResponse<Performance[]>> {
  try {
    const res = await fetch(`${END_POINT}/api/v1/employee/${employeeID}/performances`);
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
