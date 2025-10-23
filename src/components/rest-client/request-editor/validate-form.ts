import { z, ZodObject } from 'zod';
import { toast } from 'sonner';

export function validateForm<T>(schema: ZodObject, data: T) {
  try {
    schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      let message = '';
      for (const item of error.issues) {
        message += item.message + '\n';
      }

      toast.error(message);
      return false;
    }
  }
  return true;
}
