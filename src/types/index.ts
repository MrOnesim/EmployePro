// Types for EmployéPro Africa

export type UserRole = 'admin' | 'rh' | 'manager' | 'employee';

export interface Team {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  memberIds: string[];
  createdAt: Date;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
  likes: string[];
  comments: PostComment[];
}

export interface PostComment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
}

export interface PayrollConfig {
  country: string;
  countryName: string;
  bonusRate: number;
  deductionRate: number;
  currency: string;
  currencyLocale: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  ownerFirstName: string;
  ownerLastName: string;
  email: string;
  phone: string;
  employeeCount: number;
  address: string;
  website: string;
  uniqueId: string;
  createdAt: Date;
  balance: number;
}

export interface Employee {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  position: string;
  department: string;
  photo: string;
  salary: number;
  status: 'active' | 'inactive' | 'pending';
  joinDate: Date;
  role: UserRole;
  contract?: Contract;
  contractHistory?: Contract[];
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  checkIn: Date | null;
  breakStart: Date | null;
  breakEnd: Date | null;
  checkOut: Date | null;
  totalHours: number;
  overtime: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
  gpsCheckIn?: GPSLocation;
  gpsCheckOut?: GPSLocation;
  biometricVerified?: boolean;
}

export interface Leave {
  id: string;
  employeeId: string;
  type: 'annual' | 'sick' | 'maternity' | 'special';
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
}

export interface Payslip {
  id: string;
  employeeId: string;
  month: number;
  year: number;
  basicSalary: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
  generatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'invitation' | 'payment' | 'leave' | 'attendance' | 'payslip' | 'recruitment' | 'review' | 'objective' | 'contract';
  read: boolean;
  createdAt: Date;
}

export interface Invitation {
  id: string;
  companyId: string;
  email: string;
  status: 'pending' | 'accepted' | 'declined';
  sentAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: 'contract' | 'certificate' | 'report' | 'policy' | 'other';
  department: string;
  uploadedBy: string;
  uploadedAt: Date;
  size: string;
  category: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'birthday' | 'meeting' | 'holiday' | 'team' | 'announcement' | 'other';
  attendees: string[];
  allDay: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantPosition: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  online: boolean;
  messages: ChatMessage[];
}

export type ContractType = 'CDI' | 'CDD' | 'stage' | 'freelance' | 'autre';

export interface Contract {
  type: ContractType;
  startDate: Date;
  endDate?: Date;
  salary: number;
  position: string;
  department: string;
  documentUrl?: string;
}

export type CandidateStatus = 'received' | 'interview' | 'accepted' | 'rejected';

export interface JobOffer {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string;
  salary: number;
  location: string;
  type: 'CDI' | 'CDD' | 'stage' | 'freelance';
  status: 'open' | 'closed' | 'draft';
  createdAt: Date;
  createdBy: string;
}

export interface Candidate {
  id: string;
  jobOfferId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: CandidateStatus;
  resumeUrl?: string;
  coverLetter?: string;
  appliedAt: Date;
  interviewDate?: Date;
  notes?: string;
}

export type ObjectiveStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Objective {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  deadline: Date;
  status: ObjectiveStatus;
  category: string;
  createdAt: Date;
  createdBy: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  reviewDate: Date;
  rating: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  objectiveIds: string[];
  status: 'draft' | 'submitted' | 'acknowledged';
  createdAt: Date;
}

export interface TimelineEvent {
  id: string;
  employeeId: string;
  type: 'hire' | 'promotion' | 'contract' | 'leave' | 'review' | 'objective' | 'certificate';
  title: string;
  description: string;
  date: Date;
  metadata?: Record<string, string>;
}

export interface GPSLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface BankAccount {
  id: string;
  companyId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban?: string;
  swift?: string;
  currency: string;
  isMobileMoney: boolean;
  mobileProvider?: string;
  isDefault: boolean;
}

