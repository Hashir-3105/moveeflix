import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 p-2 rounded-full"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
