import { DB, QueryConfig, APIResponse } from '../../../types';
import { Employee } from '../models/employee';

export async function getEmployeeReviewees(db: DB, employeeId: string) {
  const query: QueryConfig = {
    text: `
      SELECT e.*
      FROM employee e, reviewer_reviewee r
      WHERE e.active = True AND e.id = r.reviewee_id AND
            r.reviewer_id = ${employeeId} AND r.status = 'pending'
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
