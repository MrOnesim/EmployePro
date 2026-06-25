import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle' | 'row';
}

const variantClasses = {
  text: 'h-4 w-full rounded',
  card: 'h-48 w-full rounded-2xl',
  circle: 'h-12 w-12 rounded-full',
  row: 'h-16 w-full rounded-xl',
};

export default function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-gray-200', variantClasses[variant], className)}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-2xl border border-gray-100 p-5">
      <Skeleton variant="circle" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="text" />
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton variant="circle" className="h-8 w-8 shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
      <Skeleton variant="text" className="w-20" />
    </div>
  );
}
