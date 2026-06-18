import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { canAccessMenu } from '../utils/permissions';
import { 
  Home, Users, DollarSign, Clock, Calendar, FileText, 
  Settings, LogOut, Bell, Menu, X, MessageSquare, User,
  TrendingUp, PartyPopper, File, Bot, BarChart3, UsersRound, Rss, Upload,
  Sun, Moon, Briefcase, Target, Landmark, BookOpen, Plane,
  Store, GitBranch, Video, Shield, Gift, Monitor, Heart, Wallet,
  FileSignature,
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const { currentUser, currentCompany, logout, notifications, markNotificationRead } = useApp();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const isAdmin = currentUser?.role === 'admin';
  
  const adminMenuItems = [
    { path: '/admin', icon: Home, label: 'Tableau de bord' },
    { path: '/admin/employees', icon: Users, label: 'Employés' },
    { path: '/admin/teams', icon: UsersRound, label: 'Équipes' },
    { path: '/admin/feed', icon: Rss, label: 'Fil d\'actualité' },
    { path: '/admin/import', icon: Upload, label: 'Import CSV' },
    { path: '/admin/salary', icon: DollarSign, label: 'Salaires' },
    { path: '/admin/attendance', icon: Clock, label: 'Présences' },
    { path: '/admin/leaves', icon: Calendar, label: 'Congés' },
    { path: '/admin/payslips', icon: FileText, label: 'Bulletins de paie' },
    { path: '/admin/performance', icon: TrendingUp, label: 'Performance' },
    { path: '/admin/recruitment', icon: Briefcase, label: 'Recrutement' },
    { path: '/admin/objectives', icon: Target, label: 'Objectifs' },
    { path: '/admin/documents', icon: File, label: 'Documents' },
    { path: '/admin/calendar', icon: PartyPopper, label: 'Calendrier' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/admin/reports', icon: BarChart3, label: 'Rapports' },
    { path: '/admin/meetings', icon: Video, label: 'Réunions' },
    { path: '/admin/banking', icon: Landmark, label: 'Banque' },
    { path: '/admin/tax', icon: FileText, label: 'Fiscalité' },
    { path: '/admin/training', icon: BookOpen, label: 'Formation' },
    { path: '/admin/missions', icon: Plane, label: 'Missions' },
    { path: '/admin/marketplace', icon: Store, label: 'Marketplace' },
    { path: '/admin/org-chart', icon: GitBranch, label: 'Organigramme' },
    { path: '/admin/vault', icon: Shield, label: 'Coffre-fort' },
    { path: '/admin/rewards', icon: Gift, label: 'Récompenses' },
    { path: '/admin/equipment', icon: Monitor, label: 'Matériel' },
    { path: '/admin/wellness', icon: Heart, label: 'Bien-être' },
    { path: '/admin/fintech', icon: Wallet, label: 'Banque Fintech' },
    { path: '/admin/signatures', icon: FileSignature, label: 'Signature' },
    { path: '/admin/ai-assistant', icon: Bot, label: 'Assistant IA' },
    { path: '/admin/settings', icon: Settings, label: 'Paramètres' },
  ];
  
  const employeeMenuItems = [
    { path: '/employee', icon: Home, label: 'Tableau de bord' },
    { path: '/employee/attendance', icon: Clock, label: 'Pointage' },
    { path: '/employee/leaves', icon: Calendar, label: 'Congés' },
    { path: '/employee/payslips', icon: FileText, label: 'Bulletins de paie' },
    { path: '/employee/vault', icon: Shield, label: 'Coffre-fort' },
    { path: '/employee/rewards', icon: Gift, label: 'Récompenses' },
    { path: '/employee/equipment', icon: Monitor, label: 'Mon matériel' },
    { path: '/employee/wellness', icon: Heart, label: 'Bien-être' },
    { path: '/employee/fintech', icon: Wallet, label: 'Banque Fintech' },
    { path: '/employee/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/employee/calendar', icon: PartyPopper, label: 'Calendrier' },
    { path: '/employee/settings', icon: Settings, label: 'Paramètres' },
  ];
  
  const menuItems = (isAdmin ? adminMenuItems : employeeMenuItems).filter(
    item => canAccessMenu(currentUser?.role, item.path)
  );
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
              <img src="/images/logo.png" alt="EmployéPro" className="w-10 h-10 rounded-xl object-cover" />
              <span className="text-white font-semibold text-lg hidden sm:block">EmployéPro</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-white lg:hidden"
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
              const isActive = location.pathname === item.path;
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
                title="Déconnexion"
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

          <div className="flex items-center space-x-2">
            {/* Dark mode toggle */}
            <button onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Bell size={20} />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 z-50">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800">
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
                            className={`p-4 border-b border-gray-50 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                            }`}
                          >
                            <p className="font-medium text-gray-800 dark:text-gray-100">{notification.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-medium text-sm">
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
