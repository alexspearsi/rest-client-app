export async function copyToClipBoard(value: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.error(error);
  }
}
