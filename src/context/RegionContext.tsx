import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Region {
  code: string;
  label: string;
  currency: string;
  currencyCode: string;
  locale: string;
  timezone: string;
  flag: string;
}

const regions: Region[] = [
  { code: 'UEMOA', label: 'UEMOA (FCFA)', currency: 'FCFA', currencyCode: 'XOF', locale: 'fr-FR', timezone: 'Africa/Abidjan', flag: '🌍' },
  { code: 'EU', label: 'Europe (EUR)', currency: '€', currencyCode: 'EUR', locale: 'fr-FR', timezone: 'Europe/Paris', flag: '🇪🇺' },
  { code: 'US', label: 'USA (USD)', currency: '$', currencyCode: 'USD', locale: 'en-US', timezone: 'America/New_York', flag: '🇺🇸' },
  { code: 'MA', label: 'Maroc (MAD)', currency: 'MAD', currencyCode: 'MAD', locale: 'ar-MA', timezone: 'Africa/Casablanca', flag: '🇲🇦' },
];

interface RegionContextType {
  region: Region;
  setRegion: (r: Region) => void;
  regions: Region[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>(regions[0]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(region.locale, {
      style: 'currency',
      currency: region.currencyCode,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(region.locale, {
      dateStyle: 'short',
    }).format(date);
  };

  return (
    <RegionContext.Provider value={{ region, setRegion, regions, formatCurrency, formatDate }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) throw new Error('useRegion must be used within RegionProvider');
  return context;
}

export { regions };
