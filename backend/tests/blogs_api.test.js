const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const api = supertest(app);
beforeEach(async () => {
    await User.deleteMany({});
    
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});
test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("main identifier is id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
});

test("valid blogs are added", async () => {
    const blog = {
        title: "random",
        author: "random",
        likes: 8,
        url: "random.random",
    };
    await api.post("/api/blogs").send(blog).expect(201);
    const finalBlogs = await helper.blogsInDb();
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(finalBlogs.map((blog) => blog.title)).toContain("random");
});

test("likes are defaulted to 0", async () => {
    const blog = {
        title: "decent book",
        author: "random_fuck who cares",
        url: "www.google.com",
    };
    await api.post("/api/blogs").send(blog).expect(201);
    const finalBlogs = await helper.blogsInDb();
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(finalBlogs.map((blog) => blog.title)).toContain("decent book");
    expect(finalBlogs.map((blog) => blog.likes)).toContain(0);
});

test("no title/url gives a bad request", async () => {
    const blog = {
        url: "www.google.com",
    };
    await api.post("/api/blogs").send(blog).expect(400);
});
test("updating number of likes works", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.likes = 50;
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate);
    const blogsAtEnd = await helper.blogsInDb();
    const likes = blogsAtEnd.map((r) => r.likes);
    expect(likes).toContain(50);
});
test("Deleting a blog works", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    console.log(blogToDelete);
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
});

test("invalid users can't be created", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
        username: "ab",
        password: "42erwftweg",
        name: "random",
    };
    await api.post("/api/users").send(newUser).expect(400);
});
afterAll(async () => {
    await mongoose.connection.close();
});
