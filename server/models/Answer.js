const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  answer: {type: String, required: true},
  creator: {type: Schema.Types.ObjectId, ref: "User"},
  voteup: [{type: Schema.Types.ObjectId, ref: "User"}],
  votedown: [{type: Schema.Types.ObjectId, ref: "User"}]
}, {
  timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer
