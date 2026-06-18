import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import {
  DollarSign, Search, Download, CreditCard,
  TrendingUp, Calculator, FileText, Wallet, AlertTriangle,
} from 'lucide-react';
import Avatar from '../components/Avatar';
import Modal from '../components/Modal';
import { calculateNetSalary, calculateBonus, calculateDeductions } from '../utils/salary';
import { formatCurrency, formatShortSalary } from '../utils/format';
import { MONTHS } from '../constants';

export default function SalaryPage() {
  const { employees, payslips, currentCompany, processPayment, generatePayslip } = useApp();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const paidThisPeriod = new Set(
    payslips
      .filter((p) => p.month === selectedMonth + 1 && p.year === selectedYear)
      .map((p) => p.employeeId),
  );

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && emp.status === 'active';
  });

  const companyBalance = currentCompany?.balance || 0;
  const totalSalary = employees.filter((e) => e.status === 'active').reduce((sum, e) => sum + e.salary, 0);
  const averageSalary = totalSalary / employees.filter((e) => e.status === 'active').length || 0;

  const handlePayment = (employeeId: string) => {
    const employee = employees.find((e) => e.id === employeeId);
    if (employee) {
      const success = processPayment(employeeId, employee.salary);
      setShowPaymentModal(false);
      if (success) {
        addToast(`Paiement de ${formatCurrency(employee.salary)} effectué`, 'success');
      } else {
        addToast('Solde insuffisant pour effectuer ce paiement', 'error');
      }
    }
  };

  const handleGenerateAllPayslips = () => {
    employees.filter((e) => e.status === 'active').forEach((emp) => {
      generatePayslip(emp.id);
    });
    addToast('Tous les bulletins de paie ont été générés', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des salaires</h1>
          <p className="text-gray-500">Gérez les salaires et paiements de vos employés</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleGenerateAllPayslips}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            <FileText size={18} />
            <span>Générer bulletins</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <Download size={18} />
            <span>Exporter Excel</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Masse salariale totale', value: formatShortSalary(totalSalary), suffix: 'FCFA / mois', icon: DollarSign, color: 'bg-blue-500' },
          { label: 'Salaire moyen', value: formatShortSalary(averageSalary), suffix: 'FCFA / mois', icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Solde entreprise', value: formatCurrency(companyBalance), suffix: 'FCFA', icon: Wallet, color: companyBalance >= totalSalary ? 'bg-green-500' : 'bg-red-500' },
          { label: 'Employés rémunérés', value: employees.filter((e) => e.status === 'active').length, suffix: 'ce mois', icon: Calculator, color: 'bg-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.suffix}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {companyBalance < totalSalary && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
          <p className="text-amber-800 text-sm font-medium">Solde insuffisant — vous ne pourrez pas payer tous les employés. Solde : {formatCurrency(companyBalance)} / Masse salariale : {formatCurrency(totalSalary)}</p>
        </div>
      )}

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
          <div className="flex space-x-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {MONTHS.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-medium text-gray-600">Employé</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Salaire de base</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Primes</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Déductions</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Net à payer</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Statut</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map((employee) => {
                const bonus = calculateBonus(employee.salary);
                const deductions = calculateDeductions(employee.salary);
                const netSalary = calculateNetSalary(employee.salary);
                return (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Avatar firstName={employee.firstName} lastName={employee.lastName} />
                        <div>
                          <p className="font-medium text-gray-800">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{employee.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {formatCurrency(employee.salary)}
                    </td>
                    <td className="px-6 py-4 text-green-600">
                      +{formatCurrency(bonus)}
                    </td>
                    <td className="px-6 py-4 text-red-600">
                      -{formatCurrency(deductions)}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {formatCurrency(netSalary)}
                    </td>
                    <td className="px-6 py-4">
                      {paidThisPeriod.has(employee.id) ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Payé</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">En attente</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedEmployee(employee.id);
                            setShowPaymentModal(true);
                          }}
                          className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          <CreditCard size={16} />
                          <span>Payer</span>
                        </button>
                        <button className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                          <Download size={16} />
                          <span>Bulletin</span>
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

      <Modal open={showPaymentModal} onClose={() => { setShowPaymentModal(false); setSelectedEmployee(null); }} title="Confirmer le paiement" maxWidth="md">
        {selectedEmployee && (() => {
          const employee = employees.find((e) => e.id === selectedEmployee);
          if (!employee) return null;
          const netSalary = calculateNetSalary(employee.salary);
          return (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar firstName={employee.firstName} lastName={employee.lastName} size="lg" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{employee.position}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Salaire de base</span>
                    <span className="text-gray-800">{formatCurrency(employee.salary)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Primes</span>
                    <span className="text-green-600">+{formatCurrency(calculateBonus(employee.salary))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Déductions</span>
                    <span className="text-red-600">-{formatCurrency(calculateDeductions(employee.salary))}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-800">Net à payer</span>
                      <span className="text-blue-600">{formatCurrency(netSalary)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handlePayment(selectedEmployee)}
                  className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Confirmer le paiement
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
