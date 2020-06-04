import { DB, QueryConfig, APIResponse } from '../../../types';
import { Employee } from '../models/employee';

export async function getDetailEmployee(db: DB, employeeId: string) {
  const query: QueryConfig = {
    text: `
      SELECT * FROM employee e
      WHERE e.active = True and e.id = ${employeeId}
    `,
  };

  const response: APIResponse<Employee[]> = {
    status: 'fetching',
  };

  try {
    const res = await db.query(query);
    const data = res.rows.map((item: Employee) => {
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


    const result = data.length === 1 ? data[0] : null;

    response.data = result;
    response.status = 'success';
  } catch (e) {
    response.status = 'error';
    response.error = {
      message: e.message,
    };
  }

  return response;
}
