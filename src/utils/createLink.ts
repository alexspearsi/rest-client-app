export function createLink(
  array: string[],
  headers: Record<string, string>,
): string {
  return (
    array.join('/').replace(/%3D/g, '=') +
    '?' +
    new URLSearchParams(headers).toString()
  );
}
