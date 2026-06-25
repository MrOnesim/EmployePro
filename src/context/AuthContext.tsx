import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import type { Company, Employee } from '../types';
import { isAuthenticated, clearTokens } from '../lib/axios';
import * as authService from '../services/authService';

interface AuthState {
  isLoggedIn: boolean;
  currentUser: Employee | null;
  currentCompany: Company | null;
  defaultCompany: Company;
  useApi: boolean;
  login: (email: string, _password: string, type: 'company' | 'employee') => Promise<boolean> | boolean;
  logout: () => Promise<void> | void;
  registerCompany: (data: Omit<Company, 'id' | 'uniqueId' | 'createdAt' | 'balance'>) => Promise<void> | void;
  setCurrentUser: (user: Employee | null) => void;
  setCurrentCompany: (company: Company | null) => void;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const defaultCompany: Company = {
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
  balance: 5000000,
};

const mockAdmin: Employee = {
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
  role: 'admin',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const useApi = import.meta.env.VITE_API_BASE_URL ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);

  const hydrateFromToken = useCallback(async () => {
    if (!useApi || !isAuthenticated()) return;
    try {
      const profile = await authService.getProfile();
      setCurrentUser(profile.user);
      setCurrentCompany(profile.company);
      setIsLoggedIn(true);
    } catch {
      clearTokens();
    }
  }, [useApi]);

  useEffect(() => { hydrateFromToken(); }, [hydrateFromToken]);

  const login = async (email: string, _password: string, type: 'company' | 'employee'):
    Promise<boolean> => {
    if (useApi) {
      try {
        const res = await authService.login({ email, password: _password, type });
        setCurrentUser(res.user);
        setCurrentCompany(res.company);
        setIsLoggedIn(true);
        return true;
      } catch {
        return false;
      }
    }
    if (type === 'company' && email === 'admin@techafrique.com') {
      setCurrentCompany(defaultCompany);
      setCurrentUser(mockAdmin);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    if (useApi) {
      try { await authService.logout(); } catch { clearTokens(); }
    }
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentCompany(null);
  };

  const deposit = (amount: number) => {
    setCurrentCompany((prev) => prev ? { ...prev, balance: prev.balance + amount } : prev);
  };

  const withdraw = (amount: number): boolean => {
    let success = false;
    setCurrentCompany((prev) => {
      if (!prev || prev.balance < amount) return prev;
      success = true;
      return { ...prev, balance: prev.balance - amount };
    });
    return success;
  };

  const registerCompany = async (companyData: Omit<Company, 'id' | 'uniqueId' | 'createdAt' | 'balance'>) => {
    if (useApi) {
      try {
        const res = await authService.registerCompany({
          ownerFirstName: companyData.ownerFirstName,
          ownerLastName: companyData.ownerLastName,
          email: companyData.email,
          phone: companyData.phone,
          name: companyData.name,
          address: companyData.address,
          website: companyData.website,
        });
        setCurrentUser(res.user);
        setCurrentCompany(res.company);
        setIsLoggedIn(true);
        return;
      } catch {
        return;
      }
    }
    const newCompany: Company = {
      ...companyData,
      id: String(Date.now()),
      uniqueId: `EP-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date(),
      balance: 0,
    };
    setCurrentCompany(newCompany);
    const adminEmployee: Employee = {
      id: 'admin',
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
      role: 'admin',
    };
    setCurrentUser(adminEmployee);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        currentCompany,
        defaultCompany,
        useApi,
        login,
        logout,
        registerCompany,
        setCurrentUser,
        setCurrentCompany,
        deposit,
        withdraw,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
