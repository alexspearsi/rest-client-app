export function getSize(string: string): number {
  return new TextEncoder().encode(string).length;
}
