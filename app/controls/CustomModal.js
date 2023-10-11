import { XCircleIcon } from '@heroicons/react/outline';

const CustomModal = ({ title, visible, onClose, children }) => {
    if (!visible) return null;
  
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
        <div className="w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1 w-8 h-8 text-sm ml-auto dark:hover:bg-gray-600 dark:hover:text-white"
            >
                <XCircleIcon className="w-6 h-6 mr-2" />
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    );
  };

  export default CustomModal;
  