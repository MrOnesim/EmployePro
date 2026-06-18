import { createContext, useContext, useCallback, type ReactNode } from 'react';
import type { Company, Employee, Attendance, Leave, Payslip, Notification, Invitation, Document as AppDocument, CalendarEvent, Conversation, ChatMessage, Team, Post, PayrollConfig, PostComment, JobOffer, Candidate, Objective, PerformanceReview, TimelineEvent, Contract, BankAccount, BankTransaction, TaxDeclaration, Course, Enrollment, Mission, ExpenseReport, JobPost, GPSLocation, Meeting, MeetingNote, MeetingTask, ParticipantStatus, EmployeeVaultItem, RewardTransaction, RewardCatalog, Equipment, EquipmentAssignment, WellnessSurvey, WellnessResponse, SalaryAdvance, SalaryTransfer, Quiz, QuizAttempt, Certificate, SignatureRequest, SignatureTemplate } from '../types';
import { AuthProvider, useAuth } from './AuthContext';
import { DataProvider, useData } from './DataContext';

interface AppState {
  isLoggedIn: boolean;
  currentUser: Employee | null;
  currentCompany: Company | null;
  companies: Company[];
  employees: Employee[];
  attendance: Attendance[];
  leaves: Leave[];
  payslips: Payslip[];
  notifications: Notification[];
  invitations: Invitation[];
  documents: AppDocument[];
  events: CalendarEvent[];
  conversations: Conversation[];
  teams: Team[];
  posts: Post[];
  payrollConfig: PayrollConfig;
  signatures: Record<string, string>;
  addDocument: (doc: Omit<AppDocument, 'id'>) => void;
  deleteDocument: (id: string) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  addMessage: (conversationId: string, message: Omit<ChatMessage, 'id'>) => void;
  addConversation: (participant: { id: string; name: string; position: string }) => void;
  readConversation: (conversationId: string) => void;
  login: (email: string, password: string, type: 'company' | 'employee') => boolean;
  logout: () => void;
  registerCompany: (company: Omit<Company, 'id' | 'uniqueId' | 'createdAt' | 'balance'>) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  addMultipleEmployees: (emps: Omit<Employee, 'id'>[]) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  sendInvitation: (email: string) => void;
  acceptInvitation: (id: string) => void;
  clockIn: (gpsLocation?: GPSLocation) => void;
  startBreak: () => void;
  endBreak: () => void;
  clockOut: (gpsLocation?: GPSLocation) => void;
  requestLeave: (leave: Omit<Leave, 'id'>) => void;
  approveLeave: (id: string) => void;
  rejectLeave: (id: string) => void;
  deposit: (amount: number) => void;
  processPayment: (employeeId: string, amount: number) => boolean;
  generatePayslip: (employeeId: string) => void;
  markNotificationRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  addTeam: (team: Omit<Team, 'id' | 'createdAt'>) => void;
  updateTeam: (id: string, data: Partial<Team>) => void;
  deleteTeam: (id: string) => void;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Omit<PostComment, 'id' | 'createdAt'>) => void;
  updatePayrollConfig: (config: Partial<PayrollConfig>) => void;
  signDocument: (docId: string, signatureDataUrl: string) => void;
  getSignatures: () => Record<string, string>;
  jobOffers: JobOffer[];
  candidates: Candidate[];
  objectives: Objective[];
  performanceReviews: PerformanceReview[];
  timelineEvents: TimelineEvent[];
  addJobOffer: (offer: Omit<JobOffer, 'id' | 'createdAt'>) => void;
  updateJobOffer: (id: string, data: Partial<JobOffer>) => void;
  deleteJobOffer: (id: string) => void;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'appliedAt'>) => void;
  updateCandidate: (id: string, data: Partial<Candidate>) => void;
  addObjective: (objective: Omit<Objective, 'id' | 'createdAt'>) => void;
  updateObjective: (id: string, data: Partial<Objective>) => void;
  deleteObjective: (id: string) => void;
  addPerformanceReview: (review: Omit<PerformanceReview, 'id' | 'createdAt'>) => void;
  updatePerformanceReview: (id: string, data: Partial<PerformanceReview>) => void;
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  updateEmployeeContract: (employeeId: string, contract: Contract) => void;
  bankAccounts: BankAccount[];
  transactions: BankTransaction[];
  taxDeclarations: TaxDeclaration[];
  courses: Course[];
  enrollments: Enrollment[];
  missions: Mission[];
  expenses: ExpenseReport[];
  jobPosts: JobPost[];
  addBankAccount: (acc: Omit<BankAccount, 'id'>) => void;
  addTransaction: (tx: Omit<BankTransaction, 'id'>) => void;
  addTaxDeclaration: (d: Omit<TaxDeclaration, 'id'>) => void;
  updateTaxDeclaration: (id: string, data: Partial<TaxDeclaration>) => void;
  addCourse: (c: Omit<Course, 'id' | 'createdAt'>) => void;
  enrollCourse: (employeeId: string, courseId: string) => void;
  updateLessonProgress: (enrollmentId: string, lessonId: string) => void;
  addMission: (m: Omit<Mission, 'id' | 'createdAt'>) => void;
  updateMission: (id: string, data: Partial<Mission>) => void;
  addExpense: (e: Omit<ExpenseReport, 'id'>) => void;
  updateExpense: (id: string, data: Partial<ExpenseReport>) => void;
  addJobPost: (p: Omit<JobPost, 'id' | 'createdAt'>) => void;
  updateJobPost: (id: string, data: Partial<JobPost>) => void;
  deleteJobPost: (id: string) => void;
  meetings: Meeting[];
  addMeeting: (meeting: Omit<Meeting, 'id' | 'createdAt' | 'status'>) => void;
  addMeetingNote: (meetingId: string, note: Omit<MeetingNote, 'id' | 'createdAt'>) => void;
  addMeetingTask: (meetingId: string, task: Omit<MeetingTask, 'id' | 'createdAt'>) => void;
  updateMeeting: (id: string, data: Partial<Meeting>) => void;
  updateMeetingTask: (meetingId: string, taskId: string, data: Partial<MeetingTask>) => void;
  updateParticipantStatus: (meetingId: string, employeeId: string, status: ParticipantStatus) => void;
  joinMeeting: (meetingId: string, employeeId: string) => void;
  leaveMeeting: (meetingId: string, employeeId: string) => void;
  // Coffre-fort
  vaultItems: EmployeeVaultItem[];
  addVaultItem: (item: Omit<EmployeeVaultItem, 'id'>) => void;
  deleteVaultItem: (id: string) => void;
  // Récompenses
  rewardTransactions: RewardTransaction[];
  rewardCatalog: RewardCatalog[];
  addRewardTransaction: (tx: Omit<RewardTransaction, 'id' | 'createdAt'>) => void;
  addRewardCatalogItem: (item: Omit<RewardCatalog, 'id'>) => void;
  redeemReward: (employeeId: string, catalogItemId: string) => void;
  // Matériel
  equipment: Equipment[];
  equipmentAssignments: EquipmentAssignment[];
  addEquipment: (eq: Omit<Equipment, 'id'>) => void;
  updateEquipment: (id: string, data: Partial<Equipment>) => void;
  assignEquipment: (equipmentId: string, employeeId: string) => void;
  returnEquipment: (equipmentId: string, condition?: 'good' | 'fair' | 'damaged') => void;
  // Bien-être
  wellnessSurveys: WellnessSurvey[];
  wellnessResponses: WellnessResponse[];
  addWellnessSurvey: (survey: Omit<WellnessSurvey, 'id' | 'createdAt'>) => void;
  submitWellnessResponse: (response: Omit<WellnessResponse, 'id'>) => void;
  // Banque salariale fintech
  salaryAdvances: SalaryAdvance[];
  salaryTransfers: SalaryTransfer[];
  requestSalaryAdvance: (advance: Omit<SalaryAdvance, 'id' | 'requestedAt' | 'status' | 'repaymentStatus'>) => void;
  approveSalaryAdvance: (id: string) => void;
  paySalaryAdvance: (id: string) => void;
  rejectSalaryAdvance: (id: string) => void;
  addSalaryTransfer: (transfer: Omit<SalaryTransfer, 'id' | 'createdAt'>) => void;
  // Quiz et certificats
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  certificates: Certificate[];
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'startedAt' | 'completedAt' | 'passed'>) => QuizAttempt;
  issueCertificate: (cert: Omit<Certificate, 'id' | 'issuedAt'>) => void;
  // Signature électronique
  signatureRequests: SignatureRequest[];
  signatureTemplates: SignatureTemplate[];
  sendSignatureRequest: (req: Omit<SignatureRequest, 'id' | 'initiatedAt' | 'status'>) => void;
  signSignatureRequest: (requestId: string, recipientEmployeeId: string, signatureDataUrl: string) => void;
  rejectSignature: (requestId: string, recipientEmployeeId: string, reason: string) => void;
  addSignatureTemplate: (tpl: Omit<SignatureTemplate, 'id' | 'createdAt'>) => void;
  deleteSignatureTemplate: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

