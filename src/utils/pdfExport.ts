import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import type { TaxDeclaration, BankTransaction, Mission, ExpenseReport } from '../types';

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
