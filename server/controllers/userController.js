const mongoose = require('mongoose')
const User = require('../models/User')
const Product = require('../models/Product')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)
var jwt = require('jsonwebtoken');
require('dotenv').config()

function signUp (req, res) {
  var hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
      username: req.body.username,
      password: hash,
      role: req.body.role
  })
  .then(user => {
    console.log(user)
      res.send('New User added')
  })
  .catch(err => {
      res.send(err)
  })
}

function signIn (req, res) {
  User.findOne({
    username: req.body.username
  })
  .then(userData => {
    if (bcrypt.compareSync(req.body.password, userData.password)) {
        var token = jwt.sign({
            id: userData.id,
            username: userData.username,
            role: userData.role
        }, process.env.JWT_SECRET)
        res.send(token)
    } else {
        res.send({
            status: 401,
            message: `Username or password didn't match`
        })
    }
  })
  .catch(err => {
      res.send('User tidak berhasil masuk karena')
  })
}

function pemecahToken (req, res) {
  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.send(err)
    } else {
      console.log(decoded)
      res.send(decoded)
    }
  })
}

function getAllUser (req, res) {
  User.find()
  .then(users => res.send(users))
  .catch(err => res.send(err))
}

function removeUser (req, res) {
  User.findOne({
    _id: req.params.id
  })
  User.remove({_id: req.params.id})
  .then(data => {
    Product.remove({author: req.params.id})
    .then(deleted => res.send('Kehapus User sama Product nya'))
    .catch(err => res.send(err))
  })
  .catch(err => res.send(err))
}

function editUser (req, res) {
  User.findById(req.params.id)
  .then(editedUser => {
    console.log(editedUser)
    if (editedUser._id == req.params.id) {
      editedUser.username = req.body.username || editedUser.username
      editedUser.password = req.body.password || editedUser.password
      editedUser.role = req.body.role || editedUser.role

      editedUser.save((err, data) => {
        if (err) {
          res.send('Maaf tidak bisa save user yang anda edit')
        }
        res.send({
          message: `Update data ${data.username} berhasil`
        })
      })
    } else {
      res.send('Gak bisa ngapus nih')
    }
  })
  .catch(err => res.send(err))
}

module.exports = {
  signUp,
  signIn,
  getAllUser,
  removeUser,
  editUser,
  pemecahToken
}
