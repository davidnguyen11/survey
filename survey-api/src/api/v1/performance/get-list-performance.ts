import { DB, QueryConfig, APIResponse } from '../../../types';
import { Performance } from '../models/performance';
import { Employee } from '../models/employee';

export async function getPerformances(db: DB, args?: any) {
  const query: QueryConfig = {
    text: `
      SELECT p.*, e.full_name, e.gender, e.position
      FROM performance p, employee e
      WHERE p.employee_id = e.id AND e.active = True
    `,
  };

  const response: APIResponse<Performance[]> = {
    status: 'fetching',
  };

  try {
    const result = await db.query(query);
    const data = result.rows.map((item: Performance & Employee) => {
      const { full_name, gender, position, employee_id } = item;

      return {
        id: item.id,
        content: item.content,
        rating: item.rating,
        employee: {
          full_name,
          gender,
          position,
          id: employee_id,
        },
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
