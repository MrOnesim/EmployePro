import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Search, Filter, Mail, Phone, Edit2, Trash2, UserPlus, Save, Download, CheckSquare, Square } from 'lucide-react';
import type { Department, Employee } from '../types';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import Table from '../components/Table';
import Modal from '../components/Modal';
import EmployeeProfileModal from '../components/EmployeeProfileModal';
import { DEPARTMENTS } from '../constants';
import { statusBadge, EMPLOYEE_STATUS_MAP } from '../utils/badgeMappings';
import { formatCurrency } from '../utils/format';
import { exportToCSV } from '../utils/csv';

export default function EmployeesPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee, sendInvitation, currentCompany } = useApp();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [inviteEmails, setInviteEmails] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [profileEmployee, setProfileEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    dateOfBirth: '', position: '', department: '' as Department | '',
    salary: 0, status: 'active' as const, role: 'employee' as const,
  });

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = !departmentFilter || emp.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const handleInvite = () => {
    const emails = inviteEmails.split('\n').map((e) => e.trim()).filter((e) => e);
    emails.forEach((email) => sendInvitation(email));
    setInviteEmails('');
    setShowInviteModal(false);
    addToast(`Invitation envoyée à ${emails.length} email(s)`, 'success');
  };

  const handleAddEmployee = () => {
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email) return;
    addEmployee({
      companyId: currentCompany?.id || '',
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      email: newEmployee.email,
      phone: newEmployee.phone,
      dateOfBirth: new Date(newEmployee.dateOfBirth),
      position: newEmployee.position,
      department: newEmployee.department as Department,
      photo: '',
      salary: newEmployee.salary,
      status: 'active',
      joinDate: new Date(),
      role: 'employee',
    });
    setNewEmployee({ firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', position: '', department: '', salary: 0, status: 'active', role: 'employee' });
    setShowAddModal(false);
    addToast('Employé ajouté avec succès', 'success');
  };

  const handleEditEmployee = () => {
    if (!selectedEmployee) return;
    updateEmployee(selectedEmployee, {
      position: newEmployee.position,
      department: newEmployee.department as Department,
      salary: newEmployee.salary,
    });
    setShowEditModal(false);
    setSelectedEmployee(null);
    addToast('Employé modifié avec succès', 'success');
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) return;
    deleteEmployee(employeeId);
    addToast('Employé supprimé', 'success');
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Supprimer ${selectedIds.size} employé(s) ?`)) return;
    selectedIds.forEach((id) => deleteEmployee(id));
    addToast(`${selectedIds.size} employé(s) supprimé(s)`, 'success');
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredEmployees.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredEmployees.map((e) => e.id)));
    }
  };

  const openEditModal = (employeeId: string) => {
    const emp = employees.find((e) => e.id === employeeId);
    if (emp) {
      setSelectedEmployee(employeeId);
      setNewEmployee({
        firstName: emp.firstName, lastName: emp.lastName, email: emp.email, phone: emp.phone,
        dateOfBirth: emp.dateOfBirth.toISOString().split('T')[0],
        position: emp.position, department: emp.department as Department,
        salary: emp.salary, status: emp.status as 'active', role: emp.role as 'employee',
      });
      setShowEditModal(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des employés</h1>
          <p className="text-gray-500">{employees.length} employés au total</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => { exportToCSV(employees.map(e => ({ ...e, dateOfBirth: e.dateOfBirth.toISOString(), joinDate: e.joinDate.toISOString() })), ['Prénom', 'Nom', 'Email', 'Poste', 'Département', 'Salaire'], ['firstName', 'lastName', 'email', 'position', 'department', 'salary'], 'employes.csv'); addToast('Export CSV réussi', 'success'); }}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
            <Download size={18} /><span>Export CSV</span>
          </button>
          <button onClick={() => setShowInviteModal(true)}
            className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors">
            <Mail size={18} /><span>Inviter</span>
          </button>
          <button onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <UserPlus size={18} /><span>Ajouter</span>
          </button>
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
            <Filter size={20} className="text-gray-400" />
            <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="">Tous les départements</option>
              {DEPARTMENTS.map((dept) => (<option key={dept} value={dept}>{dept}</option>))}
            </select>
          </div>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3 border border-blue-200 dark:border-blue-800">
          <CheckSquare size={18} className="text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{selectedIds.size} sélectionné(s)</span>
          <button onClick={handleBulkDelete} className="ml-auto flex items-center space-x-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
            <Trash2 size={14} /><span>Supprimer</span>
          </button>
          <button onClick={() => setSelectedIds(new Set())} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium">Annuler</button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <Table
          columns={[
            {
              key: 'select',
              header: (
                <button onClick={toggleSelectAll} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  {selectedIds.size === filteredEmployees.length && filteredEmployees.length > 0 ? <CheckSquare size={16} /> : <Square size={16} />}
                </button>
              ) as unknown as string,
              render: (emp: Employee) => (
                <button onClick={() => toggleSelect(emp.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  {selectedIds.has(emp.id) ? <CheckSquare size={16} className="text-blue-600" /> : <Square size={16} />}
                </button>
              ),
            },
            {
              key: 'employee',
              header: 'Employé',
              render: (emp: Employee) => (
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setProfileEmployee(emp)}>
                  <Avatar firstName={emp.firstName} lastName={emp.lastName} />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{emp.firstName} {emp.lastName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{emp.position}</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'contact',
              header: 'Contact',
              render: (emp: Employee) => (
                <div className="space-y-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200 flex items-center"><Mail size={14} className="mr-2 text-gray-400" />{emp.email}</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 flex items-center"><Phone size={14} className="mr-2 text-gray-400" />{emp.phone}</p>
                </div>
              ),
            },
            {
              key: 'department',
              header: 'Département',
              render: (emp: Employee) => <Badge>{emp.department}</Badge>,
            },
            {
              key: 'position',
              header: 'Poste',
              render: (emp: Employee) => <span className="text-gray-800 dark:text-gray-200">{emp.position}</span>,
            },
            {
              key: 'salary',
              header: 'Salaire',
              render: (emp: Employee) => <span className="font-medium text-gray-800 dark:text-gray-200">{formatCurrency(emp.salary)}</span>,
            },
            {
              key: 'status',
              header: 'Statut',
              render: (emp: Employee) => statusBadge(emp.status, EMPLOYEE_STATUS_MAP),
            },
            {
              key: 'actions',
              header: 'Actions',
              render: (emp: Employee) => (
                <div className="flex items-center space-x-2">
                  <button onClick={() => openEditModal(emp.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDeleteEmployee(emp.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ),
            },
          ]}
          data={filteredEmployees}
          emptyMessage="Aucun employé trouvé"
        />
      </div>

      <Modal open={showInviteModal} onClose={() => setShowInviteModal(false)} title="Inviter des employés">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresses email (une par ligne)</label>
            <textarea value={inviteEmails} onChange={(e) => setInviteEmails(e.target.value)}
              placeholder="email1@exemple.com&#10;email2@exemple.com" rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" />
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
            Les employés recevront un email avec un lien pour créer leur compte.
          </div>
          <button onClick={handleInvite}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Envoyer les invitations
          </button>
        </div>
      </Modal>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Ajouter un employé" maxWidth="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <input type="text" value={newEmployee.firstName} onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input type="text" value={newEmployee.lastName} onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" value={newEmployee.phone} onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
            <input type="date" value={newEmployee.dateOfBirth} onChange={(e) => setNewEmployee({ ...newEmployee, dateOfBirth: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
            <input type="text" value={newEmployee.position} onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
            <select value={newEmployee.department} onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value as Department })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="">Sélectionner</option>
              {DEPARTMENTS.map((dept) => (<option key={dept} value={dept}>{dept}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salaire mensuel (FCFA)</label>
            <input type="number" value={newEmployee.salary} onChange={(e) => setNewEmployee({ ...newEmployee, salary: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <button onClick={handleAddEmployee}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Ajouter l'employé
          </button>
        </div>
      </Modal>

      <Modal open={showEditModal} onClose={() => setShowEditModal(false)} title="Modifier l'employé">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
            <input type="text" value={newEmployee.position} onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
            <select value={newEmployee.department} onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value as Department })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              {DEPARTMENTS.map((dept) => (<option key={dept} value={dept}>{dept}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salaire mensuel (FCFA)</label>
            <input type="number" value={newEmployee.salary} onChange={(e) => setNewEmployee({ ...newEmployee, salary: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <button onClick={handleEditEmployee}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <Save size={18} /><span>Enregistrer</span>
          </button>
        </div>
      </Modal>

      {profileEmployee && <EmployeeProfileModal employee={profileEmployee} onClose={() => setProfileEmployee(null)} />}
    </div>
  );
}
