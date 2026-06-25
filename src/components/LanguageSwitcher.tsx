import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'العربية' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.slice(0, 2) || 'fr';

  const cycle = () => {
    const idx = languages.findIndex((l) => l.code === current);
    const next = languages[(idx + 1) % languages.length].code;
    i18n.changeLanguage(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <button
      onClick={cycle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={current === 'fr' ? 'English' : current === 'en' ? 'Français' : 'Français'}
    >
      <Languages size={16} />
      <span>{languages.find((l) => l.code === current)?.label || 'FR'}</span>
    </button>
  );
}
