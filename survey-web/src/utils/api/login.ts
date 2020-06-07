import { END_POINT } from '../constants/link';

export async function login(username: string, password: string) {
  try {
    const postData = {
      username,
      password
    };

    const res = await fetch(`${END_POINT}/api/v1/login`, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    if (res.status >= 400) {
      throw data;
    }

    return data;
  } catch (e) {
    return e;
  }
}
