import React, { useState } from "react";
import { Transition } from "@headlessui/react";

const TogglableComponent = ({title,children}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div >
      <button
        onClick={toggleVisibility}
        className="p-2 rounded-md hover:bg-gray-200 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110 flex items-center"
      >
        {isVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600 mr-2 transform rotate-180 transition duration-300 ease-in-out"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.707 7.707a1 1 0 011.414 0L10 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600 mr-2 transform transition duration-300 ease-in-out"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.707 7.707a1 1 0 011.414 0L10 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span className="text-gray-600 text-md font-medium">
          {title}
        </span>
      </button>
      <Transition
        show={isVisible}
        enter="transition-all duration-300 ease-in"
        enterFrom="opacity-0 max-h-0"
        enterTo="opacity-100 max-h-130"
        leave="transition-all duration-300 ease-out"
        leaveFrom="opacity-100 max-h-130"
        leaveTo="opacity-0 max-h-0"
      >
        <div className="overflow-y-auto">{children}</div>
      </Transition>
    </div>
  );
};

export default TogglableComponent;
