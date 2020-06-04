export interface APIResponse<T> {
  status: 'fetching' | 'success' | 'error';
  data?: T;
  error?: {
    message: string;
  };
}
