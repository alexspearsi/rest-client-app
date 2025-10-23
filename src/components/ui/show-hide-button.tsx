import { Eye, EyeOff } from 'lucide-react';

export default function ShowHideButton({
  className,
  show = false,
  onClick,
}: {
  className?: string;
  show?: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      {show ? <Eye className={className} /> : <EyeOff className={className} />}
    </button>
  );
}
