const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

const Blog = require('../models/blog')
const user = require('../models/user')

// get all blogs
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  res.json(blogs)
})

// find blog with id
blogRouter.get('/:id', async (req, res) => {
  if (!req.params) res.status(404).end()

  const blog = await Blog.findById(req.params.id)

  blog ? res.json(blog) : res.status(404).end()
})

// post new blog
blogRouter.post('/', userExtractor, async (req, res, next) => {
  const user = req.user
  const body = req.body
  const token = req.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

// delete blog with this id
blogRouter.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    const user = req.user
    const blog = await Blog.findById(req.params.id)
    const token = req.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    if (blog.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: 'unauthorized' })
    }

    await blog.remove()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// Update blog with this id
blogRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const token = req.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const updatedBlog = {
    ...body,
    likes: body.likes === undefined ? 0 : body.likes
  }

  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
      new: true
    })
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
