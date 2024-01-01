import { XCircleIcon } from '@heroicons/react/outline';
import { Button } from '@tremor/react';

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
  if (!visible) return null;

  // Modal width logic
  const modalWidth = {
    '20': 'w-full sm:w-screen md:w-2/5 lg:w-1/3 xl:w-1/4',
    '80': 'w-full sm:w-screen md:w-4/5 lg:w-3/4 xl:w-2/3'
  }[widthPercentage] || 'w-full sm:w-screen md:w-3/5 lg:w-2/3 xl:w-1/2';

  // Handle background click
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Handle Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
      onClick={handleBackgroundClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      aria-modal={true}
      role="dialog"
    >
      <div className={`flex flex-col p-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-700 h-full md:h-auto ${modalWidth} ${modalClassName}`}>
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
