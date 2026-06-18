import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { FileText, Download, Printer, Calendar, DollarSign, Eye } from 'lucide-react';
import Avatar from '../components/Avatar';
import Modal from '../components/Modal';
import { MONTHS } from '../constants';
import { formatCurrency } from '../utils/format';
import { exportToCSV } from '../utils/csv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PayslipsPage() {
  const { currentUser, employees, payslips } = useApp();
  const { addToast } = useToast();
  const isAdmin = currentUser?.role === 'admin';
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showPreview, setShowPreview] = useState<string | null>(null);

  const myPayslips = isAdmin ? payslips : payslips.filter((p) => p.employeeId === currentUser?.id);
  const filteredPayslips = myPayslips.filter((p) => p.year === selectedYear);

  const totalNet = filteredPayslips.reduce((sum, p) => sum + p.netSalary, 0);
  const lastPayslip = filteredPayslips[filteredPayslips.length - 1];

  const previewRef = useRef<HTMLDivElement>(null);

  const getPayslipById = (id: string) => payslips.find((p) => p.id === id);
  const getEmployeeById = (id: string) => employees.find((e) => e.id === id);

  const handleDownloadPDF = async (payslipId: string) => {
    setShowPreview(payslipId);
    await new Promise((r) => setTimeout(r, 100));
    const el = previewRef.current;
    if (!el) { addToast('Erreur lors de la génération PDF', 'error'); return; }
    try {
      const canvas = await html2canvas(el, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      const payslip = getPayslipById(payslipId);
      const employee = payslip ? getEmployeeById(payslip.employeeId) : null;
      pdf.save(`bulletin_${employee?.lastName || 'paie'}_${payslip?.month}_${payslip?.year}.pdf`);
      addToast('PDF téléchargé', 'success');
    } catch {
      addToast('Erreur lors de la génération PDF', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bulletins de paie</h1>
          <p className="text-gray-500">
            {isAdmin ? 'Gérez les bulletins de paie de vos employés' : 'Consultez vos bulletins de paie'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
          <button onClick={() => { exportToCSV(filteredPayslips.map(p => ({ ...p, generatedAt: p.generatedAt.toISOString(), employee: getEmployeeById(p.employeeId)?.firstName + ' ' + getEmployeeById(p.employeeId)?.lastName })), ['Employé', 'Période', 'Salaire brut', 'Primes', 'Déductions', 'Net'], ['employee', 'month', 'basicSalary', 'bonuses', 'deductions', 'netSalary'], `bulletins_${selectedYear}.csv`); addToast('Export CSV réussi', 'success'); }}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm">
            <Download size={16} /><span>CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total bulletins', value: filteredPayslips.length, icon: FileText, bg: 'bg-blue-100 text-blue-600', valColor: 'text-gray-800' },
          { label: 'Total net payé', value: `${(totalNet / 1000000).toFixed(2)}M`, suffix: 'FCFA', icon: DollarSign, bg: 'bg-green-100 text-green-600', valColor: 'text-gray-800' },
          { label: 'Dernier bulletin', value: lastPayslip ? `${MONTHS[lastPayslip.month - 1]} ${lastPayslip.year}` : 'Aucun', icon: Calendar, bg: 'bg-purple-100 text-purple-600', valColor: 'text-gray-800' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${stat.bg}`}><stat.icon size={24} /></div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.valColor}`}>{stat.value}</p>
                {'suffix' in stat && <p className="text-xs text-gray-500">{stat.suffix}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {isAdmin && <th className="text-left px-6 py-4 font-medium text-gray-600">Employé</th>}
                <th className="text-left px-6 py-4 font-medium text-gray-600">Période</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Salaire brut</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Primes</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Déductions</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Net à payer</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayslips.map((payslip) => {
                const employee = getEmployeeById(payslip.employeeId);
                return (
                  <tr key={payslip.id} className="hover:bg-gray-50 transition-colors">
                    {isAdmin && (
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar firstName={employee?.firstName || ''} lastName={employee?.lastName || ''} />
                          <div>
                            <p className="font-medium text-gray-800">{employee?.firstName} {employee?.lastName}</p>
                            <p className="text-sm text-gray-500">{employee?.position}</p>
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4"><span className="font-medium text-gray-800">{MONTHS[payslip.month - 1]} {payslip.year}</span></td>
                    <td className="px-6 py-4 text-gray-800">{formatCurrency(payslip.basicSalary)}</td>
                    <td className="px-6 py-4 text-green-600">+{formatCurrency(payslip.bonuses)}</td>
                    <td className="px-6 py-4 text-red-600">-{formatCurrency(payslip.deductions)}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{formatCurrency(payslip.netSalary)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => setShowPreview(payslip.id)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Aperçu">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => handleDownloadPDF(payslip.id)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Télécharger PDF">
                          <Download size={18} />
                        </button>
                        <button onClick={() => { setShowPreview(payslip.id); setTimeout(() => window.print(), 300); }} className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Imprimer">
                          <Printer size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredPayslips.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">Aucun bulletin disponible pour cette période</p>
          </div>
        )}
      </div>

      <Modal open={!!showPreview} onClose={() => setShowPreview(null)} title="Bulletin de paie" maxWidth="lg">
        {(() => {
          const payslip = showPreview ? getPayslipById(showPreview) : null;
          const employee = payslip ? getEmployeeById(payslip.employeeId) : null;
          if (!payslip || !employee) return null;
          return (
            <div>
              <div ref={previewRef} className="border border-gray-200 rounded-lg p-6">
                <div className="text-center border-b border-gray-200 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-blue-600">EmployéPro Africa</h3>
                  <p className="text-sm text-gray-500">Bulletin de paie</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div><p className="text-sm text-gray-500">Nom complet</p><p className="font-medium">{employee.firstName} {employee.lastName}</p></div>
                  <div><p className="text-sm text-gray-500">Poste</p><p className="font-medium">{employee.position}</p></div>
                  <div><p className="text-sm text-gray-500">Département</p><p className="font-medium">{employee.department}</p></div>
                  <div><p className="text-sm text-gray-500">Période</p><p className="font-medium">{MONTHS[payslip.month - 1]} {payslip.year}</p></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-3">Détails du salaire</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-gray-600">Salaire de base</span><span className="font-medium">{formatCurrency(payslip.basicSalary)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Primes et bonus</span><span className="font-medium text-green-600">+{formatCurrency(payslip.bonuses)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Déductions (CNSS, IR, etc.)</span><span className="font-medium text-red-600">-{formatCurrency(payslip.deductions)}</span></div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between"><span className="font-semibold">Net à payer</span><span className="font-bold text-lg text-blue-600">{formatCurrency(payslip.netSalary)}</span></div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-500">
                  <p>Document généré le {new Date(payslip.generatedAt).toLocaleDateString('fr-FR')}</p>
                  <p className="mt-1">EmployéPro Africa - Plateforme de gestion RH</p>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button onClick={() => handleDownloadPDF(payslip.id)} className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
                  <Download size={18} /><span>Télécharger PDF</span>
                </button>
                <button onClick={() => window.print()} className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  <Printer size={18} /><span>Imprimer</span>
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
