const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/*
blogsController.post('/', async (req, res, next) => {
  const body = req.body
  try {
    if (body.title === undefined || body.url === undefined) {
      return res.status(400).end()
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    res.json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})
*/


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  if(!req.params) res.status(404).end()

  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.title === undefined || body.url === undefined) {
    return res.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  if(!req.params) return res.status(400).send({error: 'Missing id'})
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', (req, res, next) => {
  const body = req.body

  if(!req.params) return res.status(400).send({error: 'Missing id'})

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then((updatedBlog) => {
      res.json(updatedBlog)
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter
