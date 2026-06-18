import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WellnessPage from '../pages/WellnessPage';

vi.mock('../context/AppContext', () => ({
  useApp: () => ({
    wellnessSurveys: [
      { id: 's1', title: 'Sondage mensuel', description: 'Comment allez-vous ?', questions: [], period: 'monthly', active: true, createdAt: new Date() },
    ],
    wellnessResponses: [],
    employees: [{ id: 'emp1', firstName: 'Kofi', lastName: 'Mensah' }],
    currentUser: { id: 'emp1', firstName: 'Kofi', lastName: 'Mensah' },
    addWellnessSurvey: vi.fn(),
    submitWellnessResponse: vi.fn(),
  }),
}));

vi.mock('../context/ToastContext', () => ({
  useToast: () => ({ addToast: vi.fn() }),
}));

describe('WellnessPage', () => {
  it('renders title', () => {
    render(<WellnessPage />);
    expect(screen.getByText('Bien-être des employés')).toBeInTheDocument();
  });

  it('displays active surveys', () => {
    render(<WellnessPage />);
    expect(screen.getByText('Sondage mensuel')).toBeInTheDocument();
  });
});
