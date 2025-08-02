import React from 'react';

const Modal = ({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  console.debug('Modal opened with title:', title);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-gray-800 p-4 rounded w-80">
        <h2 className="text-lg mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={onCancel}>{cancelText}</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
