import { APIResponse } from '../../models/response';
import { Performance } from '../../models/performance';
import { END_POINT } from '../constants/link';

export async function getListPerformances(): Promise<APIResponse<Performance[]>> {
  try {
    const res = await fetch(`${END_POINT}/api/v1/performance`);
    const result = await res.json();
    let { data } = result;

    data = data.map((item) => {
      return {
        id: item.id,
        content: item.content,
        rating: item.rating,
        employee: {
          id: item.employee.id,
          fullName: item.employee.full_name,
          gender: item.employee.gender,
          position: item.employee.position
        }
      };
    });

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
