import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({ setUser, setMessage }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            );
            console.log(user)
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (err) {
            console.log(err)
            setMessage({
                text: "Wrong credentials",
                type: "error"
            });
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };
    return (
        <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mt-4">
                Login
            </h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8">
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
