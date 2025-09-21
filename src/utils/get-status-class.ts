export function getStatusClass(status: number) {
  if (status >= 200 && status < 300) return 'text-status-success-foreground';
  if (status >= 300 && status < 400) return 'text-status-redirect-foreground';
  if (status >= 400 && status < 500) return 'text-status-error-foreground';
  if (status >= 500) return 'text-status-server-error-foreground';
  return '';
}

export function getStatusBgClass(status: number) {
  if (status >= 200 && status < 300) return 'bg-status-success-foreground';
  if (status >= 300 && status < 400) return 'bg-status-redirect-foreground';
  if (status >= 400 && status < 500) return 'bg-status-error-foreground';
  if (status >= 500) return 'bg-status-server-error-foreground';
  return '';
}
