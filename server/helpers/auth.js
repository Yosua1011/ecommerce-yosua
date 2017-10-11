const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = process.env.NODE_ENV || "development"
const Answer = require('../models/Answer')
const Product = require('../models/Product')

const isLogin = (req,res,next) => {
    jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.send(err)
        } else {
            req.headers = decoded
            next()
        }
    })
}

const isAdmin = (req,res,next) => {
    console.log(req.role)
    if(req.headers.role === 'admin') {
        next()
    } else {
        res.send('kamu bukan admin')
    }
}

const isAnswerCreatorAuth = (req,res,next) => {
    Answer.find({
      _id: req.params.answerid
    })
    .then(answer => {
      console.log(answer[0].creator)
      console.log(req.headers.id)
      if (answer[0].creator == req.headers.id) {
        next()
      } else {
        res.send({message: 'Lu bukan siapa2'})
      }
    })
    .catch(err => res.send(err))
}

const isProductAuthorAuth = (req,res,next) => {
    Product.find({
      _id: req.params.id
    })
    .then(product => {
      console.log(req.headers.username)
      console.log(product)
      if (product[0].author == req.headers.username) {
        next()
      } else {
        res.send({message: 'Lu bukan siapa2'})
      }
    })
    .catch(err => res.send(err))
}

module.exports = {
    isLogin,
    isAdmin,
    isAnswerCreatorAuth,
    isProductAuthorAuth
}
