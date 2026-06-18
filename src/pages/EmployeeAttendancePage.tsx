import { useApp } from '../context/AppContext';
import { Clock, Calendar, TrendingUp, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Attendance } from '../types';
import { formatTime } from '../utils/format';
import Table from '../components/Table';
import { statusBadge, ATTENDANCE_STATUS_MAP } from '../utils/badgeMappings';

export default function EmployeeAttendancePage() {
  const { currentUser, attendance } = useApp();

  const myAttendance = attendance
    .filter((a) => a.employeeId === currentUser?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const todayAttendance = myAttendance.find((a) =>
    new Date(a.date).toDateString() === new Date().toDateString(),
  );

  const totalHoursThisMonth = myAttendance
    .filter((a) => new Date(a.date).getMonth() === new Date().getMonth())
    .reduce((sum, a) => sum + a.totalHours, 0);

  const overtimeThisMonth = myAttendance
    .filter((a) => new Date(a.date).getMonth() === new Date().getMonth())
    .reduce((sum, a) => sum + a.overtime, 0);

  const avgHours = myAttendance.length > 0
    ? myAttendance.reduce((sum, a) => sum + a.totalHours, 0) / myAttendance.length
    : 0;

  const weeklyData = [
    { day: 'Lun', hours: 8 },
    { day: 'Mar', hours: 7.5 },
    { day: 'Mer', hours: 8.5 },
    { day: 'Jeu', hours: 7 },
    { day: 'Ven', hours: todayAttendance?.totalHours || 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Mon historique de pointage</h1>
        <p className="text-gray-500">Consultez votre historique de présence</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Aujourd'hui", value: `${todayAttendance?.totalHours || 0}h`, icon: Clock, color: 'bg-blue-100 text-blue-600' },
          { label: 'Ce mois', value: `${totalHoursThisMonth.toFixed(1)}h`, icon: Calendar, color: 'bg-green-100 text-green-600' },
          { label: 'Heures sup.', value: `${overtimeThisMonth.toFixed(1)}h`, icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
          { label: 'Moyenne/jour', value: `${avgHours.toFixed(1)}h`, icon: CheckCircle, color: 'bg-purple-100 text-purple-600' },
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

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Mes heures cette semaine</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }} />
              <Bar dataKey="hours" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {todayAttendance && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-4">Détails d'aujourd'hui</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Arrivée', value: formatTime(todayAttendance.checkIn) },
              { label: 'Pause', value: todayAttendance.breakStart ? `${formatTime(todayAttendance.breakStart)} - ${formatTime(todayAttendance.breakEnd)}` : '--:--' },
              { label: 'Départ', value: formatTime(todayAttendance.checkOut) },
              { label: 'Total', value: `${todayAttendance.totalHours}h` },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-lg p-4">
                <p className="text-blue-200 text-sm">{item.label}</p>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Historique récent</h3></div>
        <Table
          columns={[
            {
              key: 'date',
              header: 'Date',
              render: (record: Attendance) => (
                <span className="text-gray-800">
                  {new Date(record.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
              ),
            },
            {
              key: 'checkIn',
              header: 'Arrivée',
              render: (record: Attendance) => <span className="font-medium text-gray-800">{formatTime(record.checkIn)}</span>,
            },
            {
              key: 'break',
              header: 'Pause',
              render: (record: Attendance) => (
                <span className="text-gray-600">
                  {record.breakStart ? `${formatTime(record.breakStart)} - ${formatTime(record.breakEnd)}` : '--'}
                </span>
              ),
            },
            {
              key: 'checkOut',
              header: 'Départ',
              render: (record: Attendance) => <span className="font-medium text-gray-800">{formatTime(record.checkOut)}</span>,
            },
            {
              key: 'hours',
              header: 'Heures',
              render: (record: Attendance) => (
                <span>
                  <span className="font-medium text-gray-800">{record.totalHours}h</span>
                  {record.overtime > 0 && <span className="text-green-600 text-sm ml-1">+{record.overtime}h</span>}
                </span>
              ),
            },
            {
              key: 'status',
              header: 'Statut',
              render: (record: Attendance) => statusBadge(record.status, ATTENDANCE_STATUS_MAP),
            },
          ]}
          data={myAttendance.slice(0, 10)}
          emptyMessage="Aucun historique disponible"
        />
      </div>
    </div>
  );
}
