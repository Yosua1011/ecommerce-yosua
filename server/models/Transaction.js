const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  customer: {type: Schema.Types.ObjectId, ref: "User"},
  product: {type: Schema.Types.ObjectId, ref: "Product"},
  totalprice: {type: Number, required: true}
}, {
  timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
