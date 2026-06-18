import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  suffix?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'warning';
}

export default function StatCard({ label, value, icon: Icon, color, suffix, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
            {suffix && <span className="text-gray-500 text-sm">{suffix}</span>}
          </div>
        </div>
        <div className={`${color} p-3 rounded-xl`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      {change && (
        <div className="mt-3 flex items-center text-sm">
          {changeType === 'positive' && <ArrowUpRight size={16} className="text-green-500 mr-1" />}
          {changeType === 'negative' && <ArrowDownRight size={16} className="text-red-500 mr-1" />}
          <span
            className={
              changeType === 'positive'
                ? 'text-green-600'
                : changeType === 'negative'
                  ? 'text-red-600'
                  : changeType === 'warning'
                    ? 'text-yellow-600'
                    : 'text-gray-500'
            }
          >
            {change}
          </span>
        </div>
      )}
    </div>
  );
}
