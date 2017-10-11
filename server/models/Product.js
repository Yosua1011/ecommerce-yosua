const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  slug: {type: String},
  title: {type: String, required: true},
  product: {type: String, required: true},
  author: String,
  answers: [{type: Schema.Types.ObjectId, ref: "Answer"}],
  voteup: [{type: Schema.Types.ObjectId, ref: "User"}],
  votedown: [{type: Schema.Types.ObjectId, ref: "User"}]
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
