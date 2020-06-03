import { DB, QueryConfig, APIResponse } from '../../../types';
import { Employee } from '../models/employee';

export async function deleteEmployee(db: DB, args: any) {
  const { id } = args;

  const query: QueryConfig = {
    text: `
      UPDATE employee
      SET active = False
      WHERE id = $1
      RETURNING *
    `,
    values: [id],
  };

  const response: APIResponse<Employee> = {
    status: 'fetching',
  };

  try {
    await db.query(query);
    response.status = 'success';
  } catch (e) {
    response.status = 'error';
    response.error = {
      message: e.message,
    };
  }

  return response;
}