export interface BankTransaction {
  id: string;
  companyId: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'fee' | 'transfer';
  amount: number;
  currency: string;
  description: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  date: Date;
  accountId: string;
}

export interface TaxDeclaration {
  id: string;
  companyId: string;
  country: string;
  period: string;
  type: 'IS' | 'IR' | 'TVA' | 'CNSS' | 'IRPP' | 'CET' | 'autre';
  totalSalary: number;
  totalTax: number;
  status: 'draft' | 'submitted' | 'paid';
  dueDate: Date;
  submittedAt?: Date;
  documentUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  instructor: string;
  enrolledCount: number;
  lessons: CourseLesson[];
  createdAt: Date;
}

export interface CourseLesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  duration: number;
  order: number;
  videoUrl?: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  employeeId: string;
  progress: number;
  completedLessons: string[];
  startedAt: Date;
  completedAt?: Date;
  status: 'enrolled' | 'in_progress' | 'completed';
}

export interface Mission {
  id: string;
  employeeId: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  objectives: string;
  transportType: string;
  budget: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  approvedBy?: string;
  createdAt: Date;
}

export interface ExpenseReport {
  id: string;
  missionId?: string;
  employeeId: string;
  category: string;
  amount: number;
  currency: string;
  date: Date;
  description: string;
  receiptUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
}

export interface JobPost {
  id: string;
  title: string;
  company: string;
  companyId: string;
  description: string;
  requirements: string;
  location: string;
  type: 'CDI' | 'CDD' | 'stage' | 'freelance';
  salary: string;
  category: string;
  status: 'published' | 'closed';
  featured: boolean;
  views: number;
  applications: number;
  createdAt: Date;
  expiresAt: Date;
}

export type Department = 
  | 'Direction'
  | 'Ressources Humaines'
  | 'Finance'
  | 'Informatique'
  | 'Marketing'
  | 'Ventes'
  | 'Operations'
  | 'Juridique'
  | 'Autre';

export type MeetingType = 'physical' | 'online' | 'hybrid';
export type MeetingPriority = 'normal' | 'important' | 'urgent';
export type MeetingStatus = 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
export type ParticipantStatus = 'pending' | 'accepted' | 'declined' | 'tentative';

export interface MeetingParticipant {
  employeeId: string;
  status: ParticipantStatus;
  joinedAt?: Date;
  leftAt?: Date;
  attendanceDuration?: number;
}

export interface MeetingTask {
  id: string;
  meetingId: string;
  title: string;
  assignedTo: string;
  deadline: Date;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
}

export interface MeetingNote {
  id: string;
  meetingId: string;
  authorId: string;
  content: string;
  type: 'comment' | 'decision' | 'action';
  createdAt: Date;
}

export interface MeetingAgenda {
  id: string;
  meetingId: string;
  title: string;
  duration: number;
  order: number;
}

// Coffre-fort numérique employé
export interface EmployeeVaultItem {
  id: string;
  employeeId: string;
  type: 'contract' | 'diploma' | 'id_card' | 'payslip' | 'certificate' | 'evaluation';
  name: string;
  fileUrl?: string;
  uploadedAt: Date;
  expiresAt?: Date;
  status: 'active' | 'expired' | 'archived';
}

// Système de récompenses
export interface RewardTransaction {
  id: string;
  employeeId: string;
  points: number;
  type: 'earned' | 'redeemed';
  reason: string;
  createdAt: Date;
}

export interface RewardCatalog {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  stock: number;
  imageUrl?: string;
  category: 'bonus' | 'gift' | 'advantage' | 'training';
  active: boolean;
}

// Gestion du matériel
export interface Equipment {
  id: string;
  companyId: string;
  name: string;
  type: 'computer' | 'phone' | 'vehicle' | 'access_card' | 'other';
  serialNumber?: string;
  status: 'available' | 'assigned' | 'maintenance' | 'retired';
  purchaseDate?: Date;
  purchasePrice?: number;
  assigneeId?: string;
  assignedAt?: Date;
  returnedAt?: Date;
  condition: 'good' | 'fair' | 'damaged';
  notes?: string;
}

