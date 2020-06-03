import { DB, QueryConfig, APIResponse } from '../../../types';
import { Employee } from '../models/employee';

export async function updateEmployee(db: DB, args: any) {
  const { id, fullName, gender, position } = args;

  const query: QueryConfig = {
    text: `
      UPDATE employee
      SET full_name = $2, gender = $3, position = $4
      WHERE id = $1
      RETURNING *
    `,
    values: [id, fullName, gender, position],
  };

  const response: APIResponse<Employee> = {
    status: 'fetching',
  };

  try {
    const result = await db.query(query);

    if (result.rowCount > 0) {
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
      response.status = 'success';
      response.data = data;
    }
  } catch (e) {
    response.status = 'error';
    response.error = {
      message: e.message,
    };
  }

  return response;
}
