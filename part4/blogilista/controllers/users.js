const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1
  })
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const { password, username, name } = req.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique' })
  }

  if (password.length < 3) {
    //Salasanan oikeellisuus kannattaa testata kontrollerissa
    return res.status(400).send({ error: 'invald password length' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

userRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = userRouter
