import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner.js';

test('shows loading status', () => {
  render(<LoadingSpinner label="loading" />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});
