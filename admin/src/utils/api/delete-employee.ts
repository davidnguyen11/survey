import { APIResponse } from '../../models/response';
import { Employee } from '../../models/employee';
import { END_POINT } from '../constants/link';

export async function deleteEmployee(employee: Employee): Promise<APIResponse<Employee[]>> {
  try {
    const res = await fetch(`${END_POINT}/api/v1/employee/`, {
      method: 'delete',
      body: JSON.stringify({
        id: employee.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();
    const { data } = result;

    if (res.status >= 400) {
      throw result;
    }

    return {
      data,
      status: 'success'
    };
  } catch (e) {
    return e;
  }
}
