import { createContext, useContext, useState, ReactNode } from 'react';
import { Company, Employee, Attendance, Leave, Payslip, Notification, Invitation } from '../types';

interface AppState {
  // Auth state
  isLoggedIn: boolean;
  currentUser: Employee | null;
  currentCompany: Company | null;
  
  // Data
  companies: Company[];
  employees: Employee[];
  attendance: Attendance[];
  leaves: Leave[];
  payslips: Payslip[];
  notifications: Notification[];
  invitations: Invitation[];
  
  // Actions
  login: (email: string, password: string, type: 'company' | 'employee') => boolean;
  logout: () => void;
  registerCompany: (company: Omit<Company, 'id' | 'uniqueId' | 'createdAt' | 'balance'>) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  sendInvitation: (email: string) => void;
  acceptInvitation: (id: string) => void;
  clockIn: () => void;
  startBreak: () => void;
  endBreak: () => void;
  clockOut: () => void;
  requestLeave: (leave: Omit<Leave, 'id'>) => void;
  approveLeave: (id: string, comment?: string) => void;
  rejectLeave: (id: string, comment?: string) => void;
  processPayment: (employeeId: string, amount: number) => void;
  generatePayslip: (employeeId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

// Mock data for demo
const mockCompany: Company = {
  id: '1',
  name: 'TechAfrique Solutions',
  logo: '',
  ownerFirstName: 'Kofi',
  ownerLastName: 'Mensah',
  email: 'admin@techafrique.com',
  phone: '+228 90 12 34 56',
  employeeCount: 25,
  address: 'Lomé, Togo',
  website: 'www.techafrique.com',
  uniqueId: 'TA-2024-001',
  createdAt: new Date('2024-01-15'),
  balance: 5000000
};

const mockEmployees: Employee[] = [
  {
    id: '1',
    companyId: '1',
    firstName: 'Kofi',
    lastName: 'Mensah',
    email: 'admin@techafrique.com',
    phone: '+228 90 12 34 56',
    dateOfBirth: new Date('1985-06-15'),
    position: 'Directeur Général',
    department: 'Direction',
    photo: '',
    salary: 1500000,
    status: 'active',
    joinDate: new Date('2024-01-15'),
    role: 'admin'
  },
  {
    id: '2',
    companyId: '1',
    firstName: 'Ama',
    lastName: 'Gbeko',
    email: 'ama@techafrique.com',
    phone: '+228 91 23 45 67',
    dateOfBirth: new Date('1990-03-20'),
    position: 'Responsable RH',
    department: 'Ressources Humaines',
    photo: '',
    salary: 800000,
    status: 'active',
    joinDate: new Date('2024-02-01'),
    role: 'rh'
  },
  {
    id: '3',
    companyId: '1',
    firstName: 'Kwame',
    lastName: 'Adjei',
    email: 'kwame@techafrique.com',
    phone: '+228 92 34 56 78',
    dateOfBirth: new Date('1992-08-10'),
    position: 'Développeur Senior',
    department: 'Informatique',
    photo: '',
    salary: 750000,
    status: 'active',
    joinDate: new Date('2024-03-15'),
    role: 'manager'
  },
  {
    id: '4',
    companyId: '1',
    firstName: 'Efua',
    lastName: 'Asante',
    email: 'efua@techafrique.com',
    phone: '+228 93 45 67 89',
    dateOfBirth: new Date('1988-12-05'),
    position: 'Comptable',
    department: 'Finance',
    photo: '',
    salary: 700000,
    status: 'active',
    joinDate: new Date('2024-04-01'),
    role: 'employee'
  },
  {
    id: '5',
    companyId: '1',
    firstName: 'Yaw',
    lastName: 'Boakye',
    email: 'yaw@techafrique.com',
    phone: '+228 94 56 78 90',
    dateOfBirth: new Date('1995-05-22'),
    position: 'Designer UI/UX',
    department: 'Marketing',
    photo: '',
    salary: 600000,
    status: 'active',
    joinDate: new Date('2024-05-15'),
    role: 'employee'
  },
  {
    id: '6',
    companyId: '1',
    firstName: 'Abla',
    lastName: 'Dosso',
    email: 'abla@techafrique.com',
    phone: '+228 95 67 89 01',
    dateOfBirth: new Date('1993-09-18'),
    position: 'Chargé de Marketing',
    department: 'Marketing',
    photo: '',
    salary: 550000,
    status: 'inactive',
    joinDate: new Date('2024-06-01'),
    role: 'employee'
  },
  {
    id: '7',
    companyId: '1',
    firstName: 'Kossi',
    lastName: 'Amoussou',
    email: 'kossi@techafrique.com',
    phone: '+228 96 78 90 12',
    dateOfBirth: new Date('1991-02-28'),
    position: 'Développeur Full Stack',
    department: 'Informatique',
    photo: '',
    salary: 700000,
    status: 'active',
    joinDate: new Date('2024-07-01'),
    role: 'employee'
  }
];

const mockAttendance: Attendance[] = [
  {
    id: '1',
    employeeId: '1',
    date: new Date(),
    checkIn: new Date(new Date().setHours(8, 0)),
    breakStart: new Date(new Date().setHours(12, 0)),
    breakEnd: new Date(new Date().setHours(13, 0)),
    checkOut: null,
    totalHours: 4,
    overtime: 0,
    status: 'present'
  },
  {
    id: '2',
    employeeId: '2',
    date: new Date(),
    checkIn: new Date(new Date().setHours(7, 45)),
    breakStart: null,
    breakEnd: null,
    checkOut: null,
    totalHours: 4.25,
    overtime: 0,
    status: 'present'
  },
  {
    id: '3',
    employeeId: '3',
    date: new Date(),
    checkIn: new Date(new Date().setHours(9, 15)),
    breakStart: null,
    breakEnd: null,
    checkOut: null,
    totalHours: 3,
    overtime: 0,
    status: 'late'
  },
  {
    id: '4',
    employeeId: '4',
    date: new Date(),
    checkIn: null,
    breakStart: null,
    breakEnd: null,
    checkOut: null,
    totalHours: 0,
    overtime: 0,
    status: 'absent'
  },
  {
    id: '5',
    employeeId: '5',
    date: new Date(),
    checkIn: new Date(new Date().setHours(8, 0)),
    breakStart: new Date(new Date().setHours(12, 0)),
    breakEnd: new Date(new Date().setHours(12, 45)),
    checkOut: null,
    totalHours: 4,
    overtime: 0,
    status: 'present'
  }
];

const mockLeaves: Leave[] = [
  {
    id: '1',
    employeeId: '3',
    type: 'annual',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2024-12-31'),
    reason: 'Vacances de fin d\'année',
    status: 'pending'
  },
  {
    id: '2',
    employeeId: '5',
    type: 'sick',
    startDate: new Date('2024-12-18'),
    endDate: new Date('2024-12-19'),
    reason: 'Grippe',
    status: 'approved',
    approvedBy: '1'
  },
  {
    id: '3',
    employeeId: '7',
    type: 'annual',
    startDate: new Date('2024-12-25'),
    endDate: new Date('2024-12-27'),
    reason: 'Congé personnel',
    status: 'rejected'
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Nouvelle demande de congé',
    message: 'Kwame Adjei a demandé un congé du 20 au 31 décembre',
    type: 'leave',
    read: false,
    createdAt: new Date()
  },
  {
    id: '2',
    userId: '1',
    title: 'Retard détecté',
    message: 'Kwame Adjei est arrivé en retard à 9h15',
    type: 'attendance',
    read: false,
    createdAt: new Date()
  },
  {
    id: '3',
    userId: '1',
    title: 'Bulletin de paie disponible',
    message: 'Les bulletins de paie de novembre sont prêts',
    type: 'payslip',
    read: true,
    createdAt: new Date(Date.now() - 86400000)
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [leaves, setLeaves] = useState<Leave[]>(mockLeaves);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const login = (email: string, _password: string, type: 'company' | 'employee'): boolean => {
    if (type === 'company' && email === 'admin@techafrique.com') {
      setCurrentCompany(mockCompany);
      setCurrentUser(mockEmployees[0]);
      setIsLoggedIn(true);
      return true;
    }
    
    const employee = employees.find(e => e.email === email);
    if (employee) {
      setCurrentUser(employee);
      setCurrentCompany(mockCompany);
      setIsLoggedIn(true);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentCompany(null);
  };

  const registerCompany = (companyData: Omit<Company, 'id' | 'uniqueId' | 'createdAt' | 'balance'>) => {
    const newCompany: Company = {
      ...companyData,
      id: String(companies.length + 1),
      uniqueId: `EP-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date(),
      balance: 0
    };
    setCurrentCompany(newCompany);
    const adminEmployee: Employee = {
      id: '1',
      companyId: newCompany.id,
      firstName: companyData.ownerFirstName,
      lastName: companyData.ownerLastName,
      email: companyData.email,
      phone: companyData.phone,
      dateOfBirth: new Date(),
      position: 'Directeur Général',
      department: 'Direction',
      photo: companyData.logo,
      salary: 0,
      status: 'active',
      joinDate: new Date(),
      role: 'admin'
    };
    setCurrentUser(adminEmployee);
    setIsLoggedIn(true);
  };

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: String(employees.length + 1)
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id: string, data: Partial<Employee>) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, ...data } : e));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const sendInvitation = (email: string) => {
    const newInvitation: Invitation = {
      id: String(invitations.length + 1),
      companyId: currentCompany?.id || '',
      email,
      status: 'pending',
      sentAt: new Date()
    };
    setInvitations([...invitations, newInvitation]);
    addNotification({
      userId: currentUser?.id || '',
      title: 'Invitation envoyée',
      message: `Une invitation a été envoyée à ${email}`,
      type: 'invitation',
      read: false
    });
  };

  const acceptInvitation = (id: string) => {
    setInvitations(invitations.map(i => 
      i.id === id ? { ...i, status: 'accepted' } : i
    ));
  };

  const clockIn = () => {
    const today = new Date();
    const newAttendance: Attendance = {
      id: String(attendance.length + 1),
      employeeId: currentUser?.id || '',
      date: today,
      checkIn: today,
      breakStart: null,
      breakEnd: null,
      checkOut: null,
      totalHours: 0,
      overtime: 0,
      status: today.getHours() > 9 ? 'late' : 'present'
    };
    setAttendance([...attendance, newAttendance]);
  };

  const startBreak = () => {
    const todayAttendance = attendance.find(
      a => a.employeeId === currentUser?.id && 
      new Date(a.date).toDateString() === new Date().toDateString()
    );
    if (todayAttendance) {
      setAttendance(attendance.map(a => 
        a.id === todayAttendance.id 
          ? { ...a, breakStart: new Date() }
          : a
      ));
    }
  };

  const endBreak = () => {
    const todayAttendance = attendance.find(
      a => a.employeeId === currentUser?.id && 
      new Date(a.date).toDateString() === new Date().toDateString()
    );
    if (todayAttendance) {
      setAttendance(attendance.map(a => 
        a.id === todayAttendance.id 
          ? { ...a, breakEnd: new Date() }
          : a
      ));
    }
  };

  const clockOut = () => {
    const todayAttendance = attendance.find(
      a => a.employeeId === currentUser?.id && 
      new Date(a.date).toDateString() === new Date().toDateString()
    );
    if (todayAttendance && todayAttendance.checkIn) {
      const now = new Date();
      const totalHours = (now.getTime() - todayAttendance.checkIn.getTime()) / (1000 * 60 * 60);
      const overtime = totalHours > 8 ? totalHours - 8 : 0;
      
      setAttendance(attendance.map(a => 
        a.id === todayAttendance.id 
          ? { ...a, checkOut: now, totalHours: Math.round(totalHours * 100) / 100, overtime }
          : a
      ));
    }
  };

  const requestLeave = (leave: Omit<Leave, 'id'>) => {
    const newLeave: Leave = {
      ...leave,
      id: String(leaves.length + 1)
    };
    setLeaves([...leaves, newLeave]);
    addNotification({
      userId: currentUser?.id || '',
      title: 'Demande de congé',
      message: `Votre demande de congé a été soumise`,
      type: 'leave',
      read: false
    });
  };

  const approveLeave = (id: string, comment?: string) => {
    setLeaves(leaves.map(l => 
      l.id === id ? { ...l, status: 'approved', approvedBy: currentUser?.id, approvalComment: comment } : l
    ));
  };

  const rejectLeave = (id: string, comment?: string) => {
    setLeaves(leaves.map(l => 
      l.id === id ? { ...l, status: 'rejected', approvedBy: currentUser?.id, approvalComment: comment } : l
    ));
  };

  const processPayment = (employeeId: string, amount: number) => {
    const newPayslip: Payslip = {
      id: String(payslips.length + 1),
      employeeId,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      basicSalary: amount,
      bonuses: 0,
      deductions: amount * 0.15,
      netSalary: amount * 0.85,
      generatedAt: new Date()
    };
    setPayslips([...payslips, newPayslip]);
    
    addNotification({
      userId: employeeId,
      title: 'Paiement effectué',
      message: `Votre salaire de ${amount.toLocaleString()} FCFA a été versé`,
      type: 'payment',
      read: false
    });
  };

  const generatePayslip = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      const newPayslip: Payslip = {
        id: String(payslips.length + 1),
        employeeId,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        basicSalary: employee.salary,
        bonuses: employee.salary * 0.1,
        deductions: employee.salary * 0.15,
        netSalary: employee.salary * 0.95,
        generatedAt: new Date()
      };
      setPayslips([...payslips, newPayslip]);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: String(notifications.length + 1),
      createdAt: new Date()
    };
    setNotifications([newNotification, ...notifications]);
  };

  const companies = [mockCompany];

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      currentUser,
      currentCompany,
      companies,
      employees,
      attendance,
      leaves,
      payslips,
      notifications,
      invitations,
      login,
      logout,
      registerCompany,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      sendInvitation,
      acceptInvitation,
      clockIn,
      startBreak,
      endBreak,
      clockOut,
      requestLeave,
      approveLeave,
      rejectLeave,
      processPayment,
      generatePayslip,
      markAllNotificationsRead,
      markNotificationRead,
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
