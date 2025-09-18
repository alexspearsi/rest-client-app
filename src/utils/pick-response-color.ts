export function pickStatusColor(status: number): string {
  if (status >= 200 && status < 300) return 'text-success';
  if (status >= 300 && status < 400) return 'text-warning';
  if (status >= 400 && status < 600) return 'text-danger';
  return '';
}

export function pickSizeColor(size: number): string {
  if (size >= 0 && size < 2048) return 'text-success';
  if (size >= 2048 && size < 5e6) return 'text-warning';
  if (size >= 5e6) return 'text-danger';
  return '';
}

export function pickTimeColor(time: number): string {
  if (time >= 0 && time < 2000) return 'text-success';
  if (time > 2000 && time < 5000) return 'text-warning';
  if (time > 5000) return 'text-danger';
  return '';
}
