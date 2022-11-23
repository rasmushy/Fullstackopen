const blogsController = require('express').Router()
const Blog = require('../models/blog')

blogsController.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

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

module.exports = blogsController

//app.get("/api/blogs", (request, response) => {
//  Blog.find({}).then((blogs) => {
//    response.json(blogs)
//  })
//})

//app.post("/api/blogs", (request, response) => {
//  const blog = new Blog(request.body)
//
//  blog.save().then((result) => {
//    response.status(201).json(result)
//  })
//)

//notesRouter.get("/", (request, response) => {
//Note.find({}).then((notes) => {
//response.json(notes)
//})
//})

//notesRouter.get("/:id", (request, response, next) => {
//Note.findById(request.params.id)
//.then((note) => {
//if (note) {
//response.json(note)
//} else {
//response.status(404).end()
//}
//})
//.catch((error) => next(error))
//})

//notesRouter.post('/', (request, response, next) => {
//const body = request.body

//const note = new Note({
//content: body.content,
//important: body.important || false,
//date: new Date(),
//})

//note.save()
//.then(savedNote => {
//response.json(savedNote)
//})
//.catch(error => next(error))
//})

//notesRouter.delete('/:id', (request, response, next) => {
//Note.findByIdAndRemove(request.params.id)
//.then(() => {
//response.status(204).end()
//})
//.catch(error => next(error))
//})

//notesRouter.put('/:id', (request, response, next) => {
//const body = request.body

//const note = {
//content: body.content,
//important: body.important,
//}

//Note.findByIdAndUpdate(request.params.id, note, { new: true })
//.then(updatedNote => {
//response.json(updatedNote)
//})
//.catch(error => next(error))
//})
