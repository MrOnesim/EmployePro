import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignaturePage from '../pages/SignaturePage';

vi.mock('../context/AppContext', () => ({
  useApp: () => ({
    signatureRequests: [
      {
        id: 'sig1', title: 'Contrat Kofi Mensah', documentUrl: '', status: 'pending',
        senderId: 'admin1', message: 'Veuillez signer', createdAt: new Date(), signedAt: null, signatureData: null,
        recipients: [{ employeeId: 'emp1', name: 'Kofi Mensah', email: 'kofi@test.com', status: 'pending', signedAt: null, signatureData: null }],
      },
    ],
    signatureTemplates: [],
    employees: [{ id: 'emp1', firstName: 'Kofi', lastName: 'Mensah' }],
    currentUser: { id: 'emp1', firstName: 'Kofi', lastName: 'Mensah' },
    sendSignatureRequest: vi.fn(),
    signSignatureRequest: vi.fn(),
    rejectSignature: vi.fn(),
    addSignatureTemplate: vi.fn(),
    deleteSignatureTemplate: vi.fn(),
  }),
}));

vi.mock('../context/ToastContext', () => ({
  useToast: () => ({ addToast: vi.fn() }),
}));

describe('SignaturePage', () => {
  it('renders title', () => {
    render(<SignaturePage />);
    expect(screen.getByText('Signature Électronique')).toBeInTheDocument();
  });

  it('shows pending recipient', () => {
    render(<SignaturePage />);
    expect(screen.getByText('Kofi Mensah')).toBeInTheDocument();
  });
});
