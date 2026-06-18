import { cn } from '../utils/cn';

interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export default function Avatar({ firstName, lastName, size = 'md', className }: AvatarProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  return (
    <div className={cn('bg-blue-100 rounded-full flex items-center justify-center', sizeMap[size], className)}>
      <span className="text-blue-600 font-medium">{initials}</span>
    </div>
  );
}
