import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Search, Calendar, Clock, UserCheck, UserX, AlertTriangle, Download, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import { formatTime } from '../utils/format';
import { statusBadge, ATTENDANCE_STATUS_MAP } from '../utils/badgeMappings';
import { exportToCSV } from '../utils/csv';

export default function AttendancePage() {
  const { employees, attendance } = useApp();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const todayAttendance = attendance.filter((a) =>
    new Date(a.date).toDateString() === new Date(selectedDate).toDateString(),
  );

  const presentCount = todayAttendance.filter((a) => a.status === 'present').length;
  const lateCount = todayAttendance.filter((a) => a.status === 'late').length;
  const absentCount = todayAttendance.filter((a) => a.status === 'absent').length;
  const totalHours = todayAttendance.reduce((sum, a) => sum + a.totalHours, 0);
  const overtimeHours = todayAttendance.reduce((sum, a) => sum + a.overtime, 0);

  const filteredAttendance = todayAttendance.filter((a) => {
    const employee = employees.find((e) => e.id === a.employeeId);
    if (!employee) return false;
    return (
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const chartData = [
    { name: 'Présents', value: presentCount, color: '#10B981' },
    { name: 'En retard', value: lateCount, color: '#F59E0B' },
    { name: 'Absents', value: absentCount, color: '#EF4444' },
  ];

  const totalEmployees = employees.filter((e) => e.status === 'active').length;
  const presentLate = presentCount + lateCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des présences</h1>
          <p className="text-gray-500">Suivez les présences et absences de vos employés</p>
        </div>
        <button onClick={() => { exportToCSV(filteredAttendance.map(r => { const e = employees.find(emp => emp.id === r.employeeId); return { ...r, employee: e ? `${e.firstName} ${e.lastName}` : '', department: e?.department || '', date: r.date.toISOString().split('T')[0], checkIn: r.checkIn?.toLocaleTimeString('fr-FR') || '--', checkOut: r.checkOut?.toLocaleTimeString('fr-FR') || '--' }; }), ['Employé', 'Département', 'Date', 'Arrivée', 'Départ', 'Heures', 'Heures sup.', 'Statut'], ['employee', 'department', 'date', 'checkIn', 'checkOut', 'totalHours', 'overtime', 'status'], `presences_${selectedDate}.csv`); addToast('Export CSV réussi', 'success'); }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Download size={18} /><span>Exporter</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Présents', value: presentCount, icon: UserCheck, color: 'bg-green-100 text-green-600' },
          { label: 'En retard', value: lateCount, icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-600' },
          { label: 'Absents', value: absentCount, icon: UserX, color: 'bg-red-100 text-red-600' },
          { label: 'Heures totales', value: `${totalHours.toFixed(1)}h`, icon: Clock, color: 'bg-blue-100 text-blue-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${stat.color}`}><stat.icon size={24} /></div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Répartition aujourd'hui</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Présences cette semaine</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { day: 'Lun', present: 6, late: 1, absent: 1 },
                { day: 'Mar', present: 5, late: 2, absent: 1 },
                { day: 'Mer', present: 7, late: 0, absent: 1 },
                { day: 'Jeu', present: 6, late: 1, absent: 1 },
                { day: 'Ven', present: presentCount, late: lateCount, absent: absentCount },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="late" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Rechercher un employé..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={20} className="text-gray-400" />
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-medium text-gray-600">Employé</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Arrivée</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Pause</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Départ</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Heures</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Heures sup.</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAttendance.map((record) => {
                const employee = employees.find((e) => e.id === record.employeeId);
                if (!employee) return null;
                return (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Avatar firstName={employee.firstName} lastName={employee.lastName} />
                        <div>
                          <p className="font-medium text-gray-800">{employee.firstName} {employee.lastName}</p>
                          <p className="text-sm text-gray-500">{employee.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{formatTime(record.checkIn)}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {record.breakStart ? `${formatTime(record.breakStart)} - ${formatTime(record.breakEnd)}` : '--'}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{formatTime(record.checkOut)}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{record.totalHours}h</td>
                    <td className="px-6 py-4">
                      {record.overtime > 0
                        ? <span className="text-green-600 font-medium">+{record.overtime}h</span>
                        : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-6 py-4">{statusBadge(record.status, ATTENDANCE_STATUS_MAP)}</td>
                  </tr>
                );
              })}
              {employees
                .filter((e) => e.status === 'active' && !todayAttendance.find((a) => a.employeeId === e.id))
                .filter((e) => e.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  e.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((employee) => (
                  <tr key={`absent-${employee.id}`} className="hover:bg-gray-50 transition-colors bg-red-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Avatar firstName={employee.firstName} lastName={employee.lastName} className="bg-red-100 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-800">{employee.firstName} {employee.lastName}</p>
                          <p className="text-sm text-gray-500">{employee.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">--</td>
                    <td className="px-6 py-4 text-gray-400">--</td>
                    <td className="px-6 py-4 text-gray-400">--</td>
                    <td className="px-6 py-4 text-gray-400">0h</td>
                    <td className="px-6 py-4 text-gray-400">-</td>
                    <td className="px-6 py-4"><Badge variant="red">Absent</Badge></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp size={24} />
          <h3 className="font-semibold">Résumé des présences</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><p className="text-blue-200 text-sm">Total heures travaillées</p><p className="text-2xl font-bold">{totalHours.toFixed(1)}h</p></div>
          <div><p className="text-blue-200 text-sm">Heures supplémentaires</p><p className="text-2xl font-bold">{overtimeHours.toFixed(1)}h</p></div>
          <div><p className="text-blue-200 text-sm">Taux de présence</p><p className="text-2xl font-bold">{totalEmployees > 0 ? ((presentLate / totalEmployees) * 100).toFixed(1) : '0'}%</p></div>
          <div><p className="text-blue-200 text-sm">Taux de retard</p><p className="text-2xl font-bold">{(presentLate > 0 ? (lateCount / presentLate * 100) : 0).toFixed(1)}%</p></div>
        </div>
      </div>
    </div>
  );
}
