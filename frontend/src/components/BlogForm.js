import React, { useState } from "react";

const AddBlogForm = ({ onAddBlog,toggle }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form
      className="w-full bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Add a New Blog</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full bg-gray-100 border-2 border-gray-300 p-2 text-black rounded-lg focus:outline-none focus:border-purple-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block font-medium mb-2">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          className="w-full bg-gray-100 border-2 border-gray-300 p-2 text-black rounded-lg focus:outline-none focus:border-purple-500"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="url" className="block font-medium mb-2">
          URL
        </label>
        <input
          type="url"
          id="url"
          name="url"
          className="w-full bg-gray-100 border-2 border-gray-300 p-2 text-black rounded-lg focus:outline-none focus:border-purple-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-white text-purple-500 font-semibold rounded-full px-6 py-2 hover:bg-gray-100 hover:text-purple-600 transition duration-200 ease-in-out"
      >
        Add Blog
      </button>
    </form>
  );
};

export default AddBlogForm;
