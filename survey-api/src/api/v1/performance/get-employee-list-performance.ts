import { DB, QueryConfig, APIResponse } from '../../../types';
import { Performance } from '../models/performance';
import { Employee } from '../models/employee';

export async function getEmployeePerformances(db: DB, employeeId: string) {
  const query: QueryConfig = {
    text: `
      SELECT p.*
      FROM performance p, employee e
      WHERE p.employee_id = e.id AND p.employee_id = ${employeeId} AND e.active = True
    `,
  };

  const response: APIResponse<Performance[]> = {
    status: 'fetching',
  };

  try {
    /*
     * Will support pagination
     */
    const result = await db.query(query);
    const data = result.rows.map((item: Performance) => {
      return {
        id: item.id,
        content: item.content,
        rating: item.rating,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      };
    });

    response.data = data;
    response.status = 'success';
  } catch (e) {
    response.status = 'error';
    response.error = {
      message: e.message,
    };
  }

  return response;
}
