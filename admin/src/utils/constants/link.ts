/*
 * Need to add production domain when it has
 */
export const END_POINT =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'http://localhost:4000';
