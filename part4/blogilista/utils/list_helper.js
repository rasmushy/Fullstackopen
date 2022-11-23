const _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const initialValue = 0

  return blogs.length !== 1
    ? blogs.reduce((sum, order) => sum + order.likes, initialValue)
    : blogs[0].likes
}

const favoriteBlog = (blogs) => {
  // https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
  const subset = blogs.map(({ title, author, likes }) => ({
    title,
    author,
    likes
  }))
  return subset.reduce((a, b) => (a.likes > b.likes ? a : b), 0)
}

const mostBlogs = (blogList) => {
  const result = _.countBy(blogList, function (o) {
    return o.author
  })

  const subset = blogList.map(({ author }) => ({
    author,
    blogs: result[author]
  }))

  return subset.reduce((a, b) => (a.blogs > b.blogs ? a : b))
}

const mostLikes = (blogs) => {
  const result = _(blogs)
    .groupBy('author')
    .map((obj, key) => {
      return {
        author: key,
        likes: _.sumBy(obj, 'likes')
      }
    })
    .value()

  return result.reduce((a, b) => (a.likes > b.likes ? a : b))
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
