import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.scrollBy(0, -80);
  }
}

const sectionLinks = [
  { section: 'hero', to: '/', labelKey: 'nav.home' },
  { section: 'pricing', to: '/pricing', labelKey: 'nav.pricing' },
  { section: null, to: '/about', labelKey: 'nav.about' },
  { section: 'faq', to: '/faq', labelKey: 'nav.faq' },
];

export default function PublicNav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isPublic = ['/', '/pricing', '/faq', '/about', '/login', '/register-company'].includes(location.pathname);

  const handleClick = (link: typeof sectionLinks[0]) => {
    setOpen(false);
    if (link.section && location.pathname === '/') {
      scrollToSection(link.section);
    }
  };

  if (!isPublic) return null;

  const isActive = (link: typeof sectionLinks[0]) => {
    if (link.section && location.pathname === '/') return false;
    return location.pathname === link.to;
  };

  const renderLink = (link: typeof sectionLinks[0], mobile: boolean) => {
    if (link.section && location.pathname === '/') {
      return (
        <button key={link.to}
          onClick={() => handleClick(link)}
          className={mobile
            ? `block w-full text-left px-4 py-3 rounded-lg text-sm font-medium ${location.pathname === '/' ? '' : 'text-gray-600'}`
            : `px-4 py-2 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800`
          }
        >
          {t(link.labelKey)}
        </button>
      );
    }
    return (
      <Link key={link.to} to={link.to} onClick={() => mobile && setOpen(false)}
        className={mobile
          ? `block px-4 py-3 rounded-lg text-sm font-medium ${isActive(link) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`
          : `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800'}`
        }
      >
        {t(link.labelKey)}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/images/logo.png" alt="EmployéPro" className="w-9 h-9 rounded-lg object-cover" />
            <span className="font-bold text-gray-800 dark:text-gray-100 text-lg">EmployePro</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-1">
            {sectionLinks.map(link => renderLink(link, false))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSwitcher />
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 px-4 py-2">
              {t('nav.login')}
            </Link>
            <Link to="/register-company" className="bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
              {t('nav.get_started')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-4 px-4 space-y-2">
          {sectionLinks.map(link => renderLink(link, true))}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <div className="px-4 py-2"><LanguageSwitcher /></div>
            <Link to="/login" onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-gray-600">{t('nav.login')}</Link>
            <Link to="/register-company" onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm font-medium bg-blue-600 text-white rounded-lg text-center">{t('nav.get_started')}</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
