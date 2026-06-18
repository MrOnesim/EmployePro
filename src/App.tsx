import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import PublicNav from './components/PublicNav';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { isRoleSufficient } from './utils/permissions';
import type { UserRole } from './types';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const RegisterCompanyPage = React.lazy(() => import('./pages/RegisterCompanyPage'));
const EmployeeInvitationPage = React.lazy(() => import('./pages/EmployeeInvitationPage'));
const FAQPage = React.lazy(() => import('./pages/FAQPage'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const EmployeeDashboard = React.lazy(() => import('./pages/EmployeeDashboard'));
const EmployeesPage = React.lazy(() => import('./pages/EmployeesPage'));
const TeamsPage = React.lazy(() => import('./pages/TeamsPage'));
const FeedPage = React.lazy(() => import('./pages/FeedPage'));
const ImportPage = React.lazy(() => import('./pages/ImportPage'));
const SalaryPage = React.lazy(() => import('./pages/SalaryPage'));
const AttendancePage = React.lazy(() => import('./pages/AttendancePage'));
const EmployeeAttendancePage = React.lazy(() => import('./pages/EmployeeAttendancePage'));
const LeavesPage = React.lazy(() => import('./pages/LeavesPage'));
const EmployeeLeavesPage = React.lazy(() => import('./pages/EmployeeLeavesPage'));
const PayslipsPage = React.lazy(() => import('./pages/PayslipsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const AIAssistant = React.lazy(() => import('./pages/AIAssistant'));
const MessagesPage = React.lazy(() => import('./pages/MessagesPage'));
const DocumentsPage = React.lazy(() => import('./pages/DocumentsPage'));
const PerformancePage = React.lazy(() => import('./pages/PerformancePage'));
const CalendarPage = React.lazy(() => import('./pages/CalendarPage'));
const ReportsPage = React.lazy(() => import('./pages/ReportsPage'));
const RecruitmentPage = React.lazy(() => import('./pages/RecruitmentPage'));
const ObjectivesPage = React.lazy(() => import('./pages/ObjectivesPage'));
const BankingPage = React.lazy(() => import('./pages/BankingPage'));
const TaxPage = React.lazy(() => import('./pages/TaxPage'));
const TrainingPage = React.lazy(() => import('./pages/TrainingPage'));
const MissionsPage = React.lazy(() => import('./pages/MissionsPage'));
const MarketplacePage = React.lazy(() => import('./pages/MarketplacePage'));
const OrgChartPage = React.lazy(() => import('./pages/OrgChartPage'));
const MeetingPage = React.lazy(() => import('./pages/MeetingPage'));
const EmployeeVaultPage = React.lazy(() => import('./pages/EmployeeVaultPage'));
const RewardsPage = React.lazy(() => import('./pages/RewardsPage'));
const EquipmentPage = React.lazy(() => import('./pages/EquipmentPage'));
const WellnessPage = React.lazy(() => import('./pages/WellnessPage'));
const FintechPage = React.lazy(() => import('./pages/FintechPage'));
const SignaturePage = React.lazy(() => import('./pages/SignaturePage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children, adminOnly = false, requiredRole }: { children: React.ReactNode; adminOnly?: boolean; requiredRole?: UserRole }) {
  const { isLoggedIn, currentUser } = useApp();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (adminOnly && currentUser?.role !== 'admin') return <Navigate to="/employee-dashboard" replace />;
  if (requiredRole && !isRoleSufficient(currentUser?.role, requiredRole)) return <Navigate to="/employee-dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <ErrorBoundary>
      <PublicNav />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-company" element={<RegisterCompanyPage />} />
          <Route path="/invite/:token" element={<EmployeeInvitationPage />} />

          <Route path="/admin" element={<ProtectedRoute adminOnly><Layout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="teams" element={<TeamsPage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="import" element={<ImportPage />} />
            <Route path="salary" element={<SalaryPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="leaves" element={<LeavesPage />} />
            <Route path="payslips" element={<PayslipsPage />} />
            <Route path="performance" element={<PerformancePage />} />
            <Route path="recruitment" element={<RecruitmentPage />} />
            <Route path="objectives" element={<ObjectivesPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="meetings" element={<MeetingPage />} />
            <Route path="banking" element={<BankingPage />} />
            <Route path="tax" element={<TaxPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="missions" element={<MissionsPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="org-chart" element={<OrgChartPage />} />
            <Route path="vault" element={<EmployeeVaultPage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="equipment" element={<EquipmentPage />} />
            <Route path="wellness" element={<WellnessPage />} />
            <Route path="fintech" element={<FintechPage />} />
            <Route path="signatures" element={<SignaturePage />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="/employee" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="attendance" element={<EmployeeAttendancePage />} />
            <Route path="leaves" element={<EmployeeLeavesPage />} />
            <Route path="payslips" element={<PayslipsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="vault" element={<EmployeeVaultPage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="equipment" element={<EquipmentPage />} />
            <Route path="wellness" element={<WellnessPage />} />
            <Route path="fintech" element={<FintechPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="/" element={<ProtectedRoute adminOnly><><Navigate to="/admin" replace /></></ProtectedRoute>} />
          <Route path="/employee-dashboard" element={<ProtectedRoute><><Navigate to="/employee" replace /></></ProtectedRoute>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppProvider>
    </ToastProvider>
  );
}
