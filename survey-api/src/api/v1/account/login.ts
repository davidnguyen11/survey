import { DB, QueryConfig, APIResponse } from '../../../types';
import { Employee } from '../models/employee';

export async function login(db: DB, args: any) {
  const { username, password } = args;

  const query: QueryConfig = {
    text: `
      SELECT e.*
      FROM account a, employee e
      where a.username = $1 AND a.password = $2 AND e.full_name = a.full_name
    `,
    values: [username, password],
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

      /*
       * Here we can integrate with "JWT" to response back to user the
       * encode token
       * https://jwt.io/
       */

      response.status = 'success';
      response.data = data[0];
    }
  } catch (e) {
    response.status = 'error';
    response.error = {
      message: e.message,
    };
  }

  return response;
}
