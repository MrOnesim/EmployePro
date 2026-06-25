import { useRegion } from '../context/RegionContext';
import { Globe, Flag } from 'lucide-react';

export default function RegionSwitcher() {
  const { region, setRegion, regions } = useRegion();

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <Globe size={16} />
        <span>{region.currency}</span>
      </button>
      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {regions.map((r) => (
          <button
            key={r.code}
            onClick={() => setRegion(r)}
            className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 first:rounded-t-xl last:rounded-b-xl ${
              region.code === r.code ? 'font-bold text-blue-600' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Flag size={16} className="shrink-0" />
            <span>{r.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
