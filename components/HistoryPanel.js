import React from 'react';
import { formatTimeAgo } from '../utils/helpers.js';

const HistoryPanel = ({ locale, chats = {}, onSelectChat }) => {
  console.debug('HistoryPanel rendered with', Object.keys(chats).length, 'chats');
  const chatIds = Object.keys(chats);
  if (chatIds.length === 0) {
    return <p>{locale.noHistory}</p>;
  }
  return (
    <ul aria-label={locale.history} className="space-y-1">
      {chatIds.map((id) => {
        const messages = chats[id];
        const last = messages[messages.length - 1];
        return (
          <li key={id}>
            <button
              className="w-full text-left p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSelectChat(id)}
            >
              <div className="font-semibold">{id}</div>
              {last && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {last.sender}: {last.message} – {formatTimeAgo(last.timestamp, locale.code)}
                </div>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default HistoryPanel;
