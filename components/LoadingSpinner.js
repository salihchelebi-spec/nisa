import React from 'react';

const LoadingSpinner = ({ label = 'loading' }) => {
  console.debug('LoadingSpinner rendered');
  return (
    <div className="flex items-center justify-center p-4" role="status" aria-live="polite">
      <svg className="animate-spin h-5 w-5 mr-2 text-gray-500" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default LoadingSpinner;
