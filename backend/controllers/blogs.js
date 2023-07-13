const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const middleware = require("../utils/middleware")
blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.send(blogs);
});

blogRouter.post("/",middleware.userExtractor,async (request, response) => {
    const body = request.body;
    const user = request.user;
    const blogObject = {
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
        likes: body.likes || 0,
    };
    if (!blogObject.title) {
        response.status(400).json({
            error: "Please enter a title",
        });
    } else if (!blogObject.author) {
        response.status(400).json({
            error: "Please enter an author",
        });
    } else {
        const blog = new Blog(blogObject);
        const Blogs = await blog.save();
        user.blogs = user.blogs.concat(blog);
        await user.save();
        response.status(201).json(Blogs);
    }
});
blogRouter.put("/:id",async (request, response) => {
    const body = request.body;
    const blogObject = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    };
    if (!blogObject.title) {
        response.status(400).send({
            error: "Please enter a title",
        });
    } else if (!blogObject.author) {
        response.status(400).send({
            error: "Please enter an author",
        });
    } else {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            blogObject,
            { new: true }
        );
        response.json(updatedBlog);
    }
});

blogRouter.delete("/:id",middleware.userExtractor ,async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (user._id.toString() !== blog.user.toString()) {
        return response.status(401).json({
            error: "user invalid",
        });
    }
    user.blogs = user.blogs.filter((blog) => blog._id !== request.params.id);
    await user.save();
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});
module.exports = blogRouter;
