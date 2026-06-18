import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Calendar, Plus, Clock, CheckCircle } from 'lucide-react';
import type { Leave } from '../types';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { statusBadge, LEAVE_STATUS_MAP, getLeaveTypeLabel } from '../utils/badgeMappings';
import { calculateDays } from '../utils/helpers';

export default function EmployeeLeavesPage() {
  const { currentUser, leaves, requestLeave } = useApp();
  const { addToast } = useToast();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [newLeave, setNewLeave] = useState({ type: 'annual', startDate: '', endDate: '', reason: '' });

  const myLeaves = leaves
    .filter((l) => l.employeeId === currentUser?.id)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  const pendingLeaves = myLeaves.filter((l) => l.status === 'pending').length;
  const totalLeaveDays = 20;
  const usedLeaveDays = myLeaves
    .filter((l) => l.status === 'approved' && l.type === 'annual')
    .reduce((sum, l) => sum + calculateDays(l.startDate, l.endDate), 0);
  const remainingDays = totalLeaveDays - usedLeaveDays;

  const handleSubmitLeave = () => {
    if (!newLeave.startDate || !newLeave.endDate || !newLeave.reason) return;
    requestLeave({
      employeeId: currentUser?.id || '',
      type: newLeave.type as 'annual' | 'sick' | 'maternity' | 'special',
      startDate: new Date(newLeave.startDate),
      endDate: new Date(newLeave.endDate),
      reason: newLeave.reason,
      status: 'pending',
    });
    setNewLeave({ type: 'annual', startDate: '', endDate: '', reason: '' });
    setShowRequestModal(false);
    addToast('Demande de congé envoyée', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mes congés</h1>
          <p className="text-gray-500">Gérez vos demandes de congé</p>
        </div>
        <button onClick={() => setShowRequestModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Plus size={18} /><span>Nouvelle demande</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Jours restants', value: `${remainingDays}j`, icon: Calendar, color: 'bg-blue-100 text-blue-600', valColor: 'text-gray-800' },
          { label: 'Jours utilisés', value: `${usedLeaveDays}j`, icon: CheckCircle, color: 'bg-green-100 text-green-600', valColor: 'text-green-600' },
          { label: 'En attente', value: pendingLeaves, icon: Clock, color: 'bg-yellow-100 text-yellow-600', valColor: 'text-yellow-600' },
          { label: 'Total demandes', value: myLeaves.length, icon: Calendar, color: 'bg-purple-100 text-purple-600', valColor: 'text-gray-800' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${stat.color}`}><stat.icon size={24} /></div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.valColor}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Solde de congés</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full transition-all" style={{ width: `${(usedLeaveDays / totalLeaveDays) * 100}%` }} />
          </div>
          <span className="text-sm font-medium text-gray-600">{usedLeaveDays} / {totalLeaveDays} jours</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Historique des demandes</h3></div>
        <Table
          columns={[
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
          ]}
          data={myLeaves}
          emptyMessage="Vous n'avez pas encore de demande de congé"
        />
      </div>

      <Modal open={showRequestModal} onClose={() => setShowRequestModal(false)} title="Nouvelle demande">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de congé *</label>
            <select value={newLeave.type} onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="annual">Congé annuel</option>
              <option value="sick">Congé maladie</option>
              <option value="maternity">Congé maternité</option>
              <option value="special">Permission spéciale</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de début *</label>
              <input type="date" value={newLeave.startDate} onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin *</label>
              <input type="date" value={newLeave.endDate} onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Raison *</label>
            <textarea value={newLeave.reason} onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
              placeholder="Décrivez la raison de votre demande..." rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" />
          </div>
          <button onClick={handleSubmitLeave}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Soumettre la demande
          </button>
        </div>
      </Modal>
    </div>
  );
}
