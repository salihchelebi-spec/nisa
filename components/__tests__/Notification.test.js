import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notification from '../Notification.js';

test('renders message and triggers close', () => {
  const handle = jest.fn();
  render(<Notification message="hi" type="info" onClose={handle} />);
  fireEvent.click(screen.getByLabelText('close'));
  expect(handle).toHaveBeenCalled();
});
