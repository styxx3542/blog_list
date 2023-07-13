import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaThumbsUp } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import PopUp from "./ConformationWindow";

const Blog = ({ blog, onDeleteBlog, user, onLike }) => {
    const [toggleDetails, setToggleDetails] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleDelete = () => {
        setShowPopup(true);
    };
    const confirmDelete = () => {
        onDeleteBlog(blog.id);
    };
    const handleLike = () => {
        const newLikes = liked ? blog.likes - 1 : blog.likes + 1;
        const newBlog = { ...blog, likes: newLikes };
        onLike(blog.id, newBlog);
        setLiked(!liked);
    };
    const toggleVisibility = () => {
        setToggleDetails(!toggleDetails);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{blog.title}</h2>
                <button
                    onClick={toggleVisibility}
                    className="p-2 rounded-md hover:bg-gray-200 focus:outline-none transition duration-300 ease-in-out flex items-center"
                >
                    {toggleDetails ? (
                        <FaAngleUp className="text-gray-600 mr-1" />
                    ) : (
                        <FaAngleDown className="text-gray-600 mr-1" />
                    )}
                </button>
            </div>
            <Transition
                show={toggleDetails}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="mb-4">
                    <p className="text-gray-700 font-bold">Author:</p>
                    <p className="text-gray-700">{blog.author}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700 font-bold">Url:</p>
                    <p className="text-gray-700">{blog.url}</p>
                </div>
                <div className="flex items-center mb-4">
                    <Transition
                        show={true}
                        enter="transition-all ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition-all ease-in duration-300"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <FaThumbsUp
                            className={`${
                                liked ? "text-blue-500" : "text-gray-800"
                            }`}
                            onClick={() => handleLike()}
                        />
                    </Transition>

                    <p className="text-gray-700 ml-2">{blog.likes}</p>
                </div>
                <div className="flex items-center">
                    {blog.user.id === user.id && (
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    )}
                    {showPopup && (
                        <PopUp
                            message={
                                "Are you sure you want to delete this blog?"
                            }
                            handleFunction={confirmDelete}
                            closePopup={() => {
                                setShowPopup(false);
                            }}
                        />
                    )}
                </div>
            </Transition>
        </div>
    );
};

export default Blog;
