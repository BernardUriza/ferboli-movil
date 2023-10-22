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
  if (!visible) return null;

  // Define the responsive classes for modal width
  const modalWidth = widthPercentage== "80" ? 
  `w-full sm:w-screen md:w-4/5 lg:w-3/4 xl:w-2/3` : 'w-full sm:w-screen md:w-3/5 lg:w-2/3 xl:w-1/2'; // Custom width less than 80%


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className={`flex flex-col p-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-700 h-full md:h-auto ${modalWidth} ${modalClassName}`}>
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-medium text-gray-900 dark:text-white ${titleClassName}`}>{title}</h2>
          <button
            onClick={onClose}
            style={{"cursor":"pointer"}}
            className="text-gray-400 hover-bg-gray-200 hover-text-gray-900 rounded-lg p-1 w-8 h-8 text-sm ml-auto dark-hover-bg-gray-600 dark-hover-text-white"
          >
            <XCircleIcon className="w-6 h-6 mr-2" />
          </button>
        </div>
        <div className="flex-grow mt-4">{children}</div>
        <div className="mt-4">{footerElement}</div>
      </div>
    </div>
  );
};

export default CustomModal;
