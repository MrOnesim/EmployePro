import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function PublicNav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isPublic = ['/', '/pricing', '/faq', '/about', '/login', '/register-company'].includes(location.pathname);
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  if (!isPublic) return null;

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/pricing', label: t('nav.pricing') },
    { to: '/about', label: t('nav.about') },
    { to: '/faq', label: t('nav.faq') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isLanding && !scrolled
        ? 'bg-transparent border-transparent'
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/images/logo.png" alt="EmployéPro" className="w-9 h-9 rounded-lg object-cover" />
            <span className={`font-bold text-lg transition-colors ${
              isLanding && !scrolled ? 'text-white' : 'text-gray-800 dark:text-gray-100'
            }`}>EmployePro</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map(link => (
              <Link key={link.to} to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? isLanding && !scrolled ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600'
                    : isLanding && !scrolled
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSwitcher />
            <Link to="/login" className={`text-sm font-medium px-4 py-2 transition-colors ${
              isLanding && !scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
            }`}>
              {t('nav.login')}
            </Link>
            <Link to="/register-company" className={`text-sm font-medium px-5 py-2.5 rounded-lg transition-colors ${
              isLanding && !scrolled
                ? 'bg-white text-[#0a0e27] hover:bg-gray-100'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}>
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
        <div className={`md:hidden py-4 px-4 space-y-2 border-t ${
          isLanding && !scrolled ? 'bg-[#0a0e27] border-white/10' : 'bg-white border-gray-100'
        }`}>
          {links.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                location.pathname === link.to
                  ? isLanding && !scrolled ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600'
                  : isLanding && !scrolled ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {link.label}
            </Link>
          ))}
          <div className={`pt-2 space-y-2 ${isLanding && !scrolled ? 'border-t border-white/10' : 'border-t border-gray-100'}`}>
            <div className="px-4 py-2"><LanguageSwitcher /></div>
            <Link to="/login" onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-sm font-medium ${isLanding && !scrolled ? 'text-gray-300' : 'text-gray-600'}`}>{t('nav.login')}</Link>
            <Link to="/register-company" onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-sm font-medium text-center rounded-lg ${
                isLanding && !scrolled
                  ? 'bg-white text-[#0a0e27]'
                  : 'bg-blue-600 text-white'
              }`}>{t('nav.get_started')}</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
