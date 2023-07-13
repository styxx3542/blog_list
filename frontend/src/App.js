import { useState, useEffect } from "react";

import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LogOutButton from "./components/buttons/LogOutButton";
import AddBlogForm from "./components/BlogForm";
import ToggleableComponent from "./components/TogglableComponent";


const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);

    const logout = () => {
        window.localStorage.clear();
        window.location.reload();
    };
    const onAddBlog = async ({ title, author, url }) => {
        const blog = {
            title: title,
            author: author,
            url: url,
        };
        await blogService.create(blog);
        setMessage({
            text: `${title} by ${author} successfully added!`,
            type: "success",
        });
        setTimeout(() => {
          setMessage(null)
        },5000)
        const blogs = await blogService.getAll();
        setBlogs(blogs);
    };

    const onDeleteBlog = async(id)=> {
        blogService.del(id)
        const blogs = await blogService.getAll();
        setBlogs(blogs)
    }

    const onLike = async(id,newBlog) => {
        await blogService.update(id,newBlog)
        const blogs = await blogService.getAll();
        setBlogs(blogs)
    }

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    if (user === null) {
        return (
            <div className="flex justify-center items-center flex-col bg-gray-100 py-8">
                {message && <Notification message={message} />}
                <LoginForm setUser={setUser} setMessage={setMessage} />
            </div>
        );
    }
    return (
        <div className="flex justify-center items-center flex-col bg-gray-100 py-8">
            {message && <Notification message={message} />}
            <LogOutButton logout={logout} />
            <h2 className="text-3xl font-bold text-center text-gray-800 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text my-4">
                Blogs
            </h2>
            <ToggleableComponent title="Add Blog" children={<AddBlogForm onAddBlog={onAddBlog} />}/>
            
            <div className="items-center justify-start shadow-sm rounded-lg p-4 m-4 md:flex-row md:justify-start md:items-center md:p-0">
                {blogs.map((blog) => (
                    <Blog blog={blog} key={blog.id} onDeleteBlog={onDeleteBlog} user = {user} onLike={onLike}/>
                ))}
            </div>
        </div>
    );
};

export default App;
