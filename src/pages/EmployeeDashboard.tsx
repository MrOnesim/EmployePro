import { useApp } from '../context/AppContext';
import {
  Clock, Play, Pause, Square, Calendar, FileText,
  DollarSign, TrendingUp, CheckCircle, MapPin,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { formatTime } from '../utils/format';
import type { GPSLocation } from '../types';

export default function EmployeeDashboard() {
  const { currentUser, attendance, leaves, payslips, clockIn, startBreak, endBreak, clockOut } = useApp();

  const todayAttendance = attendance.find((a) => {
    const today = new Date();
    return a.employeeId === currentUser?.id &&
      new Date(a.date).toDateString() === today.toDateString();
  });

  const isWorking = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;
  const isOnBreak = !!todayAttendance?.breakStart && !todayAttendance?.breakEnd;

  const myLeaves = leaves.filter((l) => l.employeeId === currentUser?.id);
  const pendingLeaves = myLeaves.filter((l) => l.status === 'pending').length;
  const approvedLeaves = myLeaves.filter((l) => l.status === 'approved').length;
  const myPayslips = payslips.filter((p) => p.employeeId === currentUser?.id);

  const getGPSLocation = (): Promise<GPSLocation | undefined> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) return resolve(undefined);
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve(undefined),
        { timeout: 5000 },
      );
    });
  };

  const handleClockIn = async () => {
    const gpsLocation = await getGPSLocation();
    clockIn(gpsLocation);
  };
  const handleStartBreak = () => startBreak();
  const handleEndBreak = () => endBreak();
  const handleClockOut = async () => {
    const gpsLocation = await getGPSLocation();
    clockOut(gpsLocation);
  };

  const stats = [
    { label: "Heures aujourd'hui", value: todayAttendance?.totalHours ? `${todayAttendance.totalHours}h` : '0h', icon: Clock, color: 'bg-blue-500' },
    { label: 'Heures sup.', value: todayAttendance?.overtime ? `${todayAttendance.overtime}h` : '0h', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Congés restants', value: `${20 - approvedLeaves}j`, icon: Calendar, color: 'bg-orange-500' },
    { label: 'Dernière paie', value: currentUser?.salary ? `${(currentUser.salary / 1000).toFixed(0)}K` : '0', icon: DollarSign, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">
          Bonjour, {currentUser?.firstName} !
        </h1>
        <p className="text-blue-100">
          {new Date().toLocaleDateString('fr-FR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Pointage</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Arrivée', time: todayAttendance?.checkIn },
                { label: 'Début pause', time: todayAttendance?.breakStart },
                { label: 'Fin pause', time: todayAttendance?.breakEnd },
                { label: 'Départ', time: todayAttendance?.checkOut },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-gray-800">{formatTime(item.time)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            {!todayAttendance && (
              <button onClick={handleClockIn}
                className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors">
                <Play size={20} /><span>Pointer l'arrivée</span>
              </button>
            )}
            {todayAttendance && !isOnBreak && isWorking && (
              <button onClick={handleStartBreak}
                className="flex items-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-yellow-600 transition-colors">
                <Pause size={20} /><span>Pause</span>
              </button>
            )}
            {isOnBreak && (
              <button onClick={handleEndBreak}
                className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors">
                <Play size={20} /><span>Reprendre</span>
              </button>
            )}
            {isWorking && !isOnBreak && todayAttendance?.checkIn && (
              <button onClick={handleClockOut}
                className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors">
                <Square size={20} /><span>Pointer le départ</span>
              </button>
            )}
          </div>
        </div>

        {todayAttendance && (
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnBreak ? 'bg-yellow-500 animate-pulse' : isWorking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm font-medium text-gray-600">
                {isOnBreak ? 'En pause' : isWorking ? 'En travail' : 'Journée terminée'}
              </span>
            </div>
            {(todayAttendance.gpsCheckIn || todayAttendance.gpsCheckOut) && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin size={12} /> GPS
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Mon historique récent</h3>
          <div className="space-y-3">
            {attendance
              .filter((a) => a.employeeId === currentUser?.id)
              .slice(-5)
              .reverse()
              .map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      record.status === 'present' ? 'bg-green-500' :
                      record.status === 'late' ? 'bg-yellow-500' :
                      record.status === 'absent' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-800">{record.totalHours}h</span>
                    {record.overtime > 0 && (
                      <span className="text-xs text-green-600 ml-2">+{record.overtime}h sup</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Actions en attente</h3>
          <div className="space-y-3">
            {pendingLeaves > 0 && (
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                <Calendar className="text-yellow-600 mr-3" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{pendingLeaves} demande(s) de congé en attente</p>
                  <p className="text-xs text-gray-500">En cours de validation</p>
                </div>
              </div>
            )}
            {myPayslips.length > 0 && (
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <FileText className="text-green-600 mr-3" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Nouveau bulletin disponible</p>
                  <p className="text-xs text-gray-500">Téléchargez votre dernier bulletin</p>
                </div>
              </div>
            )}
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="text-blue-600 mr-3" size={20} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Profil à jour</p>
                <p className="text-xs text-gray-500">Toutes vos informations sont à jour</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
