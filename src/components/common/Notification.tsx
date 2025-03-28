import React, { useEffect } from "react";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, autoCloseTime, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-100",
          border: "border-green-500",
          text: "text-green-700",
          icon: (
            <svg
              className='h-6 w-6 text-green-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          ),
        };
      case "error":
        return {
          bg: "bg-red-100",
          border: "border-red-500",
          text: "text-red-700",
          icon: (
            <svg
              className='h-6 w-6 text-red-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          ),
        };
      case "warning":
        return {
          bg: "bg-yellow-100",
          border: "border-yellow-500",
          text: "text-yellow-700",
          icon: (
            <svg
              className='h-6 w-6 text-yellow-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          ),
        };
      case "info":
      default:
        return {
          bg: "bg-blue-100",
          border: "border-blue-500",
          text: "text-blue-700",
          icon: (
            <svg
              className='h-6 w-6 text-blue-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          ),
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`fixed bottom-4 right-4 ${styles.bg} border-l-4 ${styles.border} ${styles.text} p-4 rounded shadow-md z-50 animate-notification-in`}
      role='alert'
    >
      <div className='flex items-center'>
        <div className='flex-shrink-0'>{styles.icon}</div>
        <div className='ml-3'>
          <p className='font-medium'>{title}</p>
          <p className='text-sm'>{message}</p>
        </div>
        <button
          onClick={onClose}
          className='ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 hover:bg-opacity-25 hover:bg-gray-500'
          aria-label='Cerrar'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
