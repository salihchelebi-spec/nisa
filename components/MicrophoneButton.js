import React from 'react';

const MicrophoneButton = ({ locale, isRecording, onToggle }) => {
  console.debug('MicrophoneButton rendered, recording:', isRecording);
  return (
    <button
      type="button"
      className={`p-2 rounded-full border ${isRecording ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
      aria-pressed={isRecording}
      aria-label={isRecording ? locale.stop : locale.record}
      onClick={onToggle}
    >
      {isRecording ? locale.stop : locale.record}
    </button>
  );
};

export default MicrophoneButton;
