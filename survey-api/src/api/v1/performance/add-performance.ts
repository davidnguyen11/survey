import { DB, QueryConfig, APIResponse } from '../../../types';
import { Employee } from '../models/employee';

export async function addPerformance(db: DB, args: any) {
  const { content, rating, employeeId, reviewerId } = args;

  const addReviewQuery: QueryConfig = {
    text: `
      INSERT INTO performance(content, rating, employee_id)
      VALUES($1, $2, $3)
    `,
    values: [content, rating, employeeId],
  };

  const updateStatusReview: QueryConfig = {
    text: `
      UPDATE reviewer_reviewee
      SET status = $1
      WHERE reviewer_id = $2 AND reviewee_id = $3
    `,
    values: ['done', reviewerId, employeeId],
  };

  const response: APIResponse<Employee> = {
    status: 'fetching',
  };

  try {
    await db.query(addReviewQuery);
    await db.query(updateStatusReview);

    response.status = 'success';
  } catch (e) {
    response.status = 'error';
    response.error = {
      message: e.message,
    };
  }

  return response;
}
