import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { 
  DollarSign, Search, Download, CreditCard,
  TrendingUp, Calculator, FileText
} from 'lucide-react';

export default function SalaryPage() {
  const { employees, processPayment, generatePayslip } = useApp();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && emp.status === 'active';
  });

  const totalSalary = employees.filter(e => e.status === 'active').reduce((sum, e) => sum + e.salary, 0);
  const averageSalary = totalSalary / employees.filter(e => e.status === 'active').length || 0;

  const handlePayment = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      processPayment(employeeId, employee.salary);
      setShowPaymentModal(false);
    }
  };

  const handleGenerateAllPayslips = () => {
    employees.filter(e => e.status === 'active').forEach(emp => {
      generatePayslip(emp.id);
    });
    addToast('Tous les bulletins de paie ont été générés !', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Gestion des salaires</h1>
          <p className="text-gray-500 dark:text-gray-400">Gérez les salaires et paiements de vos employés</p>
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Masse salariale totale</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">{(totalSalary / 1000000).toFixed(2)}M</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">FCFA / mois</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-xl">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Salaire moyen</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">{(averageSalary / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">FCFA / mois</p>
            </div>
            <div className="bg-green-500 p-3 rounded-xl">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Employés rémunérés</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                {employees.filter(e => e.status === 'active').length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">ce mois</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-xl">
              <Calculator size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Salary Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Employé</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Salaire de base</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Primes</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Déductions</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Net à payer</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredEmployees.map((employee) => {
                const bonus = employee.salary * 0.1;
                const deductions = employee.salary * 0.15;
                const netSalary = employee.salary + bonus - deductions;
                
                return (
                  <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-100">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{employee.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">
                      {employee.salary.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4 text-green-600 dark:text-green-400">
                      +{bonus.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4 text-red-600">
                      -{deductions.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-100">
                      {netSalary.toLocaleString()} FCFA
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

      {/* Payment Modal */}
      {showPaymentModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Confirmer le paiement</h2>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {(() => {
              const employee = employees.find(e => e.id === selectedEmployee);
              if (!employee) return null;
              const netSalary = employee.salary + employee.salary * 0.1 - employee.salary * 0.15;
              
              return (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{employee.position}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Salaire de base</span>
                        <span className="text-gray-800 dark:text-gray-100">{employee.salary.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Primes</span>
                        <span className="text-green-600 dark:text-green-400">+{(employee.salary * 0.1).toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Déductions</span>
                        <span className="text-red-600">-{(employee.salary * 0.15).toLocaleString()} FCFA</span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-800 dark:text-gray-100">Net à payer</span>
                          <span className="text-blue-600 dark:text-blue-400">{netSalary.toLocaleString()} FCFA</span>
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
          </div>
        </div>
      )}
    </div>
  );
}
