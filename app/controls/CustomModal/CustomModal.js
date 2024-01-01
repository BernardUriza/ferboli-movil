import { useEffect, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';

const CustomModal = ({
  title,
  visible,
  onClose,
  children,
  widthPercentage,
  titleClassName,
  modalClassName,
  footerElement
}) => {
  // State to manage background opacity
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);

  useEffect(() => {
    if (visible) {
      // When modal becomes visible, fade in the background
      setTimeout(() => setBackgroundOpacity(0.5), 100); // Adjust timing as needed
    } else {
      // When modal is not visible, remove the background
      setBackgroundOpacity(0);
    }
  }, [visible]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onClose]);

  const modalWidth = {
    '20': 'w-full sm:w-screen md:w-2/5 lg:w-1/3 xl:w-1/4',
    '80': 'w-full sm:w-screen md:w-4/5 lg:w-3/4 xl:w-2/3'
  }[widthPercentage] || 'w-full sm:w-screen md:w-3/5 lg:w-2/3 xl:w-1/2';

  const modalClasses = `fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

  return (
    <div
      className={modalClasses}
      style={{ backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`, transition: 'background-color 0.5s ease' }} // Slow transition for background
      onClick={onClose}
    >
      <div
        className={`flex flex-col p-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-700 h-full md:h-auto ${modalWidth} ${modalClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-medium text-gray-900 dark:text-white ${titleClassName}`}>{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1 w-8 h-8 text-sm ml-auto dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <XCircleIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow mt-4">{children}</div>
        <div className="mt-4">{footerElement}</div>
      </div>
    </div>
  );
};

export default CustomModal;
