// components/CustomFormMessage.tsx


type MessageStatus = 'success' | 'error' | 'info';

interface CustomFormMessageProps {
  message: string | null;
  status: MessageStatus;
}

const statusStyles: Record<MessageStatus, string> = {
  success: ' text-green-700',
  error: ' text-red-700',
  info: ' text-blue-700',
};

export function CustomFormMessage({ message, status }: CustomFormMessageProps) {
  // If there's no message, don't render anything
  if (!message) {
    return null;
  }

  const baseStyles = '  py-1 font-medium text-xs transition-all duration-300';
  const finalStyles = `${baseStyles} ${statusStyles[status]}`;

  return (
    <div className={finalStyles} role="alert">
      {message}
    </div>
  );
}