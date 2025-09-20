export function getStatusClass(status: number) {
  if (status >= 500) {
    return 'text-destructive font-medium';
  }

  if (status >= 400) {
    return 'text-yellow-600 dark:text-yellow-400 font-medium';
  }

  if (status >= 200) {
    return 'text-green-600 dark:text-green-400 font-medium';
  }
}
