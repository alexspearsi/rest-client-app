export function pickStatusColor(status: number): string {
  if (status >= 200 && status < 300)
    return 'text-status-success-foreground bg-status-success';
  if (status >= 300 && status < 400)
    return 'text-status-redirect-foreground bg-status-redirect';
  if (status >= 400 && status < 600)
    return 'text-status-error-foreground bg-status-error';
  return '';
}

export function pickSizeColor(size: number): string {
  if (size >= 0 && size < 2048) return 'text-success-foreground';
  if (size >= 2048 && size < 5e6) return 'text-warning-foreground';
  if (size >= 5e6) return 'text-danger-foreground';
  return '';
}

export function pickTimeColor(time: number): string {
  if (time >= 0 && time < 2000) return 'text-success-foreground';
  if (time > 2000 && time < 5000) return 'text-warning-foreground';
  if (time > 5000) return 'text-danger-foreground';
  return '';
}
