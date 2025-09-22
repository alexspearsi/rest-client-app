export function bodyToBase64(
  data: string,
): [string | null, Record<string, string>] {
  if (!data.length)
    return [null, { 'Content-Type': 'text/html; charset=utf-8' }];

  try {
    const parse = JSON.parse(data);
    const json = JSON.stringify(parse, null, 2);
    return [
      `/${encodeData(json)}`,
      { 'Content-Type': 'application/json; charset=utf-8' },
    ];
  } catch {
    return [
      `/${encodeData(data)}`,
      { 'Content-Type': 'text/html; charset=utf-8' },
    ];
  }
}

export function encodeData(data: string) {
  return btoa(encodeURIComponent(data));
}

export function decodeData(data: string) {
  if (typeof data === 'string') {
    const string = data.replace(/%3D/g, '=');
    return decodeURIComponent(atob(string));
  }
  return decodeURIComponent(atob(data));
}
