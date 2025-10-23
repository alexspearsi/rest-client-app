export function ifJson(data: string | Record<string, string>) {
  if (typeof data === 'string') {
    try {
      const parse = JSON.parse(data);
      return JSON.stringify(parse, null, 2);
    } catch {
      return data;
    }
  }
  return JSON.stringify(data, null, 2);
}
