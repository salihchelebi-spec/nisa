import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AgentNilProvider } from '../AgentNilProvider.js';
import * as storage from '../../utils/storage.js';

jest.mock('../../utils/storage.js');

storage.get.mockResolvedValue({});
storage.set.mockResolvedValue();

test('provides context after loading', async () => {
  render(
    <AgentNilProvider>
      <div data-testid="child">child</div>
    </AgentNilProvider>
  );
  await waitFor(() => expect(screen.getByTestId('child')).toBeInTheDocument());
});
