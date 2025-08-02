import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatPanel from '../ChatPanel.js';

const locale = { chat: 'chat', sendMessage: 'sendMessage', message: 'message', send: 'send' };

test('submits message through onSend', () => {
  const handleSend = jest.fn();
  render(<ChatPanel locale={locale} messages={['hi']} onSend={handleSend} models={[]} />);
  fireEvent.change(screen.getByLabelText('message'), { target: { value: 'hello' } });
  fireEvent.click(screen.getByText('send'));
  expect(handleSend).toHaveBeenCalledWith('hello');
});
