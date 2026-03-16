import { cn } from '@/utils/cn';

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trendText?: string;
  trendUp?: boolean;
  iconBgClass: string;
  iconColorClass: string;
  Icon: React.ComponentType<{ className?: string; size?: number }>;
  TrendIcon?: React.ComponentType<{ className?: string; size?: number }>;
  trendColorClass?: string;
  className?: string;
}

export function KpiCard({
  title,
  value,
  subtitle,
  trendText,
  trendUp,
  iconBgClass,
  iconColorClass,
  Icon,
  TrendIcon,
  trendColorClass,
  className,
}: KpiCardProps) {
  return (
    <div className={cn(
      'bg-white rounded-xl border border-neutral-200 shadow-sm p-5',
      'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1.5 font-display">{value}</p>
          {subtitle && (
            <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className={cn('p-2.5 rounded-xl flex-shrink-0', iconBgClass)}>
          <Icon className={iconColorClass} size={18} />
        </div>
      </div>
      {TrendIcon && trendText && (
        <div className="mt-3 flex items-center gap-1">
          <TrendIcon className={cn('flex-shrink-0', trendColorClass)} size={12} />
          <span className={cn('text-xs font-medium', trendColorClass)}>{trendText}</span>
        </div>
      )}
    </div>
  );
}
