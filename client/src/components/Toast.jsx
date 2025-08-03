import { CheckCircle } from "lucide-react";
import React from "react";
const Toast = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed z-50 flex items-center p-4 space-x-2 text-white -translate-x-1/2 bg-green-500 shadow-lg bottom-8 left-1/2 rounded-xl animate-fade-in-up">
      <CheckCircle size={20} />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
