const Blog = require("../models/blog");
const User = require("../models/user");
const initialBlogs = [
    {
        title: "Random book title 231",
        author: "RandomGuy333",
        url: "www.google.com",
        likes: 7,
    },
    {
        title: "Great Book 666",
        author: "RandomPerson335",
        url: "www.google.com",
        likes: 11,
    },
];

const nonExistingId = async () => {
    const blog = new Blog({ content: "willremovethissoon" });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
};
module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
};
