import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import {
  Users, UserCheck, UserX, DollarSign, Wallet, Calendar,
  Clock, AlertTriangle, Plus, ArrowDownToLine, Landmark, BookOpen, Plane, Store, FileCheck,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { formatCurrency } from '../utils/format';

export default function AdminDashboard() {
  const { employees, attendance, leaves, currentCompany, approveLeave, rejectLeave, deposit, bankAccounts, transactions, enrollments, missions, jobPosts, taxDeclarations, expenses } = useApp();
  const { addToast } = useToast();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);

  const activeEmployees = employees.filter((e) => e.status === 'active').length;
  const pendingLeaves = leaves.filter((l) => l.status === 'pending').length;
  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);

  const todayAttendance = attendance.filter((a) => {
    const today = new Date();
    return new Date(a.date).toDateString() === today.toDateString();
  });

  const presentToday = todayAttendance.filter((a) => a.status === 'present').length;
  const lateToday = todayAttendance.filter((a) => a.status === 'late').length;
  const absentToday = todayAttendance.filter((a) => a.status === 'absent').length;

  const companyBalance = currentCompany?.balance || 0;
  const balanceRatio = totalSalary > 0 ? (companyBalance / totalSalary) * 100 : 0;

  const stats = [
    { label: 'Total Employés', value: employees.length, icon: Users, color: 'bg-blue-500', change: '+2 ce mois', changeType: 'positive' as const },
    { label: 'Employés Actifs', value: activeEmployees, icon: UserCheck, color: 'bg-green-500', change: `${presentToday} aujourd'hui`, changeType: 'positive' as const },
    { label: 'Masse Salariale', value: `${(totalSalary / 1000000).toFixed(1)}M`, suffix: 'FCFA', icon: DollarSign, color: 'bg-orange-500', change: '-5% vs mois dernier', changeType: 'negative' as const },
    { label: 'Solde Disponible', value: formatCurrency(companyBalance), suffix: 'FCFA', icon: Wallet, color: 'bg-purple-500', change: balanceRatio >= 100 ? 'Suffisant' : `${balanceRatio.toFixed(0)}% de la masse`, changeType: balanceRatio >= 100 ? 'positive' as const : 'warning' as const },
    { label: 'Congés en attente', value: pendingLeaves, icon: Calendar, color: 'bg-yellow-500', change: pendingLeaves > 0 ? 'À traiter' : 'Tout traité', changeType: pendingLeaves > 0 ? 'warning' as const : 'positive' as const },
    { label: "Retards aujourd'hui", value: lateToday, icon: AlertTriangle, color: 'bg-red-500', change: lateToday > 0 ? 'Attention' : 'Aucun retard', changeType: lateToday > 0 ? 'negative' as const : 'positive' as const },
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Bonjour, {currentCompany?.ownerFirstName} !</h1>
            <p className="text-blue-100">Voici le résumé de votre entreprise aujourd'hui</p>
          </div>
          <button onClick={() => setShowDepositModal(true)}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl font-medium transition-all backdrop-blur-sm border border-white/20">
            <Plus size={18} /><span>Approvisionner</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Vue d'ensemble des modules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Landmark size={22} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Banking</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{bankAccounts.length} / {transactions.length}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <BookOpen size={22} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Formation</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{enrollments.filter(e => e.status === 'in_progress').length} en cours</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Plane size={22} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Missions</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{missions.filter(m => m.status === 'pending').length} en attente</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Store size={22} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Marketplace</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{jobPosts.filter(p => p.status === 'published').length} offres</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Évolution des salaires (en millions FCFA)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorSalaries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                <Area type="monotone" dataKey="salaries" stroke="#2563EB" fillOpacity={1} fill="url(#colorSalaries)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Répartition par département</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
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
                  <span className="text-gray-600">{dept.name}</span>
                </div>
                <span className="font-medium">{dept.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Présences aujourd'hui</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <UserCheck size={20} className="text-white" />
                </div>
                <span className="ml-3 font-medium text-gray-800">Présents</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{presentToday}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-white" />
                </div>
                <span className="ml-3 font-medium text-gray-800">En retard</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{lateToday}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <UserX size={20} className="text-white" />
                </div>
                <span className="ml-3 font-medium text-gray-800">Absents</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{absentToday}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Activité récente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                  <activity.icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">{activity.message}</p>
                  <p className="text-gray-500 text-xs">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Prochaines échéances</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
                <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">Congés en attente</span>
              </div>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{pendingLeaves}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <FileCheck size={20} className="text-white" />
                </div>
                <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">Déclarations fiscales</span>
              </div>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{taxDeclarations.filter(t => t.status !== 'paid').length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <DollarSign size={20} className="text-white" />
                </div>
                <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">Dépenses non approuvées</span>
              </div>
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">{expenses.filter(e => e.status === 'pending').length}</span>
            </div>
          </div>
        </div>
      </div>

      {companyBalance < totalSalary && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-amber-800 font-medium">Solde insuffisant</p>
            <p className="text-amber-700 text-sm">Votre solde ({formatCurrency(companyBalance)}) est inférieur à la masse salariale ({formatCurrency(totalSalary)}). <button onClick={() => setShowDepositModal(true)} className="underline font-medium">Approvisionner</button></p>
          </div>
        </div>
      )}

      {pendingLeaves > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Demandes de congé en attente</h3>
            <Badge variant="yellow">{pendingLeaves} en attente</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-3 font-medium">Employé</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Période</th>
                  <th className="pb-3 font-medium">Raison</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaves
                  .filter((l) => l.status === 'pending')
                  .slice(0, 3)
                  .map((leave) => {
                    const employee = employees.find((e) => e.id === leave.employeeId);
                    if (!employee) return null;
                    return (
                      <tr key={leave.id}>
                        <td className="py-3">
                          <div className="flex items-center">
                            <Avatar firstName={employee.firstName} lastName={employee.lastName} size="sm" className="mr-3" />
                            <span className="font-medium text-gray-800">
                              {employee.firstName} {employee.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-600">
                          {leave.type === 'annual' ? 'Annuel' :
                            leave.type === 'sick' ? 'Maladie' :
                            leave.type === 'maternity' ? 'Maternité' : 'Spécial'}
                        </td>
                        <td className="py-3 text-gray-600">
                          {new Date(leave.startDate).toLocaleDateString('fr-FR')} - {new Date(leave.endDate).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-3 text-gray-600 max-w-[200px] truncate">{leave.reason}</td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <button onClick={() => approveLeave(leave.id)} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200">
                              Approuver
                            </button>
                            <button onClick={() => rejectLeave(leave.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200">
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
      <Modal open={showDepositModal} onClose={() => setShowDepositModal(false)} title="Approvisionner le compte" maxWidth="sm">
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
            <p className="font-medium mb-1">Solde actuel : {formatCurrency(companyBalance)}</p>
            <p>Entrez le montant à déposer sur le compte de l'entreprise pour payer les salaires.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant (FCFA)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="number" value={depositAmount || ''} onChange={(e) => setDepositAmount(parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-medium" placeholder="500000" min={0} />
            </div>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => { setDepositAmount(500000); }} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">50 000</button>
            <button onClick={() => { setDepositAmount(1000000); }} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">100 000</button>
            <button onClick={() => { setDepositAmount(5000000); }} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">500 000</button>
            <button onClick={() => { setDepositAmount(10000000); }} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">1 000 000</button>
          </div>
          <button onClick={() => { if (depositAmount > 0) { deposit(depositAmount); setShowDepositModal(false); setDepositAmount(0); addToast(`${formatCurrency(depositAmount)} déposé avec succès`, 'success'); } }}
            disabled={depositAmount <= 0}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
            <ArrowDownToLine size={18} /><span>Déposer {depositAmount > 0 ? formatCurrency(depositAmount) : ''}</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
