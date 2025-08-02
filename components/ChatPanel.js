import React, { useState } from 'react';
import Dropdown from './Dropdown.js';

const ChatPanel = ({ locale, messages = [], onSend, onModelChange, models = [] }) => {
  const [input, setInput] = useState('');
  console.debug('ChatPanel mounted with', messages.length, 'messages');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput('');
  };

  return (
    <section className="flex flex-col h-full" aria-label={locale.chat}>
      <div className="flex-1 overflow-y-auto mb-2">
        <ul>
          {messages.map((m, idx) => (
            <li key={idx} className="mb-1">{m}</li>
          ))}
        </ul>
      </div>
      {models.length > 0 && (
        <Dropdown
          label={locale.model}
          options={models.map((m) => ({ label: m, value: m }))}
          value={models[0]}
          onChange={onModelChange}
        />
      )}
      <form onSubmit={handleSubmit} className="flex" aria-label={locale.sendMessage}>
        <label htmlFor="chat-input" className="sr-only">{locale.message}</label>
        <input
          id="chat-input"
          className="flex-1 border rounded p-1 mr-2 dark:bg-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={locale.maxChars || 1000}
        />
        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
          {locale.send}
        </button>
      </form>
    </section>
  );
};

export default ChatPanel;
