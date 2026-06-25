import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { canAccessMenu } from '../utils/permissions';
import { 
  Home, Users, DollarSign, Clock, Calendar, FileText, 
  Settings, LogOut, Bell, Menu, X, MessageSquare, User,
  TrendingUp, PartyPopper, File, Bot, BarChart3, Sun, Moon,
  QrCode, Landmark, GraduationCap, UserPlus, Briefcase, Receipt,
  Award, PiggyBank, Shield, Monitor, Heart, Target, GitBranch,
  Video, Upload, Rss, CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center w-full px-4 py-2.5 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition-all group"
    >
      {theme === 'dark' ? <Sun size={18} className="mr-3" /> : <Moon size={18} className="mr-3" />}
      <span className="font-medium text-sm">{theme === 'dark' ? 'Mode clair' : 'Mode sombre'}</span>
    </button>
  );
}

export default function Layout() {
  const { currentUser, currentCompany, logout, notifications, markNotificationRead } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const isAdmin = currentUser?.role === 'admin';
  
  const adminMenuItems = [
    { path: '/admin', icon: Home, label: 'Tableau de bord' },
    { path: '/admin/onboarding', icon: CheckCircle2, label: 'Onboarding' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { path: '/feed', icon: Rss, label: 'Fil d\'actualité' },
    { path: '/admin/employees', icon: Users, label: 'Employés' },
    { path: '/admin/org-chart', icon: GitBranch, label: 'Organigramme' },
    { path: '/admin/teams', icon: Users, label: 'Équipes' },
    { path: '/admin/attendance', icon: Clock, label: 'Présences' },
    { path: '/admin/leaves', icon: Calendar, label: 'Congés' },
    { path: '/admin/leave-policy', icon: Calendar, label: 'Politique congés' },
    { path: '/admin/payslips', icon: FileText, label: 'Bulletins de paie' },
    { path: '/admin/salary', icon: DollarSign, label: 'Salaires' },
    { path: '/admin/performance', icon: TrendingUp, label: 'Performance' },
    { path: '/admin/objectives', icon: Target, label: 'Objectifs' },
    { path: '/admin/recruitment', icon: UserPlus, label: 'Recrutement' },
    { path: '/admin/training', icon: GraduationCap, label: 'Formations' },
    { path: '/admin/missions', icon: Briefcase, label: 'Missions & Notes' },
    { path: '/admin/banking', icon: Landmark, label: 'Banque' },
    { path: '/admin/tax', icon: Receipt, label: 'Déclarations fiscales' },
    { path: '/admin/fintech', icon: PiggyBank, label: 'Banque salariale' },
    { path: '/admin/rewards', icon: Award, label: 'Récompenses' },
    { path: '/admin/equipment', icon: Monitor, label: 'Équipements' },
    { path: '/admin/vault', icon: Shield, label: 'Coffre-fort' },
    { path: '/admin/wellness', icon: Heart, label: 'Bien-être' },
    { path: '/admin/meetings', icon: Video, label: 'Réunions' },
    { path: '/admin/documents', icon: File, label: 'Documents' },
    { path: '/admin/import', icon: Upload, label: 'Import' },
    { path: '/admin/calendar', icon: PartyPopper, label: 'Calendrier' },
    { path: '/admin/reports', icon: BarChart3, label: 'Rapports' },
    { path: '/admin/ai-assistant', icon: Bot, label: 'Assistant IA' },
    { path: '/admin/qr-settings', icon: QrCode, label: 'Pointage QR' },
    { path: '/admin/roles', icon: Shield, label: 'Rôles & Permissions' },
    { path: '/admin/settings', icon: Settings, label: 'Paramètres' },
  ];
  
  const employeeMenuItems = [
    { path: '/employee-dashboard', icon: Home, label: 'Tableau de bord' },
    { path: '/feed', icon: Rss, label: 'Fil d\'actualité' },
    { path: '/employee-dashboard/attendance', icon: Clock, label: 'Pointage' },
    { path: '/employee-dashboard/leaves', icon: Calendar, label: 'Congés' },
    { path: '/employee-dashboard/payslips', icon: FileText, label: 'Bulletins de paie' },
    { path: '/employee-dashboard/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/employee-dashboard/notifications', icon: Bell, label: 'Notifications' },
    { path: '/employee-dashboard/calendar', icon: PartyPopper, label: 'Calendrier' },
    { path: '/employee-dashboard/settings', icon: Settings, label: 'Paramètres' },
  ];
  
  const menuItems = (isAdmin ? adminMenuItems : employeeMenuItems).filter(item => {
    return canAccessMenu(currentUser?.role, item.path);
  });
  const unreadNotifications = notifications.filter(n => !n.read && n.userId === currentUser?.id);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-blue-700 
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 bg-blue-800/50">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">EP</span>
              </div>
              <span className="text-white font-semibold text-lg hidden sm:block">EmployéPro</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-white lg:hidden"
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Company Info */}
          <div className="px-4 py-4 border-b border-blue-500/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {currentCompany?.name.charAt(0) || 'E'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{currentCompany?.name}</p>
                <p className="text-blue-200 text-xs">{currentCompany?.uniqueId}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && item.path !== '/admin' && location.pathname.startsWith(item.path + '/'));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'}
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Dark Mode Toggle */}
          <div className="p-2 border-t border-blue-500/50">
            <DarkModeToggle />
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-blue-500/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <p className="text-blue-200 text-xs truncate">{currentUser?.position}</p>
              </div>
          <button 
            onClick={handleLogout}
            className="text-blue-200 hover:text-white transition-colors"
            aria-label="Déconnexion"
          >
            <LogOut size={20} />
          </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between px-4 lg:px-6">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1 lg:flex-none">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {menuItems.find(item => 
                item.path === location.pathname || 
                (item.path !== '/' && location.pathname.startsWith(item.path))
              )?.label || 'Tableau de bord'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.filter(n => n.userId === currentUser?.id).length === 0 ? (
                      <p className="p-4 text-gray-500 text-center">Aucune notification</p>
                    ) : (
                      notifications
                        .filter(n => n.userId === currentUser?.id)
                        .slice(0, 5)
                        .map((notification) => (
                          <div 
                            key={notification.id}
                            onClick={() => markNotificationRead(notification.id)}
                            className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <p className="font-medium text-gray-800">{notification.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                          </div>
                        ))
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                    <Link
                      to={isAdmin ? '/admin/notifications' : '/employee-dashboard/notifications'}
                      onClick={() => setNotificationsOpen(false)}
                      className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Voir toutes les notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">
                  {currentUser?.firstName.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