export interface EquipmentAssignment {
  id: string;
  equipmentId: string;
  employeeId: string;
  assignedAt: Date;
  returnedAt?: Date;
  conditionAtAssignment: 'good' | 'fair' | 'damaged';
  conditionAtReturn?: 'good' | 'fair' | 'damaged';
  notes?: string;
}

// Bien-être employé
export interface WellnessSurvey {
  id: string;
  title: string;
  description: string;
  questions: WellnessQuestion[];
  active: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface WellnessQuestion {
  id: string;
  text: string;
  type: 'rating' | 'yesno' | 'text' | 'multiple';
  category: 'satisfaction' | 'stress' | 'motivation' | 'workload' | 'environment';
  options?: string[];
}

export interface WellnessResponse {
  id: string;
  surveyId: string;
  employeeId: string;
  answers: WellnessAnswer[];
  submittedAt: Date;
  anonymous: boolean;
}

export interface WellnessAnswer {
  questionId: string;
  value: number | string | boolean;
}

export interface WellnessScore {
  surveyId: string;
  period: string;
  satisfactionAvg: number;
  stressAvg: number;
  motivationAvg: number;
  workloadAvg: number;
  environmentAvg: number;
  participationRate: number;
  totalResponses: number;
}

// Banque salariale fintech
export interface SalaryAdvance {
  id: string;
  employeeId: string;
  amount: number;
  currency: string;
  status: 'requested' | 'approved' | 'paid' | 'rejected';
  requestedAt: Date;
  approvedAt?: Date;
  paidAt?: Date;
  rejectedAt?: Date;
  repaymentDate?: Date;
  repaymentStatus: 'pending' | 'partial' | 'repaid';
  repaymentAmount?: number;
  reason: string;
  approvedBy?: string;
}

export interface SalaryTransfer {
  id: string;
  employeeId: string;
  amount: number;
  currency: string;
  type: 'salary' | 'advance' | 'bonus' | 'transfer';
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  description?: string;
}

// Quiz et certificats formations
export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  text: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  courseId: string;
  employeeId: string;
  score: number;
  totalPoints: number;
  answers: number[];
  passed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export interface Certificate {
  id: string;
  courseId: string;
  employeeId: string;
  issuedAt: Date;
  expiresAt?: Date;
  certificateUrl?: string;
}

export interface Meeting {
  id: string;
  companyId: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  department: string;
  participants: MeetingParticipant[];
  type: MeetingType;
  priority: MeetingPriority;
  status: MeetingStatus;
  virtualRoomUrl?: string;
  recordingUrl?: string;
  notes: MeetingNote[];
  tasks: MeetingTask[];
  agenda: MeetingAgenda[];
  summary?: string;
  createdBy: string;
  createdAt: Date;
}

// Signature électronique
export interface SignatureRequest {
  id: string;
  documentId?: string;
  documentName: string;
  documentType: 'contract' | 'amendment' | 'policy' | 'nda' | 'internal' | 'other';
  initiatedBy: string;
  initiatedByName: string;
  initiatedAt: Date;
  status: 'draft' | 'sent' | 'signed' | 'completed' | 'rejected' | 'expired';
  recipients: SignatureRecipient[];
  message?: string;
  completedAt?: Date;
  expiresAt?: Date;
}

export interface SignatureRecipient {
  employeeId: string;
  name: string;
  email: string;
  status: 'pending' | 'viewed' | 'signed' | 'rejected';
  signedAt?: Date;
  signatureDataUrl?: string;
  rejectionReason?: string;
}

export interface SignatureTemplate {
  id: string;
  name: string;
  description: string;
  documentType: string;
  content: string;
  placeholders: { key: string; label: string; fieldType: 'text' | 'date' | 'employee_name' | 'employee_position' | 'salary' | 'company_name' }[];
  createdAt: Date;
}
