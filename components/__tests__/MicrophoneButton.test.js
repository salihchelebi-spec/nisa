import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MicrophoneButton from '../MicrophoneButton.js';

const locale = { record: 'Record', stop: 'Stop' };

test('toggles recording', () => {
  const handle = jest.fn();
  render(<MicrophoneButton locale={locale} isRecording={false} onToggle={handle} />);
  fireEvent.click(screen.getByText('Record'));
  expect(handle).toHaveBeenCalled();
});
