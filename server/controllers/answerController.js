const mongoose = require('mongoose')
const User = require('../models/User')
const Product = require('../models/Product')
const Answer = require('../models/Answer')
var slug = require('achim-slug')
require('dotenv').config()

function createNewAnswer (req, res) {
  Answer.create({
    answer: req.body.answer,
    creator: req.headers.id
  })
  .then(dataAnswer => {
    console.log(`ini dataAnswer ${dataAnswer}`)
    Product.updateOne({
      _id: req.params.productid
    }, {
      $push: {
        answers: dataAnswer._id
      }
    })
    .then(data => {
      console.log(dataAnswer)
      res.send(dataAnswer)
    })
    .catch(err => res.send(err))
  })
  .catch(err => res.send(err))
}

//Only for development purpose
function getOneAnswer (req, res) {
  Answer.find({
    _id: req.params.answerid
  })
  .then(answer => res.send(answer))
  .catch(err => res.send(err))
}

function deleteOneAnswer (req, res) {
  Answer.deleteOne({
    _id: req.params.answerid
  })
  .then(data => {
    console.log(`ini data author loh ${data.creator}`)
    if (data.result.n >= 1) {
      Product.updateOne({
        answers: req.params.answerid
      }, {
        $pull: {
          answers: req.params.answerid
        }
      })
      .then(data => res.send({message: 'Answer dihapus'}))
      .catch(err => res.send(err))
    } else {
      res.send(data)
    }
  })
  .catch(err => res.send(err))
}

function upvoteAnswer (req, res) {
  Answer.findOne({
    _id: req.params.answerid
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
        } else if (voter.length == 0) {
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

function downvoteAnswer (req, res) {
  Answer.findOne({
    _id: req.params.answerid
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
        } else if (voter.length == 0) {
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
  createNewAnswer,
  getOneAnswer,
  deleteOneAnswer,
  upvoteAnswer,
  downvoteAnswer
}
