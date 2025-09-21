export default function getMethodColor(method: string) {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'bg-method-get text-method-get-foreground';
    case 'POST':
      return 'bg-method-post text-method-post-foreground';
    case 'PUT':
      return 'bg-method-put text-method-put-foreground';
    case 'PATCH':
      return 'bg-method-patch text-method-patch-foreground';
    case 'DELETE':
      return 'bg-method-delete text-method-delete-foreground';
    default:
      return '';
  }
}
