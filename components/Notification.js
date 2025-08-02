import React from 'react';

const styles = {
  info: 'bg-blue-600 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-500 text-black',
  error: 'bg-red-600 text-white',
};

const Notification = ({ message, type = 'info', onClose }) => {
  console.debug('Notification:', type, message);
  return (
    <div className={`p-2 rounded mb-2 ${styles[type] || styles.info}`} role="alert">
      <span>{message}</span>
      {onClose && (
        <button aria-label="close" className="ml-2" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default Notification;
