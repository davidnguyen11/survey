import { DB, QueryConfig, APIResponse } from '../../../types';
import { Employee } from '../models/employee';

export async function getEmployees(db: DB, args?: any) {
  const query: QueryConfig = {
    text: `
      SELECT * FROM employee e
      WHERE e.active = True
      ORDER BY e.id DESC
    `,
  };

  const response: APIResponse<Employee[]> = {
    status: 'fetching',
  };

  try {
    const result = await db.query(query);
    const data = result.rows.map((item: Employee) => {
      return {
        id: item.id,
        fullName: item.full_name,
        gender: item.gender,
        active: item.active,
        position: item.position,
        isAdmin: item.is_admin,
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
