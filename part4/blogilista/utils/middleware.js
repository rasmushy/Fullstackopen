const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')

  auth && auth.toLowerCase().startsWith('bearer ')
    ? (req.token = auth.substring(7))
    : (req.token = null)

  next()
}

const userExtractor = async (req, res, next) => {
  const auth = req.get('authorization')

  const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  auth && auth.toLowerCase().startsWith('bearer ')
    ? (req.user = user)
    : (req.user = null)

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
