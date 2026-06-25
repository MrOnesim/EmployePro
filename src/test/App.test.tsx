import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the landing page', async () => {
    render(<App />);
    const items = await screen.findAllByText('EmployéPro');
    expect(items.length).toBeGreaterThan(0);
  });
});
