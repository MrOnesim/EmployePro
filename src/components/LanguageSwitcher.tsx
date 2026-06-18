import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const lng = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const toggle = () => {
    const next = lng === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
  };

  return (
    <button onClick={toggle}
      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={lng === 'fr' ? 'English' : 'Français'}>
      <Languages size={16} />
      <span>{lng === 'fr' ? 'EN' : 'FR'}</span>
    </button>
  );
}
