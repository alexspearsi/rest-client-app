export function bodyToBase64(
  data: string,
): [string | null, Record<string, string>] {
  if (!data.length)
    return [null, { 'Content-Type': 'text/html; charset=utf-8' }];

  try {
    const parse = JSON.parse(data);
    const json = JSON.stringify(parse, null, 2);
    return [
      `/${btoa(encodeURIComponent(json))}`,
      { 'Content-Type': 'application/json; charset=utf-8' },
    ];
  } catch {
    return [
      `/${btoa(encodeURIComponent(data))}`,
      { 'Content-Type': 'text/html; charset=utf-8' },
    ];
  }
}
