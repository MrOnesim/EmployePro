import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import {
  Search, Calendar, CheckCircle, XCircle, Clock, Filter,
} from 'lucide-react';
import type { Leave } from '../types';
import Avatar from '../components/Avatar';
import Table from '../components/Table';
import { statusBadge, LEAVE_STATUS_MAP, getLeaveTypeLabel } from '../utils/badgeMappings';
import { calculateDays } from '../utils/helpers';

export default function LeavesPage() {
  const { employees, leaves, approveLeave, rejectLeave } = useApp();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredLeaves = leaves.filter((leave) => {
    const employee = employees.find((e) => e.id === leave.employeeId);
    if (!employee) return false;
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || leave.status === statusFilter;
    const matchesType = typeFilter === 'all' || leave.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingLeaves = leaves.filter((l) => l.status === 'pending').length;
  const approvedLeaves = leaves.filter((l) => l.status === 'approved').length;
  const rejectedLeaves = leaves.filter((l) => l.status === 'rejected').length;

  const handleApprove = (leaveId: string) => {
    approveLeave(leaveId);
    addToast('Congé approuvé', 'success');
  };

  const handleReject = (leaveId: string) => {
    rejectLeave(leaveId);
    addToast('Congé refusé', 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Gestion des congés</h1>
        <p className="text-gray-500">Gérez les demandes de congé de vos employés</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total demandes', value: leaves.length, icon: Calendar, color: 'bg-blue-100 text-blue-600', textColor: 'text-gray-800' },
          { label: 'En attente', value: pendingLeaves, icon: Clock, color: 'bg-yellow-100 text-yellow-600', textColor: 'text-yellow-600' },
          { label: 'Approuvés', value: approvedLeaves, icon: CheckCircle, color: 'bg-green-100 text-green-600', textColor: 'text-green-600' },
          { label: 'Refusés', value: rejectedLeaves, icon: XCircle, color: 'bg-red-100 text-red-600', textColor: 'text-red-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvés</option>
              <option value="rejected">Refusés</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">Tous les types</option>
              <option value="annual">Congé annuel</option>
              <option value="sick">Congé maladie</option>
              <option value="maternity">Congé maternité</option>
              <option value="special">Permission spéciale</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table
          columns={[
            {
              key: 'employee',
              header: 'Employé',
              render: (leave: Leave) => {
                const emp = employees.find((e) => e.id === leave.employeeId);
                if (!emp) return null;
                return (
                  <div className="flex items-center space-x-3">
                    <Avatar firstName={emp.firstName} lastName={emp.lastName} />
                    <div>
                      <p className="font-medium text-gray-800">{emp.firstName} {emp.lastName}</p>
                      <p className="text-sm text-gray-500">{emp.department}</p>
                    </div>
                  </div>
                );
              },
            },
            {
              key: 'type',
              header: 'Type',
              render: (leave: Leave) => (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {getLeaveTypeLabel(leave.type)}
                </span>
              ),
            },
            {
              key: 'period',
              header: 'Période',
              render: (leave: Leave) => (
                <span className="text-gray-600">
                  {new Date(leave.startDate).toLocaleDateString('fr-FR')} - {new Date(leave.endDate).toLocaleDateString('fr-FR')}
                </span>
              ),
            },
            {
              key: 'duration',
              header: 'Durée',
              render: (leave: Leave) => <span className="font-medium text-gray-800">{calculateDays(leave.startDate, leave.endDate)} jour(s)</span>,
            },
            {
              key: 'reason',
              header: 'Raison',
              render: (leave: Leave) => <span className="text-gray-600 max-w-[200px] truncate block">{leave.reason}</span>,
            },
            {
              key: 'status',
              header: 'Statut',
              render: (leave: Leave) => statusBadge(leave.status, LEAVE_STATUS_MAP),
            },
            {
              key: 'actions',
              header: 'Actions',
              render: (leave: Leave) => (
                leave.status === 'pending' ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleApprove(leave.id)}
                      className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle size={16} />
                      <span>Approuver</span>
                    </button>
                    <button
                      onClick={() => handleReject(leave.id)}
                      className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      <XCircle size={16} />
                      <span>Refuser</span>
                    </button>
                  </div>
                ) : <span className="text-gray-400 text-sm">-</span>
              ),
            },
          ]}
          data={filteredLeaves}
          emptyMessage="Aucune demande de congé trouvée"
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Calendrier des absences</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + 1 + i);
            const dayLeaves = leaves.filter((l) => {
              const start = new Date(l.startDate);
              const end = new Date(l.endDate);
              return date >= start && date <= end && l.status === 'approved';
            });
            return (
              <div
                key={i}
                className={`text-center py-3 rounded-lg ${
                  dayLeaves.length > 0 ? 'bg-red-50 border border-red-200' :
                  date.toDateString() === new Date().toDateString() ? 'bg-blue-50 border border-blue-200' :
                  'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm text-gray-700">{date.getDate()}</span>
                {dayLeaves.length > 0 && (
                  <div className="mt-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
