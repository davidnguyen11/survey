import { END_POINT } from '../constants/link';
import { Performance } from '../../models/performance';

export async function addReview(revieweeId: string, reviewerId: string, review: Performance) {
  try {
    const postData = {
      reviewerId,
      content: review.content,
      rating: review.rating,
      employeeId: revieweeId
    };

    const res = await fetch(`${END_POINT}/api/v1/performance`, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();

    if (res.status >= 400) {
      throw result;
    }

    return {
      status: 'success'
    };
  } catch (e) {
    return e;
  }
}
