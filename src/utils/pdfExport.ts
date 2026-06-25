import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import type { TaxDeclaration, BankTransaction, Mission, ExpenseReport, Payslip, Employee } from '../types';

function formatDate(d: Date | string): string {
  return new Date(d).toLocaleDateString('fr-FR');
}

function formatCurrency(amount: number, currency = 'FCFA'): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ` ${currency}`;
}

export function exportTaxDeclarationPdf(d: TaxDeclaration) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Déclaration Fiscale', 14, 22);
  doc.setFontSize(11);
  doc.text(`Pays: ${d.country}`, 14, 35);
  doc.text(`Période: ${d.period}`, 14, 43);
  doc.text(`Type: ${d.type}`, 14, 51);
  doc.text(`Statut: ${d.status}`, 14, 59);
  doc.text(`Masse salariale: ${formatCurrency(d.totalSalary)}`, 14, 67);
  doc.text(`Montant de l'impôt: ${formatCurrency(d.totalTax)}`, 14, 75);
  doc.text(`Date d'échéance: ${formatDate(d.dueDate)}`, 14, 83);
  if (d.submittedAt) doc.text(`Soumise le: ${formatDate(d.submittedAt)}`, 14, 91);
  doc.save(`declaration-${d.type}-${d.period}.pdf`);
}

export function exportTransactionHistoryPdf(transactions: BankTransaction[]) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Historique des Transactions', 14, 22);
  const rows = transactions.map(t => [
    formatDate(t.date),
    t.type,
    formatCurrency(t.amount, t.currency),
    t.description,
    t.status,
  ]);
  (doc as any).autoTable({
    startY: 30,
    head: [['Date', 'Type', 'Montant', 'Description', 'Statut']],
    body: rows,
  });
  doc.save('transactions.pdf');
}

export function exportMissionsPdf(missions: Mission[]) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Rapport des Missions', 14, 22);
  const rows = missions.map(m => [
    m.title,
    m.destination,
    formatDate(m.startDate),
    formatDate(m.endDate),
    formatCurrency(m.budget),
    m.status,
  ]);
  (doc as any).autoTable({
    startY: 30,
    head: [['Mission', 'Destination', 'Début', 'Fin', 'Budget', 'Statut']],
    body: rows,
  });
  doc.save('missions.pdf');
}

export function exportExpensesPdf(expenses: ExpenseReport[]) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Rapport des Notes de Frais', 14, 22);
  const rows = expenses.map(e => [
    e.category,
    formatCurrency(e.amount, e.currency),
    formatDate(e.date),
    e.description,
    e.status,
  ]);
  (doc as any).autoTable({
    startY: 30,
    head: [['Catégorie', 'Montant', 'Date', 'Description', 'Statut']],
    body: rows,
  });
  doc.save('notes-de-frais.pdf');
}

const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

export function exportPayslipPDF(payslip: Payslip, employee: Employee, companyName: string) {
  const doc = new jsPDF();
  const pageW = 210;

  // Header
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageW, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text(companyName, 14, 18);
  doc.setFontSize(12);
  doc.text('BULLETIN DE SALAIRE', 14, 28);
  doc.text(`${MONTHS_FR[payslip.month - 1]} ${payslip.year}`, 14, 36);

  // Employee info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.text(`Employé: ${employee.firstName} ${employee.lastName}`, 14, 55);
  doc.text(`Poste: ${employee.position}`, 14, 63);
  doc.text(`Département: ${employee.department}`, 14, 71);
  doc.text(`Matricule: ${employee.id}`, 14, 79);

  // Salary breakdown
  const startY = 95;
  (doc as any).autoTable({
    startY,
    head: [['Rubrique', 'Montant']],
    body: [
      ['Salaire de base', formatCurrency(payslip.basicSalary)],
      ['Primes et bonus', formatCurrency(payslip.bonuses)],
      ['Déductions', formatCurrency(payslip.deductions)],
    ],
    theme: 'plain',
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 11 },
  });

  // Net salary
  const netY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFillColor(239, 246, 255);
  doc.rect(14, netY, pageW - 28, 14, 'F');
  doc.setFontSize(13);
  doc.setFont('Helvetica', 'bold');
  doc.text(`SALAIRE NET À PAYER: ${formatCurrency(payslip.netSalary)}`, 18, netY + 10);
  doc.setFont('Helvetica', 'normal');

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} · Document non contractuel`, 14, 285);

  doc.save(`bulletin-${payslip.month}-${payslip.year}-${employee.firstName}-${employee.lastName}.pdf`);
}
