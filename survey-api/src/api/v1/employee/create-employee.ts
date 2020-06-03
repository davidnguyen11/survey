import { DB, QueryConfig, APIResponse } from '../../../types';
import { Employee } from '../models/employee';

export async function createEmployee(db: DB, args: any) {
  const { fullName, gender, position } = args;

  const query: QueryConfig = {
    text: `
      INSERT INTO employee(full_name, gender, active, position)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
    values: [fullName, gender, true, position],
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
