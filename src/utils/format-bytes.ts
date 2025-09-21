export default function formatBytes(bytes: number, sizes: string[]) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  );
}
