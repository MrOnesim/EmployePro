import { useApp } from '../context/AppContext';
import { 
  Users, UserCheck, UserX, DollarSign, Wallet, Calendar,
  Clock, AlertTriangle, ArrowUpRight, ArrowDownRight, Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { employees, attendance, leaves, currentCompany } = useApp();
  const navigate = useNavigate();
  const [showKpiSettings, setShowKpiSettings] = useState(false);
  const [kpiTargets, setKpiTargets] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem('kpi_targets');
      return stored ? JSON.parse(stored) : { employees: 30, salary: 15, attendance: 95, balance: 50 };
    } catch { return { employees: 30, salary: 15, attendance: 95, balance: 50 }; }
  });

  useEffect(() => {
    localStorage.setItem('kpi_targets', JSON.stringify(kpiTargets));
  }, [kpiTargets]);

  const activeEmployees = employees.filter(e => e.status === 'active').length;
  // const _inactiveEmployees = employees.filter(e => e.status === 'inactive').length;
  const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
  
  const todayAttendance = attendance.filter(a => {
    const today = new Date();
    return new Date(a.date).toDateString() === today.toDateString();
  });
  
  const presentToday = todayAttendance.filter(a => a.status === 'present').length;
  const lateToday = todayAttendance.filter(a => a.status === 'late').length;
  const absentToday = todayAttendance.filter(a => a.status === 'absent').length;

  const stats = [
    {
      label: 'Total Employés',
      value: employees.length,
      icon: Users,
      color: 'bg-blue-500',
      change: `Objectif: ${kpiTargets.employees}`,
      changeType: employees.length >= kpiTargets.employees ? 'positive' : 'warning',
      link: '/admin/employees'
    },
    {
      label: 'Employés Actifs',
      value: activeEmployees,
      icon: UserCheck,
      color: 'bg-green-500',
      change: `${presentToday} aujourd'hui`,
      changeType: 'positive',
      link: '/admin/attendance'
    },
    {
      label: 'Masse Salariale',
      value: `${(totalSalary / 1000000).toFixed(1)}M`,
      suffix: 'FCFA',
      icon: DollarSign,
      color: 'bg-orange-500',
      change: `Objectif: ${kpiTargets.salary}M`,
      changeType: (totalSalary / 1000000) <= kpiTargets.salary ? 'positive' : 'negative',
      link: '/admin/salary'
    },
    {
      label: 'Solde Disponible',
      value: `${((currentCompany?.balance || 0) / 1000000).toFixed(1)}M`,
      suffix: 'FCFA',
      icon: Wallet,
      color: 'bg-purple-500',
      change: `Objectif: ${kpiTargets.balance}M`,
      changeType: (currentCompany?.balance || 0) / 1000000 >= kpiTargets.balance ? 'positive' : 'negative',
      link: '/admin/banking'
    },
    {
      label: 'Congés en attente',
      value: pendingLeaves,
      icon: Calendar,
      color: 'bg-yellow-500',
      change: pendingLeaves > 0 ? 'À traiter' : 'Tout traité',
      changeType: pendingLeaves > 0 ? 'warning' : 'positive',
      link: '/admin/leaves'
    },
    {
      label: 'Retards aujourd\'hui',
      value: lateToday,
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: lateToday > 0 ? 'Attention' : 'Aucun retard',
      changeType: lateToday > 0 ? 'negative' : 'positive',
      link: '/admin/attendance'
    }
  ];

  const monthlyData = [
    { name: 'Jan', salaries: 8.5, employees: 20 },
    { name: 'Fév', salaries: 9.2, employees: 22 },
    { name: 'Mar', salaries: 8.8, employees: 21 },
    { name: 'Avr', salaries: 10.1, employees: 23 },
    { name: 'Mai', salaries: 9.5, employees: 24 },
    { name: 'Jun', salaries: 10.8, employees: 25 },
  ];

  const departmentData = [
    { name: 'Informatique', value: 3, color: '#2563EB' },
    { name: 'Marketing', value: 2, color: '#10B981' },
    { name: 'Finance', value: 1, color: '#F59E0B' },
    { name: 'RH', value: 1, color: '#8B5CF6' },
    { name: 'Direction', value: 1, color: '#EF4444' },
  ];

  const recentActivity = [
    { id: 1, type: 'attendance', message: 'Kwame Adjei est arrivé en retard', time: '9h15', icon: Clock, color: 'text-orange-500' },
    { id: 2, type: 'leave', message: 'Ama Gbeko a demandé un congé', time: '10h30', icon: Calendar, color: 'text-blue-500' },
    { id: 3, type: 'payment', message: 'Paie effectuée pour Yaw Boakye', time: '14h00', icon: DollarSign, color: 'text-green-500' },
    { id: 4, type: 'attendance', message: 'Kossi Amoussou a pointé', time: '8h02', icon: UserCheck, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Bonjour, {currentCompany?.ownerFirstName} ! 👋</h1>
            <p className="text-blue-100">Voici le résumé de votre entreprise aujourd'hui</p>
          </div>
          <button onClick={() => setShowKpiSettings(true)} className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm">
            <Target size={16} />Objectifs KPI
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
            <div key={index} onClick={() => navigate(stat.link)} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                <div className="flex items-baseline space-x-1 mt-1">
                  <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</span>
                  {stat.suffix && <span className="text-gray-500 dark:text-gray-400 text-sm">{stat.suffix}</span>}
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm">
              {stat.changeType === 'positive' && <ArrowUpRight size={16} className="text-green-500 mr-1" />}
              {stat.changeType === 'negative' && <ArrowDownRight size={16} className="text-red-500 mr-1" />}
              <span className={`
                ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : ''}
                ${stat.changeType === 'negative' ? 'text-red-600 dark:text-red-400' : ''}
                ${stat.changeType === 'warning' ? 'text-yellow-600' : ''}
              `}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Évolution des salaires (en millions FCFA)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorSalaries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="salaries" 
                  stroke="#2563EB" 
                  fillOpacity={1} 
                  fill="url(#colorSalaries)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Répartition par département</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: dept.color }} />
                  <span className="text-gray-600 dark:text-gray-300">{dept.name}</span>
                </div>
                <span className="font-medium">{dept.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Attendance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Présences aujourd'hui</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <UserCheck size={20} className="text-white" />
                </div>
                <span className="ml-3 font-medium text-gray-800 dark:text-gray-100">Présents</span>
              </div>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{presentToday}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-white" />
                </div>
                <span className="ml-3 font-medium text-gray-800 dark:text-gray-100">En retard</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{lateToday}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <UserX size={20} className="text-white" />
                </div>
                <span className="ml-3 font-medium text-gray-800 dark:text-gray-100">Absents</span>
              </div>
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">{absentToday}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Activité récente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                  <activity.icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-100 text-sm">{activity.message}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Leaves */}
      {pendingLeaves > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Demandes de congé en attente</h3>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              {pendingLeaves} en attente
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                  <th className="pb-3 font-medium">Employé</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Période</th>
                  <th className="pb-3 font-medium">Raison</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {leaves
                  .filter(l => l.status === 'pending')
                  .slice(0, 3)
                  .map((leave) => {
                    const employee = employees.find(e => e.id === leave.employeeId);
                    return (
                      <tr key={leave.id}>
                        <td className="py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                                {employee?.firstName.charAt(0)}{employee?.lastName.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-gray-800 dark:text-gray-100">
                              {employee?.firstName} {employee?.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-600 dark:text-gray-300">
                          {leave.type === 'annual' ? 'Annuel' : 
                           leave.type === 'sick' ? 'Maladie' :
                           leave.type === 'maternity' ? 'Maternité' : 'Spécial'}
                        </td>
                        <td className="py-3 text-gray-600 dark:text-gray-300">
                          {new Date(leave.startDate).toLocaleDateString('fr-FR')} - {new Date(leave.endDate).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-3 text-gray-600 dark:text-gray-300 max-w-[200px] truncate">{leave.reason}</td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200">
                              Approuver
                            </button>
                            <button className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200">
                              Refuser
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KPI Targets Modal */}
      {showKpiSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Objectifs KPI</h3>
            <div className="space-y-4">
              {[
                { key: 'employees', label: 'Effectif cible', suffix: 'employés', value: kpiTargets.employees },
                { key: 'salary', label: 'Masse salariale max', suffix: 'M FCFA', value: kpiTargets.salary },
                { key: 'balance', label: 'Solde minimum', suffix: 'M FCFA', value: kpiTargets.balance },
              ].map(item => (
                <div key={item.key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{item.label}</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={item.value} onChange={e => setKpiTargets(prev => ({ ...prev, [item.key]: parseFloat(e.target.value) || 0 }))}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200" />
                    <span className="text-sm text-gray-500 whitespace-nowrap">{item.suffix}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowKpiSettings(false)} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">Fermer</button>
              <button onClick={() => { setShowKpiSettings(false); }} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
