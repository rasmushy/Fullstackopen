import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Toggable';

import blogService from './services/blogService';
import loginService from './services/loginService';

const App = () => {
  const blogFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    text: null,
    style: 'error'
  });
  const [user, setUser] = useState(
    window.localStorage.getItem('loggedBlogUser')
      ? JSON.parse(window.localStorage.getItem('loggedBlogUser'))
      : null
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
      console.log('blogs', allBlogs);
    };
    try {
      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  //Add a new blog
  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(createdBlog));
      blogFormRef.current.toggleVisibility();
      setErrorMessage({
        text: `A new blog ${blogObject.title} by ${
          user.name ? user.name : user.username
        } added`,
        style: 'success'
      });
    } catch (exception) {
      setErrorMessage({
        text: 'Error creating blog',
        style: 'error'
      });
    } finally {
      setTimeout(() => {
        setErrorMessage({ text: null, style: 'error' });
      }, 5000);
    }
  };

  //Like functionality
  const likeBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject.id, blogObject);

      setBlogs(
        blogs.map((blog) => (blog.id === blogObject.id ? blogObject : blog))
      );
    } catch (error) {
      setErrorMessage({ text: 'Error updating blog', style: 'error' });
      const timer = setTimeout(() => {
        setErrorMessage({ text: null, style: 'error' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  };

  //Delete functionality
  const deleteBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      try {
        await blogService.remove(blogObject.id);
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
      } catch (error) {
        setErrorMessage({
          text: 'Error deleting blog',
          style: 'error'
        });
        setTimeout(() => {
          setErrorMessage({ text: null, style: 'error' });
        }, 5000);
      }
    }
  };

  //Userlogin
  const handleLogin = async ({
    username,
    password,
    setUsername,
    setPassword
  }) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      setErrorMessage({
        text: `Welcome ${user.name ? user.name : user.username}`,
        style: 'success'
      });
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage({
        text: 'Wrong username or password',
        style: 'error'
      });
    } finally {
      setTimeout(() => {
        setErrorMessage({ text: null, style: 'error' });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    document.location.reload();
  };

  //Login form
  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  );

  //BlogForm
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  );

  //App
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />

      {user && (
        <div>
          {user.name ? user.name : user.username} logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <br />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {blogForm()}
          <br />
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                likeBlog={likeBlog}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
