import { DB, QueryConfig, APIResponse } from '../../../types';
import { Employee } from '../models/employee';
import { getEmployees } from './get-employee';

export async function deleteEmployee(db: DB, args: any) {
  const { id } = args;

  const query: QueryConfig = {
    text: `
      UPDATE employee
      SET active = False
      WHERE id = $1
    `,
    values: [id],
  };

  const response: APIResponse<Employee[]> = {
    status: 'fetching',
  };

  try {
    await db.query(query);

    const { data } = await getEmployees(db);
    response.status = 'success';
    response.data = data;
  } catch (e) {
    response.status = 'error';
    response.error = {
      message: e.message,
    };
  }

  return response;
}
