export type RequestItem = {
  id: string;
  statusCode: number;
  statusText: string;
  method: string;
  resSize: number;
  reqSize: number;
  duration: number;
  timestamp: number;
  data: unknown;
  error: string | null;
  url: string;
};
