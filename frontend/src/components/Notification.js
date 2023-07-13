import { useState } from "react";

const Notification = ({message }) => {

    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    const type = message.type === "error"?"red":"green";
    return isVisible ? (
        <div
            className={`rounded-md bg-${type}-100 border-l-4 border-${type}-500 text-${type}-700 px-4 py-2`}
            role="alert"
        >
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <svg
                        className={`h-6 w-6 text-${type}-500`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {type === "success" ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        )}
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm leading-5 font-medium">{message.text}</p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            onClick={handleClose}
                            className={`inline-flex rounded-md p-1.5 text-${type}-500 hover:bg-${type}-200 focus:outline-none focus:bg-${type}-200 transition ease-in-out duration-150`}
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9.17l3.59-3.58L14 6l-3.58 3.59L14 13l-0.41 0.41L10 9.83l-3.59 3.58L6 13l3.58-3.59L6 6l0.41-0.41L10 9.17z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Notification;