function AppInner({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const data = useData();

  const login = useCallback(
    (email: string, password: string, type: 'company' | 'employee'): boolean => {
      const authResult = auth.login(email, password, type);
      if (authResult) return true;
      if (type === 'employee') {
        const employee = data.employees.find((e) => e.email === email);
        if (employee) {
          auth.setCurrentUser(employee);
          auth.setCurrentCompany(auth.defaultCompany);
          return true;
        }
      }
      return false;
    },
    [auth, data.employees],
  );

  const clockIn = useCallback((gpsLocation?: GPSLocation) => {
    if (auth.currentUser) data.clockIn(auth.currentUser.id, gpsLocation);
  }, [auth.currentUser, data]);

  const startBreak = useCallback(() => {
    if (auth.currentUser) data.startBreak(auth.currentUser.id);
  }, [auth.currentUser, data]);

  const endBreak = useCallback(() => {
    if (auth.currentUser) data.endBreak(auth.currentUser.id);
  }, [auth.currentUser, data]);

  const clockOut = useCallback((gpsLocation?: GPSLocation) => {
    if (auth.currentUser) data.clockOut(auth.currentUser.id, gpsLocation);
  }, [auth.currentUser, data]);

  const processPayment = useCallback(
    (employeeId: string, amount: number): boolean => {
      if (!auth.currentCompany || auth.currentCompany.balance < amount) return false;
      const deducted = auth.withdraw(amount);
      if (deducted) {
        data.processPayment(employeeId, amount);
        return true;
      }
      return false;
    },
    [auth, data],
  );

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'createdAt'>) => {
      data.addNotification(notification);
    },
    [data],
  );

  const value: AppState = {
    isLoggedIn: auth.isLoggedIn,
    currentUser: auth.currentUser,
    currentCompany: auth.currentCompany,
    companies: auth.currentCompany ? [auth.currentCompany] : [],
    employees: data.employees,
    attendance: data.attendance,
    leaves: data.leaves,
    payslips: data.payslips,
    documents: data.documents,
    events: data.events,
    conversations: data.conversations,
    notifications: data.notifications,
    invitations: data.invitations,
    teams: data.teams,
    posts: data.posts,
    payrollConfig: data.payrollConfig,
    signatures: data.signatures,
    jobOffers: data.jobOffers,
    candidates: data.candidates,
    objectives: data.objectives,
    performanceReviews: data.performanceReviews,
    timelineEvents: data.timelineEvents,
    bankAccounts: data.bankAccounts,
    transactions: data.transactions,
    taxDeclarations: data.taxDeclarations,
    courses: data.courses,
    enrollments: data.enrollments,
    missions: data.missions,
    expenses: data.expenses,
    jobPosts: data.jobPosts,
    meetings: data.meetings,
    addDocument: data.addDocument,
    deleteDocument: data.deleteDocument,
    addEvent: data.addEvent,
    addMessage: data.addMessage,
    addConversation: data.addConversation,
    readConversation: data.readConversation,
    login,
    logout: auth.logout,
    registerCompany: auth.registerCompany,
    addEmployee: data.addEmployee,
    addMultipleEmployees: data.addMultipleEmployees,
    updateEmployee: data.updateEmployee,
    deleteEmployee: data.deleteEmployee,
    sendInvitation: data.sendInvitation,
    acceptInvitation: data.acceptInvitation,
    clockIn,
    startBreak,
    endBreak,
    clockOut,
    requestLeave: data.requestLeave,
    approveLeave: data.approveLeave,
    rejectLeave: data.rejectLeave,
    deposit: auth.deposit,
    processPayment,
    generatePayslip: data.generatePayslip,
    markNotificationRead: data.markNotificationRead,
    addNotification,
    addTeam: data.addTeam,
    updateTeam: data.updateTeam,
    deleteTeam: data.deleteTeam,
    addPost: data.addPost,
    likePost: data.likePost,
    addComment: data.addComment,
    updatePayrollConfig: data.updatePayrollConfig,
    signDocument: data.signDocument,
    getSignatures: data.getSignatures,
    addJobOffer: data.addJobOffer,
    updateJobOffer: data.updateJobOffer,
    deleteJobOffer: data.deleteJobOffer,
    addCandidate: data.addCandidate,
    updateCandidate: data.updateCandidate,
    addObjective: data.addObjective,
    updateObjective: data.updateObjective,
    deleteObjective: data.deleteObjective,
    addPerformanceReview: data.addPerformanceReview,
    updatePerformanceReview: data.updatePerformanceReview,
    addTimelineEvent: data.addTimelineEvent,
    updateEmployeeContract: data.updateEmployeeContract,
    addBankAccount: data.addBankAccount,
    addTransaction: data.addTransaction,
    addTaxDeclaration: data.addTaxDeclaration,
    updateTaxDeclaration: data.updateTaxDeclaration,
    addCourse: data.addCourse,
    enrollCourse: data.enrollCourse,
    updateLessonProgress: data.updateLessonProgress,
    addMission: data.addMission,
    updateMission: data.updateMission,
    addExpense: data.addExpense,
    updateExpense: data.updateExpense,
    addJobPost: data.addJobPost,
    updateJobPost: data.updateJobPost,
    deleteJobPost: data.deleteJobPost,
    addMeeting: data.addMeeting,
    addMeetingNote: data.addMeetingNote,
    addMeetingTask: data.addMeetingTask,
    updateMeeting: data.updateMeeting,
    updateMeetingTask: data.updateMeetingTask,
    updateParticipantStatus: data.updateParticipantStatus,
    joinMeeting: data.joinMeeting,
    leaveMeeting: data.leaveMeeting,
    vaultItems: data.vaultItems,
    rewardTransactions: data.rewardTransactions,
    rewardCatalog: data.rewardCatalog,
    equipment: data.equipment,
    equipmentAssignments: data.equipmentAssignments,
    wellnessSurveys: data.wellnessSurveys,
    wellnessResponses: data.wellnessResponses,
    salaryAdvances: data.salaryAdvances,
    salaryTransfers: data.salaryTransfers,
    quizzes: data.quizzes,
    quizAttempts: data.quizAttempts,
    certificates: data.certificates,
    addVaultItem: data.addVaultItem,
    deleteVaultItem: data.deleteVaultItem,
    addRewardTransaction: data.addRewardTransaction,
    addRewardCatalogItem: data.addRewardCatalogItem,
    redeemReward: data.redeemReward,
    addEquipment: data.addEquipment,
    updateEquipment: data.updateEquipment,
    assignEquipment: data.assignEquipment,
    returnEquipment: data.returnEquipment,
    addWellnessSurvey: data.addWellnessSurvey,
    submitWellnessResponse: data.submitWellnessResponse,
    requestSalaryAdvance: data.requestSalaryAdvance,
    approveSalaryAdvance: data.approveSalaryAdvance,
    paySalaryAdvance: data.paySalaryAdvance,
    rejectSalaryAdvance: data.rejectSalaryAdvance,
    addSalaryTransfer: data.addSalaryTransfer,
    addQuiz: data.addQuiz,
    submitQuizAttempt: data.submitQuizAttempt,
    issueCertificate: data.issueCertificate,
    signatureRequests: data.signatureRequests,
    signatureTemplates: data.signatureTemplates,
    sendSignatureRequest: data.sendSignatureRequest,
    signSignatureRequest: data.signSignatureRequest,
    rejectSignature: data.rejectSignature,
    addSignatureTemplate: data.addSignatureTemplate,
    deleteSignatureTemplate: data.deleteSignatureTemplate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DataProvider>
        <AppInner>{children}</AppInner>
      </DataProvider>
    </AuthProvider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
