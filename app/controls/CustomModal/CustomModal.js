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
  const [isClosing, setIsClosing] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);

  useEffect(() => {
    if (visible) {
      setIsClosing(false);
      setBackgroundOpacity(0.5); // Fade in the background
    } else {
      setIsClosing(true);
      setBackgroundOpacity(0); // Start fade out
      setTimeout(() => setIsClosing(false), 300); // Reset after animation
    }
  }, [visible]);

  useEffect(() => {
    let timeoutId;
  
    if (visible) {
      setIsClosing(false);
      setBackgroundOpacity(0.5); // Fade in the background
    } else {
      setIsClosing(true); // Start fade out
      setBackgroundOpacity(0);
  
      // Set a timeout before closing the modal completely
      timeoutId = setTimeout(() => {
        setIsClosing(false);
        onClose(); // Call the onClose prop after the delay
      }, 1000); // Delay of 1 second
    }
  
    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts
    };
  }, [visible, onClose]);  

  const modalWidth = {
    '20': 'w-full sm:w-screen md:w-2/5 lg:w-1/3 xl:w-1/4',
    '80': 'w-full sm:w-screen md:w-4/5 lg:w-3/4 xl:w-2/3'
  }[widthPercentage] || 'w-full sm:w-screen md:w-3/5 lg:w-2/3 xl:w-1/2';

  const modalClasses = `fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 ${visible || isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 ease-in-out`;

  const handleCloseClick = () => {
    setIsClosing(true); // Trigger close animations
    setTimeout(onClose, 1000); // Delay the actual closing to allow animations to play
  };
  // Determine the appropriate animation class
  const animationClass = isClosing ? 'animate-fadeOut' : 'animate-fadeIn';

  return (
    <div
      className={modalClasses}
      style={{ backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`, transition: 'background-color 0.5s ease' }}
      onClick={handleCloseClick}
    >
       <div
        className={`flex flex-col p-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-700 h-full md:h-auto ${modalWidth} ${modalClassName} ${animationClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-medium text-gray-900 dark:text-white ${titleClassName}`}>{title}</h2>
          <button
            onClick={handleCloseClick}
            aria-label="Close"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1 w-8 h-8 text-sm ml-auto dark:hover:bg-gray-600 dark:hover:text-white shadow-effect"
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