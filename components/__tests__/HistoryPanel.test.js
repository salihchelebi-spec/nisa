import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HistoryPanel from '../HistoryPanel.js';

const locale = { noHistory: 'no', history: 'history', code: 'en-US' };

const chats = {
  chat1: [{ sender: 'a', message: 'hello', timestamp: Date.now() }]
};

test('renders chats and allows selection', () => {
  const handle = jest.fn();
  render(<HistoryPanel locale={locale} chats={chats} onSelectChat={handle} />);
  fireEvent.click(screen.getByText('chat1'));
  expect(handle).toHaveBeenCalledWith('chat1');
});
