import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function PublicNav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isPublic = ['/', '/pricing', '/faq', '/about', '/login', '/register-company'].includes(location.pathname);
  if (!isPublic) return null;

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/pricing', label: t('nav.pricing') },
    { to: '/about', label: t('nav.about') },
    { to: '/faq', label: t('nav.faq') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/images/logo.png" alt="EmployéPro" className="w-9 h-9 rounded-lg object-cover" />
            <span className="font-bold text-gray-800 text-lg">EmployePro</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map(link => (
              <Link key={link.to} to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSwitcher />
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-800 px-4 py-2">
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
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2">
          {links.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                location.pathname === link.to ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}>
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 space-y-2">
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
