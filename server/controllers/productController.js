const mongoose = require('mongoose')
const User = require('../models/User')
const Product = require('../models/Product')
var slug = require('achim-slug')
require('dotenv').config()

function createNew (req, res) {
  Product.create({
    slug: slug(`${req.body.title}`),
    title:  req.body.title,
    product: req.body.product,
    author: req.headers.username,
    answers: [],
    voteup: [],
    votedown: []
  })
  .then(function(productData) {
    res.send(productData)
  })
  .catch(function(err) {
    res.send(err)
  })
}

function getAll (req, res) {
  Product.find()
  .populate({
    path: 'answers',
    populate: {
      path: 'creator',
      select: 'username'
    }
  })
  .populate({
    path: 'answers',
    populate: {
      path: 'voteup',
      select: 'username'
    }
  })
  .populate({
    path: 'answers',
    populate: {
      path: 'votedown',
      select: 'username'
    }
  })
  .populate({
    path: 'voteup',
    select: 'username'
  })
  .populate({
    path: 'votedown',
    select: 'username'
  })
  .then(product => res.send(product))
  .catch(err => res.send(err))
}

function getOne (req, res) {
  Product.find({
    slug: req.params.slug
  })
  .populate({
    path: 'answers',
    populate: {
      path: 'creator',
      select: 'username'
    }
  })
  .populate({
    path: 'answers',
    populate: {
      path: 'voteup',
      select: 'username'
    }
  })
  .populate({
    path: 'answers',
    populate: {
      path: 'votedown',
      select: 'username'
    }
  })
  .populate({
    path: 'voteup',
    select: 'username'
  })
  .populate({
    path: 'votedown',
    select: 'username'
  })
  .then(product => res.send(product))
  .catch(err => res.send(err))
}

function editOne (req, res) {
  Product.findById(req.params.id)
  //   _id: req.params.id
  // }, {
  //   title: req.body.title,
  //   content: req.body.content,
  //   slug: slug(`${req.body.title}`)
  // }, {
  //   new: true
  // })
  .then(editedProducts => {
    if (editedProducts.author == req.id) {
      editedProducts.title = req.body.title || editedProducts.title
      editedProducts.product = req.body.product || editedProducts.product

      editedProducts.save((err, data) => {
        if (err) {
          res.send('Maaf tidak bisa save editan anda')
        }
        res.send({
          message: `Update ${data.title} berhasil`
        })
      })
    } else {
      res.send('Gak bisa ngapus nih')
    }
  })
  .catch(err => res.send(err))
}

function deleteOne (req, res) {
  Product.remove({
    _id: req.params.id
  })
  .then(deletedProducts => {
    console.log(req.headers.username)
    res.send({message: 'Kedelete'})
  })
  .catch(err => res.send(err))
}

function upvoteProduct (req, res) {
  Product.findOne({
    slug: req.params.slug
  })
  .then(data => {
    if (data.voteup.indexOf(req.id) === -1) {
      data.voteup.push(req.id)
      data.votedown.splice(req.id, 1)
      data.save(function(err, votedAnswer) {
        if(err) console.log(err)
        else console.log(votedAnswer)
      })
      res.send('Akhirnya ada yang voteup')
    } else if (data.voteup.indexOf(req.id) !== -1) {
      console.log('udah ada yg voteup');
      data.voteup.forEach(function(voter) {
        if (voter == req.id) {
          res.send('Ciee udah milih')
        } else if (voter !== req.id) {
          console.log('Masuk nih ke else')
          data.voteup.push(req.id)
          data.votedown.splice(req.id, 1)
          data.save(function(err, votedAnswer) {
            if(err) console.log(err)
            else console.log(votedAnswer)
          })
        }
      })
      res.send('ah elah kok ke bagian upvote sini sih')
    }
  })
  .catch(err => res.send(err))
}

function downvoteProduct (req, res) {
  Product.findOne({
    slug: req.params.slug
  })
  .then(data => {
    if (data.votedown.indexOf(req.id) === -1) {
      data.votedown.push(req.id)
      data.voteup.splice(req.id, 1)
      data.save(function(err, votedAnswer) {
        if(err) console.log(err)
        else console.log(votedAnswer)
      })
      res.send('Akhirnya ada yang votedown')
    } else if (data.votedown.indexOf(req.id) !== -1) {
      console.log('udah ada yg voteup');
      data.votedown.forEach(function(voter) {
        if (voter == req.id) {
          res.send('Ciee udah milih')
        } else if (voter !== req.id) {
          console.log('Masuk nih ke else')
          data.votedown.push(req.id)
          data.voteup.splice(req.id, 1)
          data.save(function(err, votedAnswer) {
            if(err) console.log(err)
            else console.log(votedAnswer)
          })
        }
      })
      res.send('ah elah kok ke bagian downvote sini sih')
    }
  })
  .catch(err => res.send(err))
}

module.exports = {
  createNew,
  getAll,
  getOne,
  editOne,
  deleteOne,
  upvoteProduct,
  downvoteProduct
}
