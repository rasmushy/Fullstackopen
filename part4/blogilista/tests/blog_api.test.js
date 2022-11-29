const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let authToken = null

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const newUser = await new User({
      username: 'root',
      passwordHash: await bcrypt.hash('sekret', 10)
    }).save()

    const tokenUser = { username: 'root', id: newUser.id }
    authToken = jwt.sign(tokenUser, process.env.SECRET)
    uId = tokenUser.id

    const blogObjects = helper.initialBlogs.map(
      (blog) => new Blog({ ...blog, user: newUser })
    )
    await Blog.insertMany(blogObjects)
    return authToken
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs returned with proper object id name', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
    const contents = response.body.map((r) => r.title)
    expect(contents).toContain('Go To Statement Considered Harmful')
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

      expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404)
    })

    test('fails with statuscode 400 when id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('statuscode 204 if succeed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const mappedBlogs = blogsAtEnd.map((r) => r.title)
      expect(mappedBlogs).not.toContain(blogToDelete.title)
    })
  })
  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Kauppakassi',
        author: 'Sanna',
        url: 'www.blogi.com',
        likes: 5
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map((b) => b.title)
      expect(contents).toContain('Kauppakassi')
    })

    test('succeeds without adding likes property', async () => {
      const newBlog = {
        title: 'Kauppakassi',
        author: 'Sanna',
        url: 'www.blogi.com'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map((n) => n.likes)
      expect(contents).toContain(0)
    })

    test('fails with status code 401 if no auth token', async () => {
      const newBlog = {
        title: 'Kauppakassi',
        author: 'Sanna',
        url: 'www.blogi.com'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer falseToken1234')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    describe('fails with status code 400 if blog is missing title, url or author', () => {
      const newInvalidBlogs = [
        {
          author: 'Sanna',
          url: 'www.blogi.com'
        },
        {
          title: 'Kauppakassi',
          url: 'www.blogi.com'
        },
        {
          title: 'Kauppakassi',
          author: 'Sanna'
        }
      ]

      test('fails title', async () => {
        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${authToken}`)
          .send(newInvalidBlogs[0])
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })
      test('fails author', async () => {
        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${authToken}`)
          .send(newInvalidBlogs[1])
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })
      test('fails url', async () => {
        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${authToken}`)
          .send(newInvalidBlogs[2])
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })
    })
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rehude',
      name: 'Rasmus',
      password: 'dvorak'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with statuscode 400 if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  describe('test character lengths are correct, fails if statuscode is not 400 or user gets created', () => {
    test('username is shorter than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'R',
        name: 'rehude',
        password: 'dvorak'
      }

      await api.post('/api/users').send(newUser).expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password is shorter than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'Rasmus',
        name: 'rehude',
        password: 'd'
      }

      await api.post('/api/users').send(newUser).expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
